'use client';

import React, { useState } from 'react';
import { Check, CreditCard } from 'lucide-react';

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const tiers = [
        {
            name: 'Free',
            price: 0,
            description: 'Perfect for getting started',
            features: [
                'Up to 50 notes',
                'Basic formatting',
                'Mobile access',
                '7-day version history'
            ],
            cta: 'Current Plan',
            current: true
        },
        {
            name: 'Student',
            price: isAnnual ? 4 : 5,
            description: 'Essential tools for students',
            features: [
                'Unlimited notes',
                'PDF annotation',
                'Audio recording',
                '30-day version history',
                'Priority support'
            ],
            cta: 'Upgrade to Student',
            highlight: true
        },
        {
            name: 'Pro',
            price: isAnnual ? 8 : 10,
            description: 'For power users and professionals',
            features: [
                'Everything in Student',
                'AI summarization',
                'Team collaboration',
                'Unlimited version history',
                'API access'
            ],
            cta: 'Upgrade to Pro'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
                <p className="text-xl text-gray-600 mb-8">Choose the plan that fits your needs</p>

                <div className="flex items-center justify-center gap-4">
                    <span className={`text-sm ${!isAnnual ? 'font-bold text-gray-900' : 'text-gray-500'}`}>Monthly</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 ${isAnnual ? 'bg-[#14b8a6]' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                    <span className={`text-sm ${isAnnual ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                        Annual <span className="text-[#14b8a6] font-normal">(Save 20%)</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {tiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={`rounded-2xl p-8 border ${tier.highlight
                                ? 'border-[#14b8a6] shadow-lg ring-1 ring-[#14b8a6] relative'
                                : 'border-gray-200 shadow-sm'
                            } bg-white flex flex-col`}
                    >
                        {tier.highlight && (
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#14b8a6] text-white px-4 py-1 rounded-full text-sm font-medium">
                                Most Popular
                            </span>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                        <p className="text-gray-500 mb-6">{tier.description}</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                            <span className="text-gray-500">/month</span>
                            {isAnnual && tier.price > 0 && (
                                <p className="text-sm text-gray-500 mt-1">Billed annually</p>
                            )}
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {tier.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-[#14b8a6] flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${tier.current
                                    ? 'bg-gray-100 text-gray-900 cursor-default'
                                    : tier.highlight
                                        ? 'bg-[#14b8a6] text-white hover:bg-[#0d9488]'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                }`}
                        >
                            {tier.cta}
                        </button>
                    </div>
                ))}
            </div>

            <div className="text-center border-t border-gray-200 pt-12">
                <p className="text-gray-500 mb-6">Secure payments powered by Stripe. We accept all major credit cards.</p>
                <div className="flex justify-center items-center gap-6 text-gray-400">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium">Visa</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium">Mastercard</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium">Amex</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
