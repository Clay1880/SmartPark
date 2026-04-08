import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // --- DEBUG LOGS ADDED HERE ---
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing email or password");
          return null;
        }

        console.log("🔍 Looking up email in Firebase:", credentials.email);
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', credentials.email).get();

        if (snapshot.empty) {
          console.log("❌ Email not found in database!");
          throw new Error("No user found with this email");
        }

        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        console.log("✅ Found user in Firebase:", user.email);

        if (!user.password) {
          console.log("❌ User has no password (they must have used Google)");
          throw new Error("Please log in with Google");
        }

        console.log("🔐 Comparing passwords...");
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!passwordMatch) {
          console.log("❌ Password did NOT match the hash!");
          throw new Error("Incorrect password");
        }

        console.log("🎉 Login successful!");
        return { id: userDoc.id, name: user.username, email: user.email };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', user.email).get();

        if (snapshot.empty) {
          await usersRef.add({
            username: user.name,
            email: user.email,
            authProvider: 'google',
            walletBalance: 0,
            activeParking: false,
            currentSessionId: null,
            createdAt: new Date().toISOString(),
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; 
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  }
};