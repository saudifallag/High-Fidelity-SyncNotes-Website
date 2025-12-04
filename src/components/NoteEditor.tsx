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
    updatedAt: string
}

interface NoteEditorProps {
    note: Note | null
    onSave: (note: Partial<Note>) => void
    onDelete: (id: string) => void
}

export default function NoteEditor({ note, onSave, onDelete }: NoteEditorProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [fileContent, setFileContent] = useState<string | null>(null)
    const [fileType, setFileType] = useState<string | null>(null)
    const [annotations, setAnnotations] = useState<string | null>(null)
    const [pdfDimensions, setPdfDimensions] = useState<{ width: number; height: number } | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content || "")
            setFileContent(note.fileContent || null)
            setFileType(note.fileType || null)
            setAnnotations(note.annotations || null)
        } else {
            setTitle("")
            setContent("")
            setFileContent(null)
            setFileType(null)
            setAnnotations(null)
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

    return (
        <div className="h-full flex flex-col gap-6 p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                    className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                />
                <div className="flex gap-2">
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

            <div className="flex gap-4 items-center">
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

            {fileContent && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-gray-500">Annotation Canvas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {fileType?.includes('pdf') ? (
                            <div className="space-y-4">
                                <PDFViewer
                                    fileContent={fileContent}
                                    onPageChange={() => { }} // TODO: Handle multi-page annotations
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
                            <CanvasEditor
                                fileContent={fileContent}
                                initialAnnotations={annotations || undefined}
                                onSave={setAnnotations}
                            />
                        )}
                    </CardContent>
                </Card>
            )}

            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your note here..."
                className="min-h-[300px] resize-none border-gray-200 focus-visible:ring-teal-500"
            />
        </div>
    )
}
