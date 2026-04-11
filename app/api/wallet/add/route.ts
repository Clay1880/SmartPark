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

    const { amount } = await req.json();
    if (!amount || amount <= 0) {
      return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
    }

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', session.user.email).get();

    if (snapshot.empty) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userDoc = snapshot.docs[0];
    const currentBalance = userDoc.data().walletBalance || 0;
    const newBalance = currentBalance + amount;

    await userDoc.ref.update({
      walletBalance: newBalance
    });

    return NextResponse.json({ message: 'Funds added successfully', newBalance }, { status: 200 });

  } catch (error) {
    console.error('Wallet update error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}