# 📝 Demo Account Setup

## Quick Demo Access

We've added a demo account feature for quick testing!

**Demo Credentials:**
- Email: `demo@syncnotes.com`
- Password: `demo1234`

## How to Set Up Demo Account

Since we're using Firebase Authentication, you need to create this demo account in your Firebase project:

### Option 1: Via Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** → **Users** tab
4. Click **"Add user"**
5. Enter:
   - Email: `demo@syncnotes.com`
   - Password: `demo1234`
6. Click **"Add user"**

### Option 2: Via Sign Up (Alternative)

1. Run your app locally: `npm run dev`
2. Go to http://localhost:3000
3. Click **"Sign In"** → **"Sign Up"** tab
4. Enter:
   - Email: `demo@syncnotes.com`
   - Password: `demo1234`
5. Create account

---

## Using the Demo Account

Once the demo account is created, users can:

1. **From Welcome Page:**
   - Click **"Try Demo Account"** button
   - Automatically logs in and redirects to Dashboard

2. **From Auth Modal:**
   - Click **"Sign In"**
   - Click **"Use Demo Account"** link (bottom right)
   - Automatically logs in

3. **Manual Login:**
   - Email: `demo@syncnotes.com`
   - Password: `demo1234`

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
