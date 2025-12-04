'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function PublicFooter() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity inline-flex">
                            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SN</span>
                            </div>
                            <span className="text-xl font-bold text-white">SyncNotes</span>
                        </Link>
                        <p className="text-sm">
                            The intelligent note-taking platform for modern learners and professionals.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/#security" className="hover:text-white transition-colors">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/support" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/support#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                        </ul>
                    </div>
                </div>
                <Separator className="my-8 bg-gray-800" />
                <div className="text-center text-sm">
                    <p>© 2025 SyncNotes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
