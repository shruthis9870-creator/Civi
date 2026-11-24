import os, re

files_to_check = ['index.html'] + [os.path.join('screens', f) for f in os.listdir('screens') if f.endswith('.html')]

print(f"Checking {len(files_to_check)} HTML files...")

for fpath in files_to_check:
    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Check that DOCTYPE and closing html tag exist
    has_doctype = '<!DOCTYPE html>' in html
    has_closing_html = '</html>' in html

    # Check script tags
    scripts = re.findall(r'<script[^>]*src="([^"]+)"', html)
    for src in scripts:
        if not src.startswith('http'):
            # Local script
            local_p = os.path.normpath(os.path.join(os.path.dirname(fpath), src))
            exists = os.path.exists(local_p)
            if not exists:
                print(f"WARNING: In {fpath}, script not found: {src} -> {local_p}")

    # Check style links
    links = re.findall(r'<link[^>]*href="([^"]+)"', html)
    for href in links:
        if not href.startswith('http') and not href.startswith('data:'):
            local_p = os.path.normpath(os.path.join(os.path.dirname(fpath), href))
            exists = os.path.exists(local_p)
            if not exists:
                print(f"WARNING: In {fpath}, stylesheet not found: {href} -> {local_p}")

    print(f"[OK] {fpath}: {len(html)} bytes (Doctype: {has_doctype}, </html>: {has_closing_html})")

print("\nVerification complete!")
