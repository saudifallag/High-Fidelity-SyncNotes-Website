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

function EditorContent() {
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

        // Check subscription tier (mock check for now, ideally from session)
        // In a real app, we'd check session.user.subscriptionTier
        // For this demo, we'll assume everyone can share for testing, 
        // OR we can fetch the user profile to check.

        setShareLoading(true);
        try {
            const response = await fetch('/api/notes/share', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    noteId: selectedNoteId,
                    email: shareEmail
                }),
            });

            if (response.ok) {
                alert('Note shared successfully!');
                setShareEmail('');
                setIsShareModalOpen(false);
            } else {
                const data = await response.json();
                if (response.status === 403 && data.message.includes('Upgrade')) {
                    if (confirm("Sharing is a premium feature. Upgrade to Pro?")) {
                        window.location.href = '/pricing';
                    }
                } else {
                    alert(data.message || 'Failed to share note');
                }
            }
        } catch (error) {
            console.error('Failed to share note:', error);
            alert('An error occurred while sharing');
        } finally {
            setShareLoading(false);
        }
    };

    const filteredNotes = notes.filter((note) => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
        // Basic tag filtering simulation (if tags were in DB, we'd check note.tags)
        // For now, we'll check if the tag is in the title or content as a simple fallback
        const matchesTag = tagFilter
            ? note.title.toLowerCase().includes(tagFilter.toLowerCase()) ||
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
                    <>
                        <div className="absolute top-4 right-4 z-10">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsShareModalOpen(true)}
                                className="bg-white"
                            >
                                Share
                            </Button>
                        </div>
                        <NoteEditor
                            note={selectedNote}
                            onSave={handleSaveNote}
                            onDelete={handleDeleteNote}
                        />
                    </>
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
                            Enter the email address of the user you want to share this note with.
                        </p>
                        <Input
                            placeholder="user@example.com"
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
