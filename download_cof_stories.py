"""
CONSEQUENCES OF FAILURE: Complete Story Extraction System
ALL 27 FILES - COMPLETE COLLECTION
Run this with Claude Code to pull ALL COF files from Google Drive
"""

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io
import os

COF_FILES = {
    # ========== FOUNDATION FILES (5) ==========
    "Episode_0": "1zSCK0NRfrZRL1ktO4cKDyg3TkgxuA-JDVd1Cd6_s8A0",
    "COF_Notes": "1PV8FOH1Zvp3LePuwo9m-NQA-YWtFZZHhYi3Yj0ejuDU",
    "COF_Content_Production_Process": "12a4HtjD5obBYh1ZjwTX5tYtAZEtRlSJnHpjxRqKoDS8",
    "COF_Marketing": "1e0KlG5jM0NZpcOYEhiFvlDZc4nphVpIhHSPe0_A3uHs",
    "Consequences_of_Failure_Bible": "1VpsDgBsV5rtpXBZCSM-5zT-IkERcyFH4fsmZ9B8gdKQ",

    # ========== CHARACTER STORIES (9) ==========
    "Galloway_vs_Spahire": "1Izs03OliT_iyUohkDdxIlaq_JqFK9wdDX4IGN1NH1-Y",
    "Gourav_Stories_India_COF": "1de8dQkqs4By3oxrrc9slPHIcCwJxl6zbuUYq1vAubRA",
    "Kaiser_Main": "17nfVqQYbPfw1zDKCXLVx5COW-0wJikVMgMjcfV1O8X8",
    "Eziobi_Story_1": "1paRkOYTRqNHjbXgLLK1rBHT3mrWLbJS9CYce4RmzkkE",
    "Rusty_Richards": "1r6rS-mEPQvroyQLqKbWKP1UKqINfMn2JxzqhgG6MvkU",
    "Liu_Xiao_Story_Spine": "1-_-RC_3qnmwC8Va6BxXx70kt2HRkdJHptoJpJsDS2GQ",
    "AI_Cult_Story": "10PExBwJCpvnh7AjXszXhE2r6f12ilnXu-LG1NJ44G0A",
    "Iron_Eaters": "1lSagEyP7coDEO5xt7fCzbyNq4qesA4Uc8uTfcERLF70",
    "Establishment_24": "1q5-bhu8NKrqCVTV_FU6csynZGkI73RSt18jKm6Bi3k0",

    # ========== ORGANIZATIONS & SYSTEMS (5) ==========
    "SPEAR_Organization": "1KRJhEx20NJoFB-jqoff-2S7gtA9GA20alYpqOQpQWr8",
    "SPEAR_Pilot_Script": "1Mc98HBbXuOmfCHl7lHUjvX_ugNElCB116GaYEZC8odY",
    "SPEAR_Pilot_Episode": "1ACMpJWxC5Cf4yIxORgtDZRGo_YCX5pQ24L9piauB3-A",
    "Atlas_Protocol_Episodes": "1D440hfyUgDa0qDIjyN4NvIsvnxiYVkYPtMUxPtnV6iI",
    "COUNTRIES_SEASONS_AI": "1Wd4AvdZjW7701EkPQDlSAzUAasT1SwEwggdkByt1hoM",

    # ========== WORLD BUILDING & LORE (3) ==========
    "The_Atlas_Protocol_notes": "1Zw6dBDJ-vLlpdtO9R8Gq2BEQeq780s0dbYmpbEQ6YNM",
    "Atlas_Protocol": "1toZIFUzoWPEt0ffUM0NR_1paVHqOucw0RLbj_8CTPcE",
    "MKM_Network_Knowledgebase": "172lltKXpVQy67ta2XvMwY9i2rPClZtMOG8SdhnLAb4k",

    # ========== DEVELOPMENT & PRODUCTION (5) ==========
    "Character_Creation": "1-niDPBsewXrmvTn-mEw5bdSlMZwQ6N_oxxS4YZFQaTw",
    "MJ_Image_Template": "1rMc8aGpHP6N6ID-VF-dhbvgq-wycTticcRG75fg5pu4",
    "Lotus_Flower": "1fHihSUzyd7QAgG6bM_FJh0t0RlpwuQIfSd6hPuSh6bg",
    "FIST_GDD_v02": "18nB5Q--T-Q-ZpBttfsy7sUUvgQGSB4YYXe6tb-nip9c",
    "Podcast_Episode_Ideas": "19MAsMuFxz6lRXAz17ZMSz7pd5D-yPUguagnj-ax7IW8",
}

def download_google_doc(service, file_id, file_name, export_format='docx'):
    """Download a Google Doc in specified format"""
    try:
        if export_format == 'docx':
            request = service.files().export_media(fileId=file_id,
                                                   mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            file_ext = '.docx'
        elif export_format == 'txt':
            request = service.files().export_media(fileId=file_id,
                                                   mimeType='text/plain')
            file_ext = '.txt'
        else:
            request = service.files().export_media(fileId=file_id,
                                                   mimeType='application/pdf')
            file_ext = '.pdf'

        file_path = f"COF_Stories/{file_name}{file_ext}"
        fh = io.FileIO(file_path, 'wb')
        downloader = MediaIoBaseDownload(fh, request)

        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}% - {file_name}")

        print(f"[OK] Downloaded: {file_name}{file_ext}")
        return True
    except Exception as e:
        print(f"[FAIL] Failed to download {file_name}: {str(e)}")
        return False

def main():
    os.makedirs('COF_Stories', exist_ok=True)

    # Initialize the Drive API
    creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/drive.readonly'])
    service = build('drive', 'v3', credentials=creds)

    print("=" * 70)
    print("CONSEQUENCES OF FAILURE - COMPLETE STORY EXTRACTION")
    print("=" * 70)
    print(f"\nALL 27 FILES READY FOR DOWNLOAD")
    print(f"   - Foundation Files: 5")
    print(f"   - Character Stories: 9")
    print(f"   - Organizations & Systems: 5")
    print(f"   - World Building & Lore: 3")
    print(f"   - Development & Production: 5")
    print()

    downloaded = 0
    failed = 0

    for file_name, file_id in COF_FILES.items():
        if download_google_doc(service, file_id, file_name, export_format='docx'):
            downloaded += 1
        else:
            failed += 1

    print("\n" + "=" * 70)
    print(f"Successfully downloaded: {downloaded}/{len(COF_FILES)} files")
    print(f"Failed downloads: {failed} files")
    print(f"Files saved to: ./COF_Stories/")
    print("=" * 70)
    print("\nCOMPLETE COLLECTION READY!")

if __name__ == "__main__":
    main()
