import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/firebase';

// Helper to generate a cool, readable Booking ID (e.g., PS-A1-X9B2)
const generateBookingId = (spotId: string) => {
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PS-${spotId}-${randomChars}`;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const { spotId, hours, totalCost } = await req.json();
    if (!spotId || !hours || !totalCost) return NextResponse.json({ message: 'Missing booking details' }, { status: 400 });

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', session.user.email).get();
    if (snapshot.empty) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const currentBalance = userData.walletBalance || 0;

    // The Critical Wallet Check
    if (currentBalance < totalCost) {
      return NextResponse.json({ 
        message: `Insufficient funds. Your balance is ₹${currentBalance}, but this costs ₹${totalCost}` 
      }, { status: 400 });
    }

    const newBalance = currentBalance - totalCost;
    const bookingId = generateBookingId(spotId);

    // FIREBASE BATCH WRITE: Safely deducts money AND creates the booking simultaneously!
    const batch = db.batch();
    
    // 1. Deduct the money from the user
    batch.update(userDoc.ref, { walletBalance: newBalance });
    
    // 2. Create the official booking record
    const bookingRef = db.collection('bookings').doc(bookingId);
    batch.set(bookingRef, {
      bookingId,
      userId: userDoc.id,
      userEmail: session.user.email,
      spotId,
      hours,
      totalCost,
      status: 'active',
      createdAt: new Date().toISOString(),
    });

    await batch.commit();

    return NextResponse.json({ message: 'Booking successful', newBalance, bookingId }, { status: 200 });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}