import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card } from '../ui/Card';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I sync my notes across devices?',
    answer:
      'SyncNotes automatically syncs your notes across all your devices when you\'re logged in. Simply sign in with the same account on each device, and your notes will be available everywhere. The sync status is shown in the sidebar - look for the "All synced" indicator with a green checkmark.',
  },
  {
    question: 'Can I export my notes to other formats?',
    answer:
      'Yes! You can export your notes in multiple formats including PDF, Markdown, and plain text. To export a note, open it in the editor, click on the "Print View" button in the header, and select your preferred export format. Pro users have access to additional export formats including Word documents and HTML.',
  },
  {
    question: 'Is my data secure and private?',
    answer:
      'Absolutely. We take security seriously. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We never share your personal information or notes with third parties. You can read our full privacy policy for more details on how we protect your data.',
  },
  {
    question: 'How do I organize notes with tags and projects?',
    answer:
      'You can organize notes using both projects and tags. Projects are larger categories (like "Math", "Work", or "Ideas") that you can select from the sidebar. Tags are more specific labels you can add to individual notes in the editor\'s properties panel. Separate multiple tags with commas to keep your notes well-organized and easy to find.',
  },
];

export function Support() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-gray-900">Support & FAQ</h1>
        </div>
        <p className="text-gray-600">
          Find answers to commonly asked questions about SyncNotes. Can't find what you're looking
          for? Contact us directly.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isExpanded = expandedItems.includes(index);
          return (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-inset"
                aria-expanded={isExpanded}
              >
                <h3 className="text-gray-900 pr-4">{faq.question}</h3>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="px-6 pb-6 text-gray-700 border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Additional Help */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-gray-900 mb-4">Still Need Help?</h2>
        <p className="text-gray-700 mb-6">
          If you couldn't find the answer you were looking for, our support team is here to help.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#14b8a6] text-white rounded-lg hover:bg-[#0f9688] transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2"
          >
            Contact Support
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#14b8a6] text-[#14b8a6] rounded-lg hover:bg-[#14b8a6] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2"
          >
            View Documentation
          </a>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-gray-900 mb-3">Quick Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#14b8a6]">•</span>
            <span>Use keyboard shortcut ⌘K to quickly search your notes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#14b8a6]">•</span>
            <span>Notes are auto-saved every few seconds while you type</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#14b8a6]">•</span>
            <span>Click on any tag to filter notes by that category</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
