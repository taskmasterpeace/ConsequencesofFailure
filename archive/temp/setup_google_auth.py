"""
Google Drive Authentication Setup for COF Story Extraction

This script will help you authenticate with Google Drive to download your files.

STEPS TO SET UP:
1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable the Google Drive API
4. Create OAuth 2.0 credentials (Desktop app)
5. Download the credentials and save as 'credentials.json' in this directory
6. Run this script to generate token.json
"""

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
import os

SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

def authenticate():
    """Authenticate with Google Drive and save token"""
    creds = None

    # Check if token.json exists
    if os.path.exists('token.json'):
        print("✓ Found existing token.json")
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    # If no valid credentials, authenticate
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("Refreshing expired token...")
            creds.refresh(Request())
        else:
            if not os.path.exists('credentials.json'):
                print("\n❌ ERROR: credentials.json not found!")
                print("\nPlease follow these steps:")
                print("1. Go to https://console.cloud.google.com/")
                print("2. Create/select a project")
                print("3. Enable Google Drive API")
                print("4. Create OAuth 2.0 credentials (Desktop app)")
                print("5. Download and save as 'credentials.json'")
                print("\nThen run this script again.")
                return False

            print("Starting authentication flow...")
            print("A browser window will open for you to authorize access.")
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)

        # Save credentials for future use
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
        print("✓ Authentication successful! token.json created.")

    print("\n✅ You're all set! Run download_cof_stories.py to download your files.")
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("GOOGLE DRIVE AUTHENTICATION SETUP")
    print("=" * 60)
    print()
    authenticate()
