import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Authorize called with:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                console.log("User found:", user ? "Yes" : "No");

                if (!user || !user.password) {
                    console.log("User not found or no password");
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                console.log("Password valid:", isValid);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    subscriptionTier: user.subscriptionTier,
                };
            }
        })
    ],
    pages: {
        signIn: "/",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).id = token.sub as string;
                // Fetch latest user data to get subscription tier
                const user = await prisma.user.findUnique({
                    where: { id: token.sub as string }
                });
                (session.user as any).subscriptionTier = user?.subscriptionTier;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
