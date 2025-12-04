'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, Printer, HelpCircle, LogOut, User } from 'lucide-react';

interface HeaderProps {
  lastSyncTime: Date;
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export function Header({ lastSyncTime }: HeaderProps) {
  const { data: session } = useSession();
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(lastSyncTime));

  useEffect(() => {
    // Update the time ago display immediately when lastSyncTime changes
    setTimeAgo(getTimeAgo(lastSyncTime));

    // Update the time ago display every 10 seconds
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(lastSyncTime));
    }, 10000);

    return () => clearInterval(interval);
  }, [lastSyncTime]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden md:inline">
            Last synced: <span className="text-gray-900">{timeAgo}</span>
          </span>

          <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-100 rounded-lg">
            <div className="w-6 h-6 bg-[#14b8a6] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {session?.user?.name || session?.user?.email || 'User'}
            </span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}