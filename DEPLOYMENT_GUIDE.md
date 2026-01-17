# Firebase Hosting Deployment Guide

## Step-by-Step Instructions to Host Your Website on Firebase (Google)

### Prerequisites
- A Google account
- Node.js installed on your computer (download from https://nodejs.org/)

---

## Step 1: Install Firebase CLI

Open your terminal/command prompt and run:

```bash
npm install -g firebase-tools
```

---

## Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window. Sign in with your Google account.

---

## Step 3: Initialize Firebase in Your Project

Navigate to your project folder and run:

```bash
cd /home/chandradeorajak/company-website
firebase init hosting
```

**When prompted:**
1. **Select "Use an existing project"** (if you have one) or **"Create a new project"**
2. **Project name:** Enter a unique name (e.g., `vedantic-systems-website`)
3. **What do you want to use as your public directory?** Press Enter (uses current directory `.`)
4. **Configure as a single-page app?** Type `n` (No)
5. **Set up automatic builds and deploys with GitHub?** Type `n` (No)
6. **File index.html already exists. Overwrite?** Type `n` (No)

---

## Step 4: Update Firebase Project ID

Edit the `.firebaserc` file and replace `your-project-id` with your actual Firebase project ID (from Step 3).

---

## Step 5: Deploy Your Website

```bash
firebase deploy --only hosting
```

Your website will be live at: `https://your-project-id.web.app` or `https://your-project-id.firebaseapp.com`

---

## Step 6: Set Up Custom Domain (Optional)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Hosting** → **Add custom domain**
4. Enter your domain name
5. Follow the DNS configuration instructions

---

## Alternative: Quick Deploy via Firebase Console

### Option 1: Using Firebase Console (No CLI needed)

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or select existing project
3. Go to **Hosting** in the left menu
4. Click **"Get started"**
5. Follow the instructions to upload your files

### Option 2: Using GitHub Actions (Automated)

1. Push your code to GitHub
2. Connect Firebase to GitHub in Firebase Console
3. Set up automatic deployments

---

## Important Notes

- **Free Tier:** Firebase Hosting offers 10 GB storage and 360 MB/day data transfer (free)
- **SSL Certificate:** Automatically included (HTTPS)
- **CDN:** Your site is served from Google's global CDN
- **Custom Domain:** Free SSL for custom domains too

---

## Troubleshooting

### If deployment fails:
1. Make sure you're logged in: `firebase login`
2. Check your project ID in `.firebaserc`
3. Verify `firebase.json` is correct
4. Try: `firebase deploy --only hosting --debug`

### To update your site:
Just run `firebase deploy --only hosting` again after making changes.

---

## File Structure

Your project should have:
```
company-website/
├── index.html
├── script.js
├── styles.css
├── logo.svg
├── thank-you.html
├── firebase.json
└── .firebaserc
```

---

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs/hosting
- Firebase Support: https://firebase.google.com/support
