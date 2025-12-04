'use client';

import React from 'react';
import { Brain, Zap, Users, ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Reimagining Note-Taking for the AI Era</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    SyncNotes isn't just another place to store text. It's a thinking partner designed to help you capture, organize, and synthesize ideas at the speed of thought.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Speed & Simplicity</h3>
                    <p className="text-gray-600">
                        We believe the best tools get out of your way. Our interface is designed for flow, not friction.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Insight</h3>
                    <p className="text-gray-600">
                        Our aspiration is to integrate advanced AI that doesn't just summarize, but connects dots between your notes.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Collaboration First</h3>
                    <p className="text-gray-600">
                        Ideas grow when shared. We're building real-time collaboration tools that feel like magic.
                    </p>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-[#2d3748] rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                    We share weekly updates on our development progress, AI research, and productivity tips. No spam, ever.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#14b8a6] hover:bg-[#0d9488] rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        Subscribe <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
