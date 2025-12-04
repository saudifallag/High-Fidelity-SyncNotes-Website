'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Note {
    id: string;
    title: string;
    content: string | null;
    updatedAt: string;
    collaborators?: { id: string }[];
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    const totalNotes = notes.length;
    // Mocking "Recent Activity" and "Favorites" for now as we don't have those specific fields yet
    // But we can calculate recent activity based on updatedAt
    const recentNotes = notes.slice(0, 3);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, {session?.user?.name || 'User'}</h1>
                    <p className="text-gray-600">Here's what's happening with your notes today.</p>
                </div>
                <Link href="/editor">
                    <Button className="bg-[#14b8a6] hover:bg-[#0f9688]">
                        <Plus className="w-4 h-4 mr-2" />
                        New Note
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Notes</CardTitle>
                        <FileText className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{totalNotes}</div>
                        <p className="text-xs text-gray-500">All your ideas in one place</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Recent Activity</CardTitle>
                        <Clock className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">Just now</div>
                        <p className="text-xs text-gray-500">Last synced</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Shared With Me</CardTitle>
                        <Star className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {notes.filter(n => n.collaborators && n.collaborators.length > 0).length}
                        </div>
                        <p className="text-xs text-gray-500">Collaborative notes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Notes */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Notes</h2>
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading notes...</div>
                ) : notes.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500 mb-4">You haven't created any notes yet.</p>
                        <Link href="/editor">
                            <Button variant="outline">Create your first note</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentNotes.map((note) => (
                            <Link key={note.id} href={`/editor?noteId=${note.id}`}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                    <CardHeader>
                                        <CardTitle className="text-base font-medium truncate">{note.title}</CardTitle>
                                        <p className="text-xs text-gray-500">
                                            Edited {new Date(note.updatedAt).toLocaleDateString()}
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {note.content || 'No content preview available.'}
                                        </p>
                                        <div className="mt-4 flex gap-2">
                                            {note.collaborators && note.collaborators.length > 0 && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Shared</span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
