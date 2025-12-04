import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

let prisma: PrismaClient | undefined;

try {
    prisma = new PrismaClient();
} catch (error) {
    console.warn("Failed to initialize Prisma Client. Database features will be disabled.", error);
}

const DEMO_USER = {
    id: "demo-user-id",
    name: "Demo User",
    email: "demo@syncnotes.com",
    image: null,
    subscriptionTier: "STUDENT"
};

const handler = NextAuth({
    adapter: prisma ? PrismaAdapter(prisma) : undefined,
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

                // Hardcoded demo user check - bypasses DB
                if (credentials.email === "demo@syncnotes.com" && credentials.password === "demo12") {
                    console.log("Demo user login successful");
                    return DEMO_USER;
                }

                try {
                    if (!prisma) {
                        console.log("Prisma client not available, skipping DB check");
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
                } catch (error) {
                    console.error("Database error during authorization:", error);
                    return null;
                }
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

                // If it's the demo user, return hardcoded data without DB lookup
                if (token.sub === DEMO_USER.id) {
                    (session.user as any).subscriptionTier = DEMO_USER.subscriptionTier;
                    return session;
                }

                try {
                    if (!prisma) {
                        return session;
                    }
                    // Fetch latest user data to get subscription tier
                    const user = await prisma.user.findUnique({
                        where: { id: token.sub as string }
                    });
                    (session.user as any).subscriptionTier = user?.subscriptionTier;
                } catch (error) {
                    console.error("Database error during session callback:", error);
                }
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
    // Fallback secret for demo/development if env var is missing
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-demo-only-do-not-use-in-production",
});

export { handler as GET, handler as POST };
