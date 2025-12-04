import { useState, useEffect } from 'react';
import { Bold, Italic, List, Image as ImageIcon, Save, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Note } from '../../App';

type Page = 'dashboard' | 'editor' | 'pricing' | 'about' | 'contact' | 'support';

interface EditorProps {
  onNavigate: (page: Page) => void;
  noteId: string | null;
  notes: Note[];
  onSave: (noteId: string | null, updatedNote: Partial<Note>) => void;
}

export function Editor({ onNavigate, noteId, notes, onSave }: EditorProps) {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('Math');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  useEffect(() => {
    if (noteId) {
      // Load existing note
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setProject(note.project);
        setTags(note.tags);
        setContent(note.content);
      }
    } else {
      // New note - clear all fields
      setTitle('');
      setProject('Math');
      setTags('');
      setContent('');
    }
  }, [noteId, notes]);

  useEffect(() => {
    if (title || content) {
      setAutoSaveStatus('saving');
      const timer = setTimeout(() => {
        // Auto-save the note
        onSave(noteId, {
          title,
          content,
          project,
          tags,
        });
        setAutoSaveStatus('saved');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [title, content, project, tags]);

  const handleSave = () => {
    setAutoSaveStatus('saving');
    onSave(noteId, {
      title,
      content,
      project,
      tags,
    });
    setTimeout(() => {
      setAutoSaveStatus('saved');
    }, 500);
  };

  return (
    <div className="h-full flex">
      {/* Properties Panel */}
      <aside className="w-80 bg-white border-r border-gray-200 p-6 space-y-6 overflow-auto">
        <h2 className="text-gray-900 mb-4">Properties</h2>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
        />

        <div className="space-y-2">
          <label htmlFor="project" className="block text-gray-700">
            Project
          </label>
          <select
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent"
          >
            <option value="Math">Math</option>
            <option value="Work">Work</option>
            <option value="Ideas">Ideas</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <Input
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Separate with commas..."
        />

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm">
            {autoSaveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Auto-saved</span>
              </>
            )}
            {autoSaveStatus === 'saving' && (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#14b8a6] rounded-full animate-spin" />
                <span className="text-gray-600">Saving...</span>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Formatting Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              aria-label="Bold"
            >
              <Bold className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              aria-label="Italic"
            >
              <Italic className="w-5 h-5 text-gray-700" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              aria-label="Checklist"
            >
              <List className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              aria-label="Insert Image"
            >
              <ImageIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div className="flex-1 p-8 overflow-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note..."
            className="w-full h-full min-h-[500px] resize-none focus:outline-none text-gray-900"
            style={{ lineHeight: '1.5' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t border-gray-200 p-6 flex items-center justify-end gap-4">
          <Button variant="secondary" onClick={() => onNavigate('dashboard')}>
            <X className="w-5 h-5 mr-2" />
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}