"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Trash2, Upload, Image as ImageIcon, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import CanvasEditor to avoid SSR issues with Fabric.js
const CanvasEditor = dynamic(() => import('./CanvasEditor'), { ssr: false })
// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false })

interface Note {
    id: string
    title: string
    content: string | null
    fileContent?: string | null
    fileType?: string | null
    annotations?: string | null
    tags?: string[]
    updatedAt: string
}

interface NoteEditorProps {
    note: Note | null
    onSave: (note: Partial<Note>) => void
    onDelete: (id: string) => void
    onShare: () => void
}

const AVAILABLE_TAGS = ['Math', 'Work', 'Ideas', 'Personal', 'Urgent']

export default function NoteEditor({ note, onSave, onDelete, onShare }: NoteEditorProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [fileType, setFileType] = useState<string | null>(null)
    const [annotations, setAnnotations] = useState<string | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number } | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content || "")
            setFileContent(note.fileContent || null)
            setFileType(note.fileType || null)
            setAnnotations(note.annotations || null)
            setTags(note.tags || [])
        } else {
            setTitle("")
            setContent("")
            setFileContent(null)
            setFileType(null)
            setAnnotations(null)
            setTags([])
        }
    }, [note])

    const handleSave = async () => {
        if (!note) return
        setIsSaving(true)
        await onSave({
            id: note.id,
            title,
            content,
            fileContent,
            fileType,
            annotations,
            tags
        })
        setIsSaving(false)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFileContent(reader.result as string)
                setFileType(file.type)
                setAnnotations(null) // Clear annotations on new file upload
            }
            reader.readAsDataURL(file)
        }
    }

    const toggleTag = (tag: string) => {
        setTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    if (!note) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Select a note to edit or create a new one
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="text-2xl font-bold border-transparent hover:border-gray-200 focus:border-teal-500 transition-colors px-2 h-auto -ml-2"
                    />

                    {/* Tags Selection */}
                    <div className="flex flex-wrap gap-2 items-center">
                        {AVAILABLE_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${tags.includes(tag)
                                    ? 'bg-teal-100 text-teal-700 border-teal-200'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-200'
                                    }`}
                            >
                                {tag} {tags.includes(tag) && '✓'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 shrink-0">
                    <Button
                        variant="outline"
                        onClick={onShare}
                        className="text-gray-600 hover:text-teal-600"
                    >
                        Share
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => note && onDelete(note.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-teal-600 hover:bg-teal-700">
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>

            <div className="flex gap-4 items-center border-b pb-4">
                <div className="relative">
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outline" asChild className="cursor-pointer">
                            <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload PDF or Image
                            </span>
                        </Button>
                    </label>
                </div>
                {fileType && (
                    <span className="text-sm text-gray-500 flex items-center">
                        {fileType.includes('pdf') ? <FileText className="w-4 h-4 mr-2" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                        File uploaded
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-6">
                {fileContent && (
                    <Card className="overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b py-3">
                            <CardTitle className="text-sm font-medium text-gray-500">Annotation Canvas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {fileType?.includes('pdf') ? (
                                <div className="bg-gray-100 p-4 flex justify-center">
                                    <PDFViewer
                                        fileContent={fileContent}
                                        onPageChange={() => { }}
                                        width={1000}
                                        onPageLoad={(dims) => setPdfDimensions(dims)}
                                    >
                                        <div className="pointer-events-auto w-full h-full">
                                            <CanvasEditor
                                                initialAnnotations={annotations || undefined}
                                                onSave={setAnnotations}
                                                transparent={true}
                                                width={pdfDimensions?.width || 1000}
                                                height={pdfDimensions?.height || 800}
                                            />
                                        </div>
                                    </PDFViewer>
                                </div>
                            ) : (
                                <div className="p-4">
                                    <CanvasEditor
                                        fileContent={fileContent}
                                        initialAnnotations={annotations || undefined}
                                        onSave={setAnnotations}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">Note Content</label>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start typing your note here..."
                        className="min-h-[300px] resize-none border-gray-200 focus-visible:ring-teal-500 text-lg leading-relaxed p-4"
                    />
                </div>
            </div>
        </div>
    )
}
