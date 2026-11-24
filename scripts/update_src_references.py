import os, re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Update stylesheet
index_html = index_html.replace('<link rel="stylesheet" href="css/custom.css"/>', '<link rel="stylesheet" href="src/styles/main.css"/>')

# Update script tags
old_scripts = '''  <!-- Scripts -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="js/data.js"></script>
  <script src="js/store.js"></script>
  <script src="js/map.js"></script>
  <script src="js/app.js"></script>'''

new_scripts = '''  <!-- Leaflet Map Library -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <!-- Modern Modular App Entry Point -->
  <script type="module" src="./src/main.js"></script>'''

index_html = index_html.replace(old_scripts, new_scripts)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html to load ./src/main.js and ./src/styles/main.css")

# 2. Update screen 09 inside src/screens/
screen09_path = 'src/screens/09-complaint-details-tracking.html'
if os.path.exists(screen09_path):
    with open(screen09_path, 'r', encoding='utf-8') as f:
        s09 = f.read()
    s09 = s09.replace('<script src="../js/data.js"></script>', '<script type="module" src="../data/civicData.js"></script>')
    s09 = s09.replace('<script src="../js/store.js"></script>', '<script type="module" src="../services/store.js"></script>')
    s09 = s09.replace('<script src="../js/map.js"></script>', '<script type="module" src="../services/mapService.js"></script>')
    with open(screen09_path, 'w', encoding='utf-8') as f:
        f.write(s09)
    print("Updated src/screens/09-complaint-details-tracking.html")
