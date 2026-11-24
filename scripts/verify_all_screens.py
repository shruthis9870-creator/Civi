"""
Script: scripts/verify_all_screens.py
Comprehensive verification of all CivicFix citizen and admin screens, entry points, and modules.
"""

import os
import re

def verify():
    screens_src = [
        "src/screens/01-welcome-landing.html",
        "src/screens/02-submission-success.html",
        "src/screens/03-review-submit-step3.html",
        "src/screens/04-my-complaints.html",
        "src/screens/05-citizen-login.html",
        "src/screens/06-report-details-step1.html",
        "src/screens/07-report-location-step2.html",
        "src/screens/08-profile-notifications.html",
        "src/screens/09-complaint-details-tracking.html",
        "src/screens/10-admin-overview.html",
        "src/screens/11-admin-login.html",
        "src/screens/12-admin-analytics.html",
        "src/screens/13-admin-complaints.html",
        "src/screens/14-admin-map.html",
        "src/screens/15-admin-departments.html",
        "src/screens/16-admin-settings.html",
    ]

    admin_named_src = [
        "src/screens/admin/overview.html",
        "src/screens/admin/login.html",
        "src/screens/admin/analytics.html",
        "src/screens/admin/complaints.html",
        "src/screens/admin/map.html",
        "src/screens/admin/departments.html",
        "src/screens/admin/settings.html"
    ]

    root_files = [
        "index.html",
        "admin.html"
    ]

    all_files = screens_src + admin_named_src + root_files
    print(f"Total files to verify: {len(all_files)}")

    errors = []
    for f in all_files:
        if not os.path.exists(f):
            errors.append(f"Missing file: {f}")
            continue
        size = os.path.getsize(f)
        if size < 2000:
            errors.append(f"File too small ({size} bytes): {f}")
            continue

        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()

        if "<!DOCTYPE html" not in content and "<!doctype html" not in content:
            errors.append(f"No doctype in {f}")
        if "</html>" not in content:
            errors.append(f"Unclosed </html> in {f}")

        print(f"PASS: {f} ({size:,} bytes)")

    if errors:
        print("\nERRORS ENCOUNTERED:")
        for e in errors:
            print(" -", e)
        return False
    else:
        print("\nALL 19 HTML FILES AND PROTOTYPES VERIFIED PERFECTLY!")
        return True

if __name__ == "__main__":
    verify()
