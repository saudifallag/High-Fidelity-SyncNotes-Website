# 📝 Demo Account Setup

## Quick Demo Access

We've added a demo account feature for quick testing!

**Demo Credentials:**
- Email: `demo@syncnotes.com`
- Password: `demo12`

## How it Works

The demo account is hardcoded into the authentication system to ensure it's always available, regardless of the database state. You do not need to create this account manually.

### Using the Demo Account

1. **From Welcome Page:**
   - Click **"Try Demo Account"** button
   - Automatically logs in and redirects to Dashboard

2. **From Auth Modal:**
   - Click **"Sign In"**
   - Click **"Try Demo Account"** button
   - Automatically logs in

3. **Manual Login:**
   - Email: `demo@syncnotes.com`
   - Password: `demo12`

---

## Demo Account Features

The demo account will have:
- Full access to all SyncNotes features
- Ability to create, edit, and delete notes
- Real-time sync across devices
- All formatting and organization tools

**Note:** Demo account data is shared if multiple people use the same credentials. For personal use, users should create their own accounts.

---

## Security Note

⚠️ **Important:** The demo account credentials are public. Do not store sensitive information in the demo account. For production apps, consider:

- Creating a read-only demo mode
- Auto-resetting demo data periodically
- Implementing session limits
- Adding a banner: "This is a demo account"
