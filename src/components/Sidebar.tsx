'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, FileText, DollarSign, Info, Mail, HelpCircle, Circle, CheckCircle2 } from 'lucide-react';

const projects = [
  { name: 'Math', color: '#10b981' },
  { name: 'Work', color: '#3b82f6' },
  { name: 'Ideas', color: '#f59e0b' },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <aside className="w-64 bg-[#2d3748] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#14b8a6] rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">SN</span>
          </div>
          <span className="font-bold text-xl">SyncNotes</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Link
            href="/dashboard"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${pathname === '/dashboard'
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/editor"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${isActive('/dashboard/editor')
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <FileText className="w-5 h-5" />
            <span>Editor</span>
          </Link>

          <Link
            href="/dashboard/pricing"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${isActive('/dashboard/pricing')
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Pricing</span>
          </Link>

          <Link
            href="/dashboard/about"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${isActive('/dashboard/about')
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <Info className="w-5 h-5" />
            <span>About</span>
          </Link>

          <Link
            href="/dashboard/contact"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${isActive('/dashboard/contact')
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </Link>

          <Link
            href="/dashboard/support"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748] ${isActive('/dashboard/support')
              ? 'bg-[#14b8a6] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support & FAQ</span>
          </Link>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <div className="px-4 mb-3 text-gray-400 text-xs uppercase tracking-wider">
            Projects
          </div>
          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project.name}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:ring-offset-2 focus:ring-offset-[#2d3748]"
              >
                <Circle className="w-4 h-4" style={{ color: project.color, fill: project.color }} />
                <span>{project.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile & Sync Status */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        <div className="flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>All synced</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-700 rounded-lg">
          <div className="w-8 h-8 bg-[#14b8a6] rounded-full flex items-center justify-center">
            <span className="text-xs">
              {session?.user?.name?.substring(0, 2).toUpperCase() || 'U'}
            </span>
          </div>
          <span className="text-sm truncate max-w-[140px]">
            {session?.user?.name || session?.user?.email || 'User'}
          </span>
        </div>
      </div>
    </aside>
  );
}

