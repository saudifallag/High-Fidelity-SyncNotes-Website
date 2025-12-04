import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { handler } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const session = await getServerSession(handler);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const notes = await prisma.note.findMany({
            where: { userId: session.user.id },
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
    const session = await getServerSession(handler);

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

        const note = await prisma.note.create({
            data: {
                title,
                content,
                fileContent,
                fileType,
                annotations,
                userId: session.user.id,
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
    const session = await getServerSession(handler);

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

        // Verify ownership
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote || existingNote.userId !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const note = await prisma.note.update({
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
    const session = await getServerSession(handler);

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

        // Verify ownership
        const existingNote = await prisma.note.findUnique({
            where: { id }
        });

        if (!existingNote || existingNote.userId !== session.user.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await prisma.note.delete({
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
