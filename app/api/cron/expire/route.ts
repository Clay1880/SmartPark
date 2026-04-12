import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

export async function GET(req: Request) {
  // Optional security: Vercel sends a secret header when it runs cron jobs
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const bookingsRef = db.collection('bookings');
    const snapshot = await bookingsRef.where('status', '==', 'active').get();

    if (snapshot.empty) {
      return NextResponse.json({ message: 'No active bookings to check.' });
    }

    const batch = db.batch();
    let expiredCount = 0;
    const now = new Date().getTime();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const createdAt = new Date(data.createdAt).getTime();
      
      // Calculate when this ticket should expire (createdAt + hours * milliseconds in an hour)
      const expirationTime = createdAt + (data.hours * 60 * 60 * 1000);

      if (now > expirationTime) {
        // Time is up! Add this document to the batch update to mark it expired
        batch.update(doc.ref, { status: 'expired' });
        expiredCount++;
      }
    });

    if (expiredCount > 0) {
      await batch.commit();
      console.log(`Successfully expired ${expiredCount} tickets.`);
    }

    return NextResponse.json({ message: `Checked tickets. Expired: ${expiredCount}` });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}