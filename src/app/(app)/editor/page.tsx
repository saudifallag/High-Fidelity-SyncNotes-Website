'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NoteEditor from '@/components/NoteEditor';
import { Button } from '@/components/ui/button';
import { Plus, Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Note {
    id: string;
    title: string;
    content: string | null;
    fileContent?: string | null;
    fileType?: string | null;
    annotations?: string | null;
    updatedAt: string;
    tags?: string[]; // Assuming tags might be added later or part of content
}

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

function EditorContent() {
    const { toast } = useToast()
    const router = useRouter()
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const searchParams = useSearchParams();
    const tagFilter = searchParams.get('tag');

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareEmail, setShareEmail] = useState('');
    const [shareLoading, setShareLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch('/api/notes');
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            }
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
    };

    const handleCreateNote = async () => {
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'Untitled Note',
                    content: '',
                }),
            });

            if (response.ok) {
                const newNote = await response.json();
                setNotes([newNote, ...notes]);
                setSelectedNoteId(newNote.id);
            } else {
                const errorData = await response.json();
                console.error('Failed to create note:', errorData);
                alert(`Failed to create note: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Failed to create note:', error);
            alert('An error occurred while creating the note. Please try again.');
        }
    };

    const handleSaveNote = async (updatedNote: Partial<Note>) => {
        if (!selectedNoteId) return;

        try {
            const response = await fetch('/api/notes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedNoteId,
                    ...updatedNote,
                }),
            });

            if (response.ok) {
                const savedNote = await response.json();
                setNotes(notes.map((n) => (n.id === selectedNoteId ? savedNote : n)));
            }
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };

    const handleDeleteNote = async (id: string) => {
        try {
            const response = await fetch(`/api/notes?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setNotes(notes.filter((n) => n.id !== id));
                if (selectedNoteId === id) {
                    setSelectedNoteId(null);
                }
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleShareNote = async () => {
        if (!selectedNoteId || !shareEmail) return;

        setShareLoading(true);
        try {
            // Split emails by comma and trim
            const emails = shareEmail.split(',').map(e => e.trim()).filter(e => e);

            // Send request for each email (or update API to handle array)
            // For now, we'll loop sequentially as the API likely expects one email
            // Ideally, update API to accept array
            let allSharedSuccessfully = true;
            for (const email of emails) {
                const response = await fetch('/api/notes/share', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        noteId: selectedNoteId,
                        email: email
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    allSharedSuccessfully = false;
                    if (response.status === 403 && data.message.includes('Upgrade')) {
                        toast({
                            variant: "destructive",
                            title: "Upgrade Required",
                            description: "Sharing is a premium feature. Upgrade to Pro?",
                            action: <Button variant="outline" size="sm" onClick={() => router.push('/pricing')}>Upgrade</Button>,
                        });
                        setShareLoading(false);
                        return; // Stop sharing if upgrade is required
                    } else {
                        console.error(`Failed to share with ${email}: ${data.message}`);
                        toast({
                            variant: "destructive",
                            title: "Share Failed",
                            description: `Could not share with ${email}: ${data.message || 'Unknown error'}`,
                        });
                    }
                }
            }

            if (allSharedSuccessfully) {
                toast({
                    title: "Note Shared",
                    description: `Successfully shared with ${emails.length} user(s).`,
                    className: "bg-green-50 border-green-200 text-green-900",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Partial Share",
                    description: "Some emails could not be shared. Check console for details.",
                });
            }

            setShareEmail('');
            setIsShareModalOpen(false);

        } catch (error) {
            console.error('Failed to share note:', error);
            alert('An error occurred while sharing');
        } finally {
            setShareLoading(false);
        }
    };

    const filteredNotes = notes.filter((note) => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = tagFilter
            ? note.tags?.includes(tagFilter) ||
            note.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
            note.content?.toLowerCase().includes(tagFilter.toLowerCase())
            : true;
        return matchesSearch && matchesTag;
    });

    const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

    return (
        <div className="flex h-[calc(100vh-4rem)] relative"> {/* Subtract header height approx */}
            {/* Notes List Sidebar */}
            <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
                <div className="p-4 border-b border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Notes</h2>
                        <Button size="sm" onClick={handleCreateNote} className="bg-[#14b8a6] hover:bg-[#0f9688]">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search notes..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {tagFilter && (
                        <div className="text-xs text-[#14b8a6] font-medium flex items-center">
                            Filtering by: {tagFilter}
                        </div>
                    )}
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => setSelectedNoteId(note.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedNoteId === note.id ? 'bg-blue-50 border-l-4 border-l-[#14b8a6]' : ''
                                }`}
                        >
                            <h3 className="font-medium text-gray-900 truncate">{note.title || 'Untitled'}</h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {note.content || 'No content'}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {note.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                <FileText className="w-3 h-3" />
                                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                    {filteredNotes.length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-sm">
                            No notes found.
                        </div>
                    )}
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 bg-gray-50 overflow-hidden relative">
                {selectedNote ? (
                    <NoteEditor
                        note={selectedNote}
                        onSave={handleSaveNote}
                        onDelete={handleDeleteNote}
                        onShare={() => setIsShareModalOpen(true)}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <FileText className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a note to view or edit</p>
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {isShareModalOpen && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-lg font-semibold mb-4">Share Note</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter email addresses separated by commas.
                        </p>
                        <Input
                            placeholder="user1@example.com, user2@example.com"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            className="mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsShareModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleShareNote} disabled={shareLoading || !shareEmail}>
                                {shareLoading ? 'Sharing...' : 'Share'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
