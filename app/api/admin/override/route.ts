import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL; 

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { passkey } = await req.json();
    if (!passkey) return NextResponse.json({ message: 'Missing Entry Pass ID' }, { status: 400 });

    const formattedId = passkey.trim().toUpperCase();

    const bookingRef = db.collection('bookings').doc(formattedId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return NextResponse.json({ message: 'Passkey not found in database.' }, { status: 404 });
    }

    const bookingData = bookingDoc.data();
    if (bookingData?.status !== 'active') {
      return NextResponse.json({ message: `Passkey is already ${bookingData?.status}.` }, { status: 400 });
    }

    await bookingRef.update({ status: 'expired' });

    return NextResponse.json({ message: `Successfully revoked pass ${formattedId}` }, { status: 200 });

  } catch (error) {
    console.error('Admin override error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}