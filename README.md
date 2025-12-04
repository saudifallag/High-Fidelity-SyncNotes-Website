# SyncNotes - High Fidelity Note Taking App

**Developed by Osama**

Welcome to **SyncNotes**, a modern, high-fidelity note-taking application built with **Next.js 15**. This project showcases a premium user interface, secure authentication, and real-time database integration.

---

## 🚀 Key Features

### 🎨 Premium UI/UX
- **Welcome Page**: A stunning landing page with feature showcases, pricing tiers, and smooth animations.
- **Dashboard**: A clean, responsive dashboard for managing notes.
- **Design System**: Built with **Tailwind CSS** and **Shadcn/UI**, featuring a custom Teal (`#14b8a6`) color theme.

### 🔐 Secure Authentication
- **NextAuth.js**: Powered by robust authentication logic.
- **Sign Up & Sign In**: Fully functional registration and login flows.
- **Demo Account**: One-click access to test the app without registering.
    - **Email**: `demo@syncnotes.com`
    - **Password**: `demo12`

### 💾 Database & Storage
- **Neon (PostgreSQL)**: Serverless Postgres database for persistent storage.
- **Prisma ORM**: Type-safe database access.
- **User Isolation**: Each user has their own private notes and data.

### 📝 PDF & Image Annotation (New!)
- **Upload**: Support for uploading PDF documents and Images.
- **Draw**: Integrated canvas for drawing, highlighting, and annotating directly on files.
- **Save**: Annotations are saved and synced with your notes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, Lucide Icons
- **Auth**: NextAuth.js v4
- **Database**: PostgreSQL (Neon Tech)
- **ORM**: Prisma
- **PDF/Canvas**: `react-pdf`, `fabric.js`

---

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/saudifallag/High-Fidelity-SyncNotes-Website.git
    cd High-Fidelity-SyncNotes-Website
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="postgresql://neondb_owner:npg_wmNyViG39Xgf@ep-purple-glitter-a1igf9rh-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
    NEXTAUTH_SECRET="your-super-secret-key"
    NEXTAUTH_URL="https://syncnotes.site"
    ```

4.  **Initialize Database**:
    ```bash
    npx prisma db push
    npx prisma db seed
    ```

5.  **Run the development server**:
    ```bash
    npm run dev
    ```

---

## 🚀 Deployment Guide (Vercel)

This project is optimized for deployment on **Vercel**.

1.  **Import Project**: Go to Vercel and import your GitHub repository.
2.  **Environment Variables**: Add the following in the Vercel Project Settings:
    - `DATABASE_URL`: (Use the Neon connection string above)
    - `NEXTAUTH_SECRET`: (Generate a random string)
    - `NEXTAUTH_URL`: (Your Vercel deployment URL, e.g., `https://your-app.vercel.app`)
3.  **Deploy**: Click deploy!

> **Note**: If you are on the Vercel Free Plan, ensure your repository is **Public** to avoid "Team" restrictions.

---

## 🎨 Design System

### Brand Colors
- **Primary (Teal)**: `#14b8a6` (Buttons, Active States)
- **Background**: `#f5f3f0` (Warm Off-White)
- **Sidebar**: `#2d3748` (Dark Gray)

### Tag Colors
- **Green**: Study, Math
- **Blue**: Work, Dev
- **Violet**: Planning
- **Orange**: Ideas
- **Pink**: Personal

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/          # API Routes (Auth, Notes)
│   ├── dashboard/    # Protected Dashboard Pages
│   └── page.tsx      # Welcome/Landing Page
├── components/
│   ├── ui/           # Reusable Shadcn Components
│   ├── CanvasEditor  # Drawing Logic
│   ├── PDFViewer     # PDF Rendering
│   └── NoteEditor    # Main Editor Component
└── lib/              # Utilities (Prisma, Utils)
```

---

*Documentation generated for Osama.*
