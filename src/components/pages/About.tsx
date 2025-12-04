import { Target, Eye, Zap, Accessibility, Grid, Palette } from 'lucide-react';
import { Card } from '../ui/Card';

const designPrinciples = [
  {
    icon: Eye,
    title: 'Usability First',
    description: 'Intuitive interface that requires minimal learning curve for all users.',
  },
  {
    icon: Accessibility,
    title: 'Accessible',
    description: 'WCAG AA compliant design ensuring everyone can use SyncNotes effectively.',
  },
  {
    icon: Grid,
    title: 'Consistent',
    description: 'Cohesive design system with predictable patterns and interactions.',
  },
];

const appliedPrinciples = [
  'Clear visual hierarchy with consistent typography and spacing',
  'High contrast ratios (4.5:1 for text, 3:1 for large elements)',
  'Keyboard navigation support throughout the entire interface',
  'Focus indicators visible on all interactive elements',
  'Error states with descriptive text and visual cues',
  'Responsive design that works across all device sizes',
  'Color-independent information display',
  'Adequate touch targets (minimum 44x44px)',
];

export function About() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Mission Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-gray-900">Our Mission</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-700 mb-4">
            SyncNotes is designed to empower learners and professionals with a seamless, accessible
            note-taking experience. We believe that great tools should be intuitive, reliable, and
            available to everyone.
          </p>
          <p className="text-gray-700">
            Our platform combines powerful features with thoughtful design principles to create an
            environment where your ideas can flourish without technical barriers getting in the way.
          </p>
        </div>
      </div>

      {/* Design Philosophy */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-gray-900">Design Philosophy</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designPrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <Card key={principle.title} className="p-6">
                <div className="w-10 h-10 bg-[#14b8a6] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#14b8a6]" />
                </div>
                <h3 className="text-gray-900 mb-2">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Applied Principles */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-gray-900">Applied Principles</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-700 mb-6">
            Our design implementation follows strict accessibility and usability guidelines:
          </p>
          <ul className="space-y-3">
            {appliedPrinciples.map((principle, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#14b8a6] rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Academic Note */}
      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Academic Project Note:</span> This prototype was created
          as part of an HCI (Human-Computer Interaction) course to demonstrate the practical
          application of usability and accessibility principles in web design.
        </p>
      </div>
    </div>
  );
}
