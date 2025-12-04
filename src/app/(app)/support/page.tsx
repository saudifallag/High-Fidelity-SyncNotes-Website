'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SupportPage() {
    const faqs = [
        {
            question: "Is SyncNotes really free?",
            answer: "Yes! Our Free plan includes up to 50 notes and basic formatting. It's perfect for personal use. We also offer Student and Pro plans for power users."
        },
        {
            question: "How does the AI summarization work?",
            answer: "Our Pro plan uses advanced language models to analyze your notes and generate concise summaries, action items, and key takeaways automatically."
        },
        {
            question: "Can I export my notes?",
            answer: "Absolutely. You can export your notes to PDF, Markdown, or plain text at any time. Your data belongs to you."
        },
        {
            question: "Is my data secure?",
            answer: "Security is our top priority. All notes are encrypted in transit and at rest. We use industry-standard security practices to keep your information safe."
        },
        {
            question: "Do you offer student discounts?",
            answer: "Yes! We offer a discounted Student plan with all the essential features you need for your studies. Just sign up with your .edu email."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Support & FAQ</h1>
                <p className="text-xl text-gray-600">
                    Find answers to common questions or reach out to our team.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            <div className="mt-16 text-center">
                <p className="text-gray-600 mb-4">Still have questions?</p>
                <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                    Contact Support
                </a>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-900">{question}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                    {answer}
                </div>
            )}
        </div>
    );
}
