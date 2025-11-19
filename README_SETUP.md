# COF Story Extraction Setup Guide

This guide will help you download all your Consequences of Failure story files from Google Drive.

## Quick Start

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Set Up Google Drive API Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create/Select Project**:
   - Click "Select a project" → "New Project"
   - Name it "COF Story Extractor" (or anything you like)
   - Click "Create"

3. **Enable Google Drive API**:
   - In the search bar, type "Google Drive API"
   - Click on "Google Drive API"
   - Click "Enable"

4. **Create OAuth Credentials**:
   - Go to "Credentials" (left sidebar)
   - Click "+ CREATE CREDENTIALS" → "OAuth client ID"
   - If prompted, configure consent screen:
     - Choose "External" user type
     - Fill in app name: "COF Story Extractor"
     - Add your email as developer contact
     - Click "Save and Continue" (skip scopes, test users)
   - Back to Create OAuth client ID:
     - Application type: "Desktop app"
     - Name: "COF Desktop Client"
     - Click "Create"

5. **Download Credentials**:
   - Click the download icon next to your newly created OAuth client
   - Save the file as `credentials.json` in the `C:\git\COF` directory

### Step 3: Authenticate
```bash
python setup_google_auth.py
```
- A browser window will open
- Sign in with your Google account
- Grant access to Google Drive (read-only)
- You'll see "Authentication successful!"

### Step 4: Download Your Stories
```bash
python download_cof_stories.py
```

All your files will be downloaded to `C:\git\COF\COF_Stories\` directory!

## Files That Will Be Downloaded

### Foundation Files (5)
- Episode 0
- COF Notes
- COF Content Production Process
- COF Marketing
- Consequences of Failure Bible

### Character Stories (9)
- Galloway vs Spahire
- Gourav Stories (India)
- Kaiser Main
- Eziobi Story 1
- Rusty Richards
- Liu Xiao Story Spine
- AI Cult Story
- Iron Eaters
- Establishment 24

### Organizations & Systems (4)
- SPEAR Organization
- SPEAR Pilot Script
- Atlas Protocol Episodes
- Countries, Seasons & AI

**Total: 18 files with confirmed IDs**

## Troubleshooting

### "credentials.json not found"
- Make sure you downloaded the OAuth credentials and saved them as `credentials.json` in `C:\git\COF`

### "Access denied" or "Permission denied"
- Make sure you're logging in with the Google account that owns these Drive files
- Check that you granted the necessary permissions during authentication

### "File not found" errors during download
- Some file IDs might be incorrect or files might have been moved/deleted
- The script will skip failed downloads and continue with the rest

## Adding More Files

To add the remaining 9 files mentioned in the script, you need to:
1. Find them in your Google Drive
2. Get their file IDs (the long string in the URL when you open them)
3. Add them to the `COF_FILES` dictionary in `download_cof_stories.py`

Example:
```python
"File_Name": "1ABC...XYZ",  # File ID from Drive URL
```
