'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { useModal } from '@/context/ModalContext'

export function PublicFooter() {
    const { openModal } = useModal()

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
                            <li>
                                <button onClick={() => openModal('features')} className="hover:text-white transition-colors text-left">
                                    Features
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('pricing')} className="hover:text-white transition-colors text-left">
                                    Pricing
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('security')} className="hover:text-white transition-colors text-left">
                                    Security
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button onClick={() => openModal('about')} className="hover:text-white transition-colors text-left">
                                    About
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('blog')} className="hover:text-white transition-colors text-left">
                                    Blog
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('support')} className="hover:text-white transition-colors text-left">
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button onClick={() => openModal('support')} className="hover:text-white transition-colors text-left">
                                    Help Center
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('support')} className="hover:text-white transition-colors text-left">
                                    FAQ
                                </button>
                            </li>
                            <li>
                                <button onClick={() => openModal('status')} className="hover:text-white transition-colors text-left">
                                    Status
                                </button>
                            </li>
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
