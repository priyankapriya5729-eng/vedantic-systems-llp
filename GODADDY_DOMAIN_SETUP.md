# Connect GoDaddy Domain to Firebase Hosting

## Complete Guide: Using Your GoDaddy Domain with Firebase Hosting

---

## Prerequisites
- Your website deployed on Firebase Hosting
- A domain name purchased from GoDaddy
- Access to your GoDaddy account

---

## Step 1: Deploy Your Website to Firebase First

If you haven't deployed yet, follow these steps:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done already)
cd /home/chandradeorajak/company-website
firebase init hosting

# Deploy
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app`

---

## Step 2: Add Custom Domain in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **"Hosting"** in the left sidebar
4. Click **"Add custom domain"** button
5. Enter your domain name (e.g., `vedanticsystems.com` or `www.vedanticsystems.com`)
6. Click **"Continue"**

---

## Step 3: Get DNS Records from Firebase

After adding your domain, Firebase will show you DNS records you need to add:

**You'll see something like:**
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `151.101.1.195` (example IP - use Firebase's actual IP)

- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `151.101.65.195` (example IP - use Firebase's actual IP)

**OR**

- **Type:** AAAA (if IPv6 is required)
- **Name:** @
- **Value:** IPv6 addresses provided by Firebase

**For www subdomain:**
- **Type:** CNAME
- **Name:** www
- **Value:** `your-project-id.web.app` (or the Firebase URL shown)

---

## Step 4: Configure DNS in GoDaddy

### Method 1: Using GoDaddy DNS Management (Recommended)

1. **Login to GoDaddy**
   - Go to https://www.godaddy.com/
   - Sign in to your account

2. **Access DNS Settings**
   - Go to **"My Products"**
   - Find your domain name
   - Click **"DNS"** or **"Manage DNS"**

3. **Add A Records (for root domain)**
   - Scroll to **"Records"** section
   - Click **"Add"** button
   - Select **Type:** `A`
   - **Name:** `@` (or leave blank for root domain)
   - **Value:** Enter the IP address from Firebase (first A record)
   - **TTL:** `600` (or default)
   - Click **"Save"**
   - Repeat for the second A record IP address

4. **Add CNAME Record (for www subdomain)**
   - Click **"Add"** again
   - Select **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** Enter the Firebase hosting URL (e.g., `your-project-id.web.app`)
   - **TTL:** `600`
   - Click **"Save"**

5. **Remove Conflicting Records (if any)**
   - Delete any existing A records pointing to other IPs
   - Delete any existing CNAME records for www pointing elsewhere

---

## Step 5: Verify Domain Ownership

1. **In Firebase Console:**
   - Go back to Hosting → Custom domains
   - Firebase will show "Pending verification"
   - Click **"Verify"** button

2. **Add Verification Record (if required)**
   - Firebase may ask you to add a TXT record
   - Go back to GoDaddy DNS
   - Add a TXT record:
     - **Type:** `TXT`
     - **Name:** `@` (or as specified)
     - **Value:** The verification string from Firebase
     - Click **"Save"**

---

## Step 6: Wait for Propagation

- DNS changes can take **15 minutes to 48 hours** to propagate
- Usually takes **1-2 hours** for most users
- Firebase will automatically detect when DNS is configured correctly
- SSL certificate will be automatically provisioned (may take a few hours)

---

## Step 7: Verify Your Domain is Active

1. Check Firebase Console - Status should change to **"Connected"**
2. Visit your domain: `https://yourdomain.com`
3. Visit www version: `https://www.yourdomain.com`

---

## Important Notes

### SSL Certificate
- Firebase automatically provides **free SSL certificates**
- It may take **24-48 hours** after DNS is verified
- Your site will be accessible via HTTPS automatically

### Both www and non-www
- You can set up both `yourdomain.com` and `www.yourdomain.com`
- Add both as separate custom domains in Firebase
- Configure DNS records for both

### Redirect Setup (Optional)
If you want to redirect www to non-www (or vice versa), update `firebase.json`:

```json
{
  "hosting": {
    "public": ".",
    "redirects": [
      {
        "source": "https://www.yourdomain.com/**",
        "destination": "https://yourdomain.com/**",
        "type": 301
      }
    ]
  }
}
```

Then redeploy: `firebase deploy --only hosting`

---

## Troubleshooting

### DNS Not Propagating?
- Use [whatsmydns.net](https://www.whatsmydns.net/) to check DNS propagation
- Wait at least 24 hours before troubleshooting
- Clear your browser cache

### Domain Shows "Pending"?
- Double-check DNS records are correct
- Ensure TTL is set correctly
- Verify no conflicting records exist

### SSL Certificate Not Issued?
- Wait 24-48 hours after DNS verification
- Ensure DNS is fully propagated
- Check Firebase Console for any error messages

### Can't Access Domain?
- Verify DNS records are correct
- Check if domain is pointing to correct IPs
- Try accessing via `http://` first (before HTTPS)

---

## Quick Reference: GoDaddy DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| **A** | Points domain to IP address | `@` → `151.101.1.195` |
| **CNAME** | Points subdomain to another domain | `www` → `your-project.web.app` |
| **TXT** | Verification/SPF records | `@` → `firebase-verification=...` |

---

## Example Configuration

**For domain: `vedanticsystems.com`**

**GoDaddy DNS Records:**
```
Type    Name    Value                    TTL
A       @       151.101.1.195           600
A       @       151.101.65.195          600
CNAME   www     vedantic-systems.web.app 600
```

**Firebase Custom Domains:**
- `vedanticsystems.com` (primary)
- `www.vedanticsystems.com` (secondary)

---

## Need Help?

- **Firebase Support:** https://firebase.google.com/support
- **GoDaddy Support:** https://www.godaddy.com/help
- **Firebase Hosting Docs:** https://firebase.google.com/docs/hosting/custom-domain

---

## Summary Checklist

- [ ] Website deployed on Firebase Hosting
- [ ] Custom domain added in Firebase Console
- [ ] A records added in GoDaddy DNS (for root domain)
- [ ] CNAME record added in GoDaddy DNS (for www)
- [ ] Domain verified in Firebase
- [ ] SSL certificate issued (automatic, wait 24-48 hours)
- [ ] Domain accessible via HTTPS

---

**Your website will be live at:** `https://yourdomain.com` 🚀
