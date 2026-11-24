"""
Script: scripts/extract_admin_screens.py
Extracts the 4 CivicFix Admin Portal screens from transcript and saves them
into src/screens/, src/screens/admin/, and screens/.
"""

import json
import re
import os

TRANSCRIPT_PATH = r"C:\Users\shrut\.gemini\antigravity\brain\3bbe5852-98c1-4800-904b-7aeb5a03458b\.system_generated\logs\transcript_full.jsonl"

def main():
    print("Reading transcript...")
    with open(TRANSCRIPT_PATH, "r", encoding="utf-8") as f:
        lines = f.readlines()

    line_data = json.loads(lines[184])
    content = line_data["content"]

    markers = list(re.finditer(r"<!--\s*(CivicFix\s*-\s*[^>]+)-->", content))
    print(f"Found {len(markers)} screen markers.")

    # S0: Overview Dashboard
    s0 = content[markers[0].start():markers[1].start()].strip()

    # S1: Administrator Login
    s1 = content[markers[1].start():markers[2].start()].strip()

    # S2: Municipal Performance Analytics & Reports
    s2 = content[markers[2].start():markers[3].start()].strip()

    # S3: Complaint Management
    s3 = content[markers[3].start():].strip()
    trunc_idx = s3.find("<truncated")
    if trunc_idx != -1:
        s3 = s3[:trunc_idx].rstrip()

    # Completion for S3
    s3_completion = (
        'hadow-sm" src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=120&q=80" alt="Freshly resurfaced road asphalt"/>\n'
        '<div class="flex flex-col min-w-0">\n'
        '<span class="font-title-md text-title-md text-on-surface font-semibold truncate max-w-[200px]" title="Road Resurfacing Completed">Pothole Bitumen Patch</span>\n'
        '<span class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">\n'
        '<span class="material-symbols-outlined text-[14px]">check_circle</span> Verified by Engineer\n'
        '</span>\n'
        '</div>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3 whitespace-nowrap">\n'
        '<span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">\n'
        '<span class="material-symbols-outlined text-[14px]">construction</span>\n'
        'Road Infra\n'
        '</span>\n'
        '</td>\n'
        '<td class="py-3 px-3">\n'
        '<div class="flex flex-col">\n'
        '<span class="font-medium text-on-surface truncate max-w-[150px]">5th Main, 17th Cross</span>\n'
        '<span class="font-label-sm text-label-sm text-on-surface-variant">Ward 150 Bellandur</span>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3">\n'
        '<div class="flex flex-col">\n'
        '<span class="font-medium text-on-surface truncate">Deepika Rao</span>\n'
        '<span class="font-label-sm text-label-sm text-on-surface-variant font-mono">+91 98860 11428</span>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3">\n'
        '<div class="flex flex-col gap-1">\n'
        '<div class="flex items-center gap-1">\n'
        '<span class="material-symbols-outlined text-primary text-[15px]">verified</span>\n'
        '<span class="font-label-sm text-label-sm font-semibold text-primary">99% Repaired</span>\n'
        '</div>\n'
        '<span class="px-1.5 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm font-semibold w-max">\n'
        'Resolved\n'
        '</span>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3 whitespace-nowrap">\n'
        '<div class="flex items-center gap-1.5">\n'
        '<span class="w-2 h-2 rounded-full bg-primary"></span>\n'
        '<span class="font-medium text-on-surface">EE Er. M. Nataraj</span>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3 whitespace-nowrap">\n'
        '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">\n'
        'Medium\n'
        '</span>\n'
        '</td>\n'
        '<td class="py-3 px-3 whitespace-nowrap">\n'
        '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">\n'
        '<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>\n'
        'Resolved\n'
        '</span>\n'
        '</td>\n'
        '<td class="py-3 px-3 whitespace-nowrap">\n'
        '<div class="flex flex-col">\n'
        '<span class="font-medium text-on-surface">22 Oct, 11:30</span>\n'
        '<div class="flex items-center gap-1 text-primary font-label-sm text-label-sm">\n'
        '<span class="material-symbols-outlined text-[13px]">check</span>\n'
        '<span>Closed in 18h</span>\n'
        '</div>\n'
        '</div>\n'
        '</td>\n'
        '<td class="py-3 px-3 text-right whitespace-nowrap">\n'
        '<div class="flex items-center justify-end gap-1">\n'
        '<button class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors">\n'
        'Details\n'
        '</button>\n'
        '<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Quick Preview">\n'
        '<span class="material-symbols-outlined text-[18px]">visibility</span>\n'
        '</button>\n'
        '<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="More Actions">\n'
        '<span class="material-symbols-outlined text-[18px]">more_vert</span>\n'
        '</button>\n'
        '</div>\n'
        '</td>\n'
        '</tr>\n'
        '</tbody>\n'
        '</table>\n'
        '</div>\n\n'
        '<!-- Table Pagination -->\n'
        '<div class="p-space-md border-t border-surface-container flex items-center justify-between text-label-md text-on-surface-variant">\n'
        '<div class="flex items-center gap-2">\n'
        '<span>Showing <span class="font-semibold text-on-surface">1 - 6</span> of <span class="font-semibold text-on-surface">1,248</span> complaints</span>\n'
        '<select class="ml-2 text-label-sm rounded border border-outline-variant bg-surface-container-lowest px-2 py-1 text-on-surface focus:outline-none">\n'
        '<option>10 per page</option>\n'
        '<option selected>25 per page</option>\n'
        '<option>50 per page</option>\n'
        '</select>\n'
        '</div>\n'
        '<div class="flex items-center gap-1">\n'
        '<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">\n'
        '<span class="material-symbols-outlined text-[18px]">chevron_left</span>\n'
        '</button>\n'
        '<button class="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center transition-colors">1</button>\n'
        '<button class="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors">2</button>\n'
        '<button class="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors">3</button>\n'
        '<span class="px-1 text-on-surface-variant text-label-sm font-bold">...</span>\n'
        '<button class="w-8 h-8 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium flex items-center justify-center transition-colors">50</button>\n'
        '<button class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">\n'
        '<span class="material-symbols-outlined text-[18px]">chevron_right</span>\n'
        '</button>\n'
        '</div>\n'
        '</div>\n\n'
        '</div>\n'
        '</div>\n'
        '</main>\n'
        '</div>\n'
        '</body>\n'
        '</html>\n'
    )

    s3_complete = s3 + s3_completion

    # Ensure output directories exist
    os.makedirs("src/screens/admin", exist_ok=True)
    os.makedirs("screens/admin", exist_ok=True)

    screens = [
        ("10-admin-overview.html", "overview.html", s0),
        ("11-admin-login.html", "login.html", s1),
        ("12-admin-analytics.html", "analytics.html", s2),
        ("13-admin-complaints.html", "complaints.html", s3_complete),
    ]

    for num_file, name_file, content_str in screens:
        # Write to src/screens/
        path1 = os.path.join("src/screens", num_file)
        with open(path1, "w", encoding="utf-8") as out:
            out.write(content_str)
        print(f"Wrote {path1} ({len(content_str)} bytes)")

        # Write to src/screens/admin/
        path2 = os.path.join("src/screens/admin", name_file)
        with open(path2, "w", encoding="utf-8") as out:
            out.write(content_str)
        print(f"Wrote {path2} ({len(content_str)} bytes)")

        # Write to screens/
        path3 = os.path.join("screens", num_file)
        with open(path3, "w", encoding="utf-8") as out:
            out.write(content_str)

        # Write to screens/admin/
        path4 = os.path.join("screens/admin", name_file)
        with open(path4, "w", encoding="utf-8") as out:
            out.write(content_str)

    print("All admin screen files extracted and written successfully.")

if __name__ == "__main__":
    main()
