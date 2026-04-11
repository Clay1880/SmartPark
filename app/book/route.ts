import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { spotId, hours, totalCost } = await req.json();

    if (!spotId || !hours || !totalCost) {
      return NextResponse.json({ message: 'Missing booking details' }, { status: 400 });
    }

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', session.user.email).get();

    if (snapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const currentBalance = userData.walletBalance || 0;

    if (currentBalance < totalCost) {
      return NextResponse.json({ 
        message: `Insufficient funds. Your balance is ₹${currentBalance}, but this costs ₹${totalCost}. Please add funds to your wallet.` 
      }, { status: 400 });
    }

    const newBalance = currentBalance - totalCost;
    
    await userDoc.ref.update({
      walletBalance: newBalance,

    });

    return NextResponse.json({ message: 'Booking successful', newBalance }, { status: 200 });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}