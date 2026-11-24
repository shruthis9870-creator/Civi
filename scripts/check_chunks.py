import os

chunks_dir = r"C:\Users\shrut\.gemini\antigravity\brain\3bbe5852-98c1-4800-904b-7aeb5a03458b\.system_generated\logs\chunks\transcript_full"
found = []
for f in sorted(os.listdir(chunks_dir)):
    p = os.path.join(chunks_dir, f)
    with open(p, "r", encoding="utf-8") as fp:
        txt = fp.read()
    if "truncated" in txt:
        found.append(f)
print("Chunks containing 'truncated':", found)
