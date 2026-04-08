import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!email || !password || !username) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    
    if (!snapshot.empty) {
      return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      authProvider: 'credentials',
      walletBalance: 0,
      activeParking: false,
      currentSessionId: null,
      createdAt: new Date().toISOString(),
    };

    await usersRef.add(newUser);

    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}