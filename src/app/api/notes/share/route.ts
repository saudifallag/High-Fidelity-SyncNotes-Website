import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db as prisma } from "@/lib/db";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { noteId, email } = await req.json();

        if (!noteId || !email) {
            return NextResponse.json(
                { message: "Note ID and Email are required" },
                { status: 400 }
            );
        }

        // Check subscription tier
        const user = await prisma.user.findUnique({
            where: { id: (session.user as any).id }
        });

        if (user?.subscriptionTier === 'FREE') {
            return NextResponse.json(
                { message: "Upgrade to Pro to share notes." },
                { status: 403 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        // Verify ownership
        const note = await prisma.note.findUnique({
            where: { id: noteId },
            include: { collaborators: true }
        });

        if (!note) {
            return NextResponse.json({ message: "Note not found" }, { status: 404 });
        }

        if (note.userId !== (session.user as any).id) {
            return NextResponse.json({ message: "Only the owner can share this note" }, { status: 403 });
        }

        // Find user to share with
        const userToShare = await prisma.user.findUnique({
            where: { email }
        });

        if (!userToShare) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (userToShare.id === note.userId) {
            return NextResponse.json({ message: "You cannot share with yourself" }, { status: 400 });
        }

        // Check if already shared
        const isAlreadyShared = note.collaborators.some(c => c.id === userToShare.id);
        if (isAlreadyShared) {
            return NextResponse.json({ message: "Note already shared with this user" }, { status: 400 });
        }

        // Add to collaborators
        await prisma.note.update({
            where: { id: noteId },
            data: {
                collaborators: {
                    connect: { id: userToShare.id }
                }
            }
        });

        return NextResponse.json({ message: "Note shared successfully" });

    } catch (error) {
        console.error("Error sharing note:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
