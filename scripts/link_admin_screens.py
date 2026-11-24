"""
Script: scripts/link_admin_screens.py
Wires up navigation links between standalone admin screen prototypes.
"""

import re
import os

def update_file(path, replacements):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {path}")

# Links for src/screens/ (numbered: 10, 11, 12, 13)
for base_dir in ['src/screens', 'screens']:
    # 10-admin-overview.html
    update_file(os.path.join(base_dir, '10-admin-overview.html'), [
        (r'href="#" data-path="overview"', 'href="10-admin-overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="13-admin-complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="12-admin-analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="11-admin-login.html" title="Logout"'),
        (r'title="View all complaints">\s*View all', 'href="13-admin-complaints.html" title="View all complaints">View all'),
        # Add Citizen View button right before logout profile if not already present
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

    # 11-admin-login.html
    update_file(os.path.join(base_dir, '11-admin-login.html'), [
        (r'<form', '<form onsubmit="event.preventDefault(); window.location.href=\'10-admin-overview.html\';"'),
        (r'type="submit"[^>]*>', 'type="submit" onclick="window.location.href=\'10-admin-overview.html\';">'),
        # Add return to citizen portal link at top or bottom
        (r'(<div class="flex items-center gap-2">)', r'<a href="../../index.html" class="text-xs text-primary font-semibold hover:underline flex items-center gap-1 mb-2">← Back to Citizen Portal</a>\1')
    ])

    # 12-admin-analytics.html
    update_file(os.path.join(base_dir, '12-admin-analytics.html'), [
        (r'href="#" data-path="overview"', 'href="10-admin-overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="13-admin-complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="12-admin-analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="11-admin-login.html" title="Logout"'),
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

    # 13-admin-complaints.html
    update_file(os.path.join(base_dir, '13-admin-complaints.html'), [
        (r'href="#" data-path="overview"', 'href="10-admin-overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="13-admin-complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="12-admin-analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="11-admin-login.html" title="Logout"'),
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

# Links for src/screens/admin/ and screens/admin/ (named files)
for admin_dir in ['src/screens/admin', 'screens/admin']:
    # overview.html
    update_file(os.path.join(admin_dir, 'overview.html'), [
        (r'href="#" data-path="overview"', 'href="overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="login.html" title="Logout"'),
        (r'title="View all complaints">\s*View all', 'href="complaints.html" title="View all complaints">View all'),
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

    # login.html
    update_file(os.path.join(admin_dir, 'login.html'), [
        (r'<form', '<form onsubmit="event.preventDefault(); window.location.href=\'overview.html\';"'),
        (r'type="submit"[^>]*>', 'type="submit" onclick="window.location.href=\'overview.html\';">'),
        (r'(<div class="flex items-center gap-2">)', r'<a href="../../../index.html" class="text-xs text-primary font-semibold hover:underline flex items-center gap-1 mb-2">← Back to Citizen Portal</a>\1')
    ])

    # analytics.html
    update_file(os.path.join(admin_dir, 'analytics.html'), [
        (r'href="#" data-path="overview"', 'href="overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="login.html" title="Logout"'),
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

    # complaints.html
    update_file(os.path.join(admin_dir, 'complaints.html'), [
        (r'href="#" data-path="overview"', 'href="overview.html" data-path="overview"'),
        (r'href="#" data-path="complaints"', 'href="complaints.html" data-path="complaints"'),
        (r'href="#" data-path="analytics"', 'href="analytics.html" data-path="analytics"'),
        (r'href="#" title="Logout"', 'href="login.html" title="Logout"'),
        (r'(<div class="flex flex-col min-w-0 flex-1">.*?</div>)', r'\1<a href="../../../index.html" class="p-1 rounded text-primary hover:bg-surface-container-high" title="Citizen View"><span class="material-symbols-outlined text-[18px]">smartphone</span></a>')
    ])

print("Finished linking admin screen files.")
