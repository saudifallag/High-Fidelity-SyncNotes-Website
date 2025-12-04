import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/pages/Dashboard';
import { Editor } from './components/pages/Editor';
import { Pricing } from './components/pages/Pricing';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { Support } from './components/pages/Support';

type Page = 'dashboard' | 'editor' | 'pricing' | 'about' | 'contact' | 'support';

export interface Note {
  id: string;
  title: string;
  description: string;
  content: string;
  project: string;
  tags: string;
  date: string;
  tagColors: string[];
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Calculus II Study Guide',
    description: 'Integration techniques, series convergence, and polar coordinates review for midterm exam.',
    content: 'Integration techniques:\n\n1. U-Substitution\n2. Integration by Parts\n3. Partial Fractions\n\nSeries convergence tests:\n- Ratio Test\n- Root Test\n- Comparison Test',
    project: 'Math',
    tags: 'Math, Exam Prep',
    date: 'Nov 28, 2025',
    tagColors: ['#10b981', '#f59e0b'],
  },
  {
    id: '2',
    title: 'Project Roadmap Q1 2026',
    description: 'Quarterly objectives, sprint planning, and resource allocation for the development team.',
    content: 'Q1 2026 Objectives:\n\n1. Launch mobile app beta\n2. Implement real-time collaboration\n3. Improve search functionality\n\nSprint Planning:\n- 2-week sprints\n- Daily standups at 9 AM\n- Retrospectives every other Friday',
    project: 'Work',
    tags: 'Work, Planning',
    date: 'Nov 25, 2025',
    tagColors: ['#3b82f6', '#8b5cf6'],
  },
  {
    id: '3',
    title: 'App Feature Ideas',
    description: 'Brainstorming session notes for new mobile app features including dark mode and collaboration tools.',
    content: 'Feature Ideas:\n\n- Dark mode support\n- Real-time collaboration\n- Voice notes\n- Smart tags\n- Calendar integration\n- Offline mode\n\nPriority: Dark mode and offline mode first',
    project: 'Ideas',
    tags: 'Ideas, Development',
    date: 'Nov 22, 2025',
    tagColors: ['#f59e0b', '#3b82f6'],
  },
  {
    id: '4',
    title: 'Linear Algebra Notes',
    description: 'Vector spaces, eigenvalues, eigenvectors, and matrix transformations.',
    content: 'Vector Spaces:\n- Must satisfy 10 axioms\n- Subspaces inherit properties\n\nEigenvalues & Eigenvectors:\nAv = λv\n\nMatrix Transformations:\n- Linear maps between vector spaces\n- Composition of transformations',
    project: 'Math',
    tags: 'Math, Study',
    date: 'Nov 20, 2025',
    tagColors: ['#10b981', '#14b8a6'],
  },
  {
    id: '5',
    title: 'Team Meeting Minutes',
    description: 'Weekly sync notes covering project updates, blockers, and action items.',
    content: 'Meeting Date: Nov 18, 2025\n\nAttendees: Dev team, Product, Design\n\nUpdates:\n- API integration complete\n- UI mockups approved\n\nBlockers:\n- Waiting on backend deployment\n\nAction Items:\n- Schedule user testing\n- Update documentation',
    project: 'Work',
    tags: 'Work',
    date: 'Nov 18, 2025',
    tagColors: ['#3b82f6'],
  },
  {
    id: '6',
    title: 'Book Recommendations',
    description: 'List of must-read books on productivity, design thinking, and personal development.',
    content: 'Reading List:\n\n1. "Atomic Habits" - James Clear\n2. "The Design of Everyday Things" - Don Norman\n3. "Deep Work" - Cal Newport\n4. "Thinking, Fast and Slow" - Daniel Kahneman\n\nCurrently Reading: Atomic Habits',
    project: 'Ideas',
    tags: 'Ideas, Personal',
    date: 'Nov 15, 2025',
    tagColors: ['#f59e0b', '#ec4899'],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  const handleNavigate = (page: Page, noteId?: string | null) => {
    setCurrentPage(page);
    if (page === 'editor') {
      setCurrentNoteId(noteId || null);
    }
  };

  const handleSaveNote = (noteId: string | null, updatedNote: Partial<Note>) => {
    setLastSyncTime(new Date());
    
    if (noteId) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, ...updatedNote } : note
        )
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: updatedNote.title || 'Untitled Note',
        description: updatedNote.content?.slice(0, 100) || '',
        content: updatedNote.content || '',
        project: updatedNote.project || 'Personal',
        tags: updatedNote.tags || '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tagColors: ['#14b8a6'],
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setCurrentNoteId(newNote.id);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard notes={notes} onNavigate={handleNavigate} />;
      case 'editor':
        return <Editor onNavigate={handleNavigate} noteId={currentNoteId} notes={notes} onSave={handleSaveNote} />;
      case 'pricing':
        return <Pricing />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard notes={notes} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f3f0]">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onNavigate={handleNavigate} lastSyncTime={lastSyncTime} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}