import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    const bookingsRef = db.collection('bookings');
    const snapshot = await bookingsRef.where('status', '==', 'active').get();
    const occupiedSpots = snapshot.docs.map(doc => doc.data().spotId);

    return NextResponse.json({ occupiedSpots }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching status' }, { status: 500 });
  }
}