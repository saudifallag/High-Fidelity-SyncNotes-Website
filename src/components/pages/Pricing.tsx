import { Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      'Up to 50 notes',
      'Basic formatting',
      '1 GB storage',
      'Web access only',
      'Community support',
    ],
    highlighted: false,
  },
  {
    name: 'Student',
    price: '$3',
    period: '/month',
    features: [
      'Unlimited notes',
      'Advanced formatting',
      '10 GB storage',
      'Web & mobile access',
      'Priority support',
      'Collaboration tools',
      'Custom tags',
    ],
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    features: [
      'Everything in Student',
      'Unlimited storage',
      'Advanced analytics',
      'API access',
      'Team workspaces',
      'Custom integrations',
      '24/7 dedicated support',
      'Export to all formats',
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your note-taking needs. Upgrade or downgrade at any time.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            hoverable
            className={`p-8 ${
              plan.highlighted ? 'ring-2 ring-[#14b8a6] shadow-xl' : ''
            }`}
          >
            {plan.highlighted && (
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#14b8a6] text-white rounded-full text-xs">
                  Most Popular
                </span>
              </div>
            )}

            <h2 className="text-gray-900 mb-2">{plan.name}</h2>
            
            <div className="mb-6">
              <span className="text-4xl text-gray-900">{plan.price}</span>
              <span className="text-gray-600">{plan.period}</span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.highlighted ? 'primary' : 'outline'}
              className="w-full"
            >
              {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Have questions?{' '}
          <a
            href="#"
            className="text-[#14b8a6] hover:underline focus:outline-none focus:ring-2 focus:ring-[#14b8a6] rounded"
          >
            Contact our sales team
          </a>
        </p>
      </div>
    </div>
  );
}
