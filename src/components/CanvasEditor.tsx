"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, FabricImage, PencilBrush } from 'fabric'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Eraser, Pen, Undo, Redo, Save } from 'lucide-react'

interface CanvasEditorProps {
    fileContent?: string // Base64 image or PDF page image
    initialAnnotations?: string // JSON string
    onSave: (annotations: string) => void
    transparent?: boolean
}

export default function CanvasEditor({ fileContent, initialAnnotations, onSave, transparent = false }: CanvasEditorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null)
    const [brushSize, setBrushSize] = useState([5])
    const [color, setColor] = useState('#000000')
    const [isEraser, setIsEraser] = useState(false)

    // ... existing useEffects ...

    // Initialize Canvas
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = new Canvas(canvasRef.current, {
            isDrawingMode: true,
            width: 800,
            height: 600,
            backgroundColor: transparent ? 'transparent' : undefined // Ensure transparent bg
        })

        setFabricCanvas(canvas)

        return () => {
            canvas.dispose()
        }
    }, [transparent]) // Re-init if transparent changes

    // Load Background Image
    useEffect(() => {
        if (!fabricCanvas || !fileContent) return

        FabricImage.fromURL(fileContent).then((img) => {
            // Scale image to fit canvas width
            const scale = (fabricCanvas.width || 800) / (img.width || 1)
            img.set({
                scaleX: scale,
                scaleY: scale,
                originX: 'left',
                originY: 'top',
            })

            fabricCanvas.backgroundImage = img
            fabricCanvas.renderAll()
            // Adjust canvas height to image height
            fabricCanvas.setHeight((img.height || 600) * scale)
        }).catch(err => {
            console.error("Error loading image:", err)
        })
    }, [fabricCanvas, fileContent])

    // Load Initial Annotations
    useEffect(() => {
        if (!fabricCanvas || !initialAnnotations) return

        try {
            const data = JSON.parse(initialAnnotations)
            fabricCanvas.loadFromJSON(data).then(() => {
                fabricCanvas.renderAll()
            })
        } catch (e) {
            console.error("Failed to load annotations", e)
        }
    }, [fabricCanvas, initialAnnotations])

    // Update Brush Settings
    useEffect(() => {
        if (!fabricCanvas) return

        fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas)
        fabricCanvas.freeDrawingBrush.width = brushSize[0]
        fabricCanvas.freeDrawingBrush.color = isEraser ? '#ffffff' : color // Simple eraser (white paint)

        // Better eraser logic could be implemented with globalCompositeOperation if needed
    }, [fabricCanvas, brushSize, color, isEraser])

    const handleSave = () => {
        if (!fabricCanvas) return
        const json = JSON.stringify(fabricCanvas.toJSON())
        onSave(json)
    }

    return (
        <div className={`flex flex-col gap-4 ${transparent ? '' : 'border rounded-lg p-4 bg-gray-50'}`}>
            <div className={`flex items-center gap-4 p-2 rounded shadow-sm ${transparent ? 'bg-white/90 backdrop-blur-sm border absolute top-2 left-2 right-2 z-20' : 'bg-white'}`}>
                <Button
                    variant={!isEraser ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsEraser(false)}
                >
                    <Pen className="w-4 h-4" />
                </Button>

                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                    disabled={isEraser}
                />

                <div className="w-32">
                    <Slider
                        value={brushSize}
                        onValueChange={setBrushSize}
                        min={1}
                        max={50}
                        step={1}
                    />
                </div>

                <Button
                    variant={isEraser ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsEraser(true)}
                >
                    <Eraser className="w-4 h-4" />
                </Button>

                <div className="flex-1" />

                <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Drawing
                </Button>
            </div>

            <div className={`${transparent ? '' : 'border border-gray-200 shadow-inner bg-white mx-auto'}`}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}
