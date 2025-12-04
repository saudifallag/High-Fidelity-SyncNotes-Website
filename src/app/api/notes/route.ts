import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db as prisma } from "@/lib/db";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        if (!prisma) {
            return NextResponse.json([]);
        }
        const notes = await prisma.note.findMany({
            where: {
                OR: [
                    { userId: (session.user as any).id },
                    { collaborators: { some: { id: (session.user as any).id } } }
                ]
            },
            include: {
                collaborators: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: { updatedAt: "desc" },
        });

        return NextResponse.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, content, fileContent, fileType, annotations, tags } = await req.json();

        if (!title) {
            return NextResponse.json(
                { message: "Title is required" },
                { status: 400 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        const userId = (session.user as any).id;

        // Ensure user exists in DB (specifically for Demo User who bypasses DB auth)
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            if (userId === 'demo-user-id') {
                // Check if a user with this email already exists (but with a different ID)
                const conflictingUser = await prisma.user.findUnique({
                    where: { email: 'demo@syncnotes.com' }
                });

                if (conflictingUser) {
                    // Delete the conflicting user to enforce the correct ID for the session
                    // This relies on onDelete: Cascade in the schema to clean up related notes
                    await prisma.user.delete({
                        where: { email: 'demo@syncnotes.com' }
                    });
                }

                await prisma.user.create({
                    data: {
                        id: userId,
                        email: 'demo@syncnotes.com',
                        name: 'Demo User',
                        image: '/placeholder-user.jpg',
                        subscriptionTier: 'FREE'
                    }
                });
            } else {
                return NextResponse.json({ message: "User account not found" }, { status: 404 });
            }
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                fileContent,
                fileType,
                annotations,
                tags,
                userId: userId,
            },
            include: {
                collaborators: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(note, { status: 201 });
    } catch (error: any) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { message: `Internal server error: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, title, content, fileContent, fileType, annotations, tags } = await req.json();

        if (!id || !title) {
            return NextResponse.json(
                { message: "ID and Title are required" },
                { status: 400 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        // Verify ownership or collaboration
        const existingNote = await prisma.note.findUnique({
            where: { id },
            include: { collaborators: true }
        });

        const userId = (session.user as any).id;
        const isOwner = existingNote?.userId === userId;
        const isCollaborator = existingNote?.collaborators.some(c => c.id === userId);

        if (!existingNote || (!isOwner && !isCollaborator)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const note = await prisma!.note.update({
            where: { id },
            data: {
                title,
                content,
                fileContent,
                fileType,
                annotations,
                tags,
            },
            include: {
                collaborators: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(note);
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "ID is required" },
                { status: 400 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        // Verify ownership or collaboration
        const existingNote = await prisma.note.findUnique({
            where: { id },
            include: { collaborators: true }
        });

        const userId = (session.user as any).id;
        const isOwner = existingNote?.userId === userId;
        const isCollaborator = existingNote?.collaborators.some(c => c.id === userId);

        if (!existingNote || (!isOwner && !isCollaborator)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (isOwner) {
            // Owner deletes the note entirely
            await prisma!.note.delete({
                where: { id },
            });
            return NextResponse.json({ message: "Note deleted" });
        } else {
            // Collaborator only removes themselves
            await prisma!.note.update({
                where: { id },
                data: {
                    collaborators: {
                        disconnect: { id: userId }
                    }
                }
            });
            return NextResponse.json({ message: "Removed from shared note" });
        }

    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
