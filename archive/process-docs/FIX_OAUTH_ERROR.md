# Fix OAuth 403 Error - Add Test User

You're seeing this error because Google requires unverified apps to have approved test users.

## Quick Fix (2 minutes)

### Step 1: Go to OAuth Consent Screen
1. Open: https://console.cloud.google.com/apis/credentials/consent
2. Make sure you're in the right project (Drive Desktop Client)

### Step 2: Add Yourself as Test User
1. Scroll down to "Test users" section
2. Click "+ ADD USERS"
3. Enter YOUR Google email address (the one that owns the COF files)
4. Click "SAVE"

### Step 3: Try Authentication Again
```bash
python setup_google_auth.py
```

This time it should work!

---

## Alternative: Use Service Account (More Complex)

If you want to avoid the test user setup, you can use a service account instead, but this requires sharing each Drive file with the service account email. The test user method above is simpler.

## What's Happening?

- Google requires apps to be "verified" before anyone can use them
- Your app isn't verified (normal for personal projects)
- To use an unverified app, you must add yourself as a "test user"
- Once added, you can authenticate and download your files

## After Adding Test User

When you run `setup_google_auth.py` again:
1. Browser will open
2. You'll see a warning "Google hasn't verified this app"
3. Click "Advanced"
4. Click "Go to [app name] (unsafe)" - it's YOUR app, so it's safe!
5. Grant permissions
6. Done!
