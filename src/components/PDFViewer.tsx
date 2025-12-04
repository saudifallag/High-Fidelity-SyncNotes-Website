"use client"

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Set worker source for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PDFViewerProps {
    fileContent: string // Base64
    onPageChange: (pageNumber: number) => void
    children?: React.ReactNode
    width?: number
    onPageLoad?: (dimensions: { width: number; height: number }) => void
}

export default function PDFViewer({ fileContent, onPageChange, children, width = 1000, onPageLoad }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
        onPageChange(1)
    }

    function onPageLoadSuccess(page: { width: number; height: number; originalWidth: number; originalHeight: number }) {
        if (onPageLoad) {
            onPageLoad({ width: page.width, height: page.height })
        }
    }

    const changePage = (offset: number) => {
        const newPage = Math.min(Math.max(1, pageNumber + offset), numPages)
        setPageNumber(newPage)
        onPageChange(newPage)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="border rounded-lg overflow-hidden shadow-md mb-4 relative" style={{ width: width }}>
                <Document
                    file={fileContent}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="max-w-full"
                >
                    <Page
                        pageNumber={pageNumber}
                        width={width}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onLoadSuccess={onPageLoadSuccess}
                    />
                </Document>
                {children && <div className="absolute inset-0 z-10 pointer-events-none">{children}</div>}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Button>

                <span className="text-sm font-medium">
                    Page {pageNumber} of {numPages}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => changePage(1)}
                    disabled={pageNumber >= numPages}
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
