# Deployment Guide

## 1. Vercel Configuration

1.  Import this repository into Vercel.
2.  Add the following **Environment Variables**:

| Variable Name | Value |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://neondb_owner:npg_M0j5XChFDxca@ep-jolly-resonance-a19uez7v-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
| `NEXTAUTH_SECRET` | (Generate a random string, e.g., using `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | The URL of your deployed site (e.g., `https://your-project.vercel.app`) |

3.  Deploy!

## 2. Database Initialization (Neon)

The database is already set up and seeded with the demo account.
If you ever need to reset it or push schema changes, run these commands locally:

```bash
# Push schema to DB
npx prisma db push

# Seed demo account
npx prisma db seed
```

## 3. Demo Account

- **Email:** `demo@syncnotes.com`
- **Password:** `demo12`
