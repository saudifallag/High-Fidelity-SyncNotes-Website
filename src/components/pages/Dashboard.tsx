import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { Note } from '../../App';

type Page = 'dashboard' | 'editor' | 'pricing' | 'about' | 'contact' | 'support';

interface DashboardProps {
  notes: Note[];
  onNavigate: (page: Page, noteId?: string | null) => void;
}

export function Dashboard({ notes, onNavigate }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">My Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas in one place</p>
        </div>
        <Button
          variant="primary"
          onClick={() => onNavigate('editor', null)}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your notes..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card
            key={note.id}
            hoverable
            onClick={() => onNavigate('editor', note.id)}
            className="p-6 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
          >
            <h3 className="text-gray-900 mb-3">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {note.tags.split(',').map((tag, index) => (
                  <Tag key={tag.trim()} color={note.tagColors[index] || '#14b8a6'}>
                    {tag.trim()}
                  </Tag>
                ))}
              </div>
              <span className="text-xs text-gray-500">{note.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}