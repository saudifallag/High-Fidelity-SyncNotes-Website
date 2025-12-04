import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db as prisma } from "@/lib/db";

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
            where: { userId: (session.user as any).id },
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
        const { title, content, fileContent, fileType, annotations } = await req.json();

        if (!title) {
            return NextResponse.json(
                { message: "Title is required" },
                { status: 400 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        const note = await prisma.note.create({
            data: {
                title,
                content,
                fileContent,
                fileType,
                annotations,
                userId: (session.user as any).id,
            },
        });

        return NextResponse.json(note, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { message: "Internal server error" },
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
        const { id, title, content, fileContent, fileType, annotations } = await req.json();

        if (!id || !title) {
            return NextResponse.json(
                { message: "ID and Title are required" },
                { status: 400 }
            );
        }

        if (!prisma) {
            return NextResponse.json({ message: "Database not available" }, { status: 503 });
        }

        // Verify ownership
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote || existingNote.userId !== (session.user as any).id) {
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
            },
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

        // Verify ownership
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote || existingNote.userId !== (session.user as any).id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await prisma!.note.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Note deleted" });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
