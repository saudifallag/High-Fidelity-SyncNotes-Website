import React from 'react';

type SubscriptionTier = 'FREE' | 'STUDENT' | 'PRO';

interface SubscriptionBadgeProps {
    tier: SubscriptionTier;
}

export const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ tier }) => {
    const getBadgeStyle = (tier: SubscriptionTier) => {
        switch (tier) {
            case 'PRO':
                return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none';
            case 'STUDENT':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'FREE':
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeStyle(tier)}`}>
            {tier}
        </span>
    );
};
