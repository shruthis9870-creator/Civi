import os, re

def get_body_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    # Extract everything inside <body> ... </body> or <main> ... </main>
    # Note: exclude <nav> if it was fixed in the screen, since we have a global nav
    # Also strip script tags inside the body since app.js handles interactions
    m_body = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
    if m_body:
        content = m_body.group(1)
    else:
        content = html
    # remove any trailing script tags from template
    content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    # remove fixed bottom nav from inside template since global nav is present
    content = re.sub(r'<nav[^>]*>.*?</nav>', '', content, flags=re.DOTALL)
    return content.strip()

print("Extracting body content for templates...")
landing_html = get_body_content('screens/01-welcome-landing.html')
success_html = get_body_content('screens/02-submission-success.html')
step3_html = get_body_content('screens/03-review-submit-step3.html')
complaints_html = get_body_content('screens/04-my-complaints.html')
login_html = get_body_content('screens/05-citizen-login.html')
step1_html = get_body_content('screens/06-report-details-step1.html')
step2_html = get_body_content('screens/07-report-location-step2.html')
profile_html = get_body_content('screens/08-profile-notifications.html')
tracking_html = get_body_content('screens/09-complaint-details-tracking.html')

print("Generating index.html...")
index_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" name="viewport"/>
  <meta name="description" content="CivicFix - Municipal Issue Reporting & Real-time Live Tracking Platform for Bengaluru Citizens"/>
  <title>CivicFix - Municipal Governance & Citizen Action Platform</title>

  <!-- Google Fonts & Material Symbols -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

  <!-- Leaflet CSS for Map Features -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

  <!-- Custom Styles -->
  <link rel="stylesheet" href="css/custom.css"/>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script id="tailwind-config">
    tailwind.config = {{
      darkMode: "class",
      theme: {{
        extend: {{
          "colors": {{
            "outline": "#6f7973",
            "primary": "#00513b",
            "on-primary-fixed-variant": "#00513b",
            "secondary-fixed": "#d2e4ff",
            "on-surface-variant": "#3f4944",
            "tertiary": "#005136",
            "on-secondary": "#ffffff",
            "surface-container-low": "#e9f7ed",
            "secondary-fixed-dim": "#b0c8ea",
            "tertiary-fixed": "#89f8c3",
            "surface-container-high": "#deece2",
            "primary-fixed-dim": "#89d6b5",
            "primary-container": "#176b50",
            "error": "#ba1a1a",
            "secondary": "#48607d",
            "on-secondary-container": "#49617e",
            "surface-tint": "#176b50",
            "on-error": "#ffffff",
            "error-container": "#ffdad6",
            "inverse-primary": "#89d6b5",
            "on-tertiary-fixed": "#002113",
            "on-secondary-fixed": "#001d37",
            "primary-fixed": "#a4f3d0",
            "surface-dim": "#d0ddd4",
            "tertiary-fixed-dim": "#6cdba8",
            "inverse-surface": "#27332d",
            "on-secondary-fixed-variant": "#304864",
            "on-tertiary-fixed-variant": "#005236",
            "on-tertiary-container": "#7fedb9",
            "on-primary-fixed": "#002116",
            "on-background": "#121e18",
            "surface-container-highest": "#d8e6dc",
            "outline-variant": "#bec9c2",
            "on-primary-container": "#9be9c6",
            "on-primary": "#ffffff",
            "background": "#effdf3",
            "surface": "#effdf3",
            "surface-container-lowest": "#ffffff",
            "on-tertiary": "#ffffff",
            "on-surface": "#121e18",
            "tertiary-container": "#006c49",
            "surface-variant": "#d8e6dc",
            "surface-bright": "#effdf3",
            "inverse-on-surface": "#e6f4ea",
            "surface-container": "#e4f1e7",
            "on-error-container": "#93000a",
            "secondary-container": "#c3dcfe"
          }},
          "borderRadius": {{
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          }},
          "spacing": {{
            "gutter-mobile": "1rem",
            "space-lg": "1.5rem",
            "margin": "2rem",
            "margin-mobile": "1rem",
            "space-xs": "0.25rem",
            "space-xl": "2rem",
            "space-sm": "0.5rem",
            "space-md": "1rem",
            "gutter": "1.5rem"
          }},
          "fontFamily": {{
            "display-lg": ["Inter"],
            "data-metric": ["Inter"],
            "headline-lg": ["Inter"],
            "display-lg-mobile": ["Inter"],
            "body-sm": ["Inter"],
            "headline-md": ["Inter"],
            "body-lg": ["Inter"],
            "headline-sm": ["Inter"],
            "headline-lg-mobile": ["Inter"],
            "label-sm": ["Inter"],
            "body-md": ["Inter"],
            "label-md": ["Inter"],
            "title-md": ["Inter"]
          }},
          "fontSize": {{
            "display-lg": ["48px", {{"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}}],
            "data-metric": ["28px", {{"lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "700"}}],
            "headline-lg": ["32px", {{"lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "600"}}],
            "display-lg-mobile": ["32px", {{"lineHeight": "40px", "letterSpacing": "-0.015em", "fontWeight": "700"}}],
            "body-sm": ["12px", {{"lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "400"}}],
            "headline-md": ["24px", {{"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}}],
            "body-lg": ["16px", {{"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "400"}}],
            "headline-sm": ["20px", {{"lineHeight": "28px", "letterSpacing": "-0.005em", "fontWeight": "600"}}],
            "headline-lg-mobile": ["24px", {{"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}}],
            "label-sm": ["11px", {{"lineHeight": "14px", "letterSpacing": "0.04em", "fontWeight": "600"}}],
            "body-md": ["14px", {{"lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400"}}],
            "label-md": ["13px", {{"lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500"}}],
            "title-md": ["16px", {{"lineHeight": "24px", "letterSpacing": "0", "fontWeight": "600"}}]
          }}
        }}
      }}
    }};
  </script>
</head>
<body class="bg-surface font-body-md text-body-md text-on-surface antialiased pt-safe pb-safe flex flex-col min-h-screen device-frame-active">

  <!-- Desktop Presentation Floating Utility Bar -->
  <aside class="fixed top-3 inset-x-0 z-50 flex items-center justify-center px-4 pointer-events-none hidden md:flex">
    <div class="pointer-events-auto bg-inverse-surface/90 backdrop-blur-xl text-inverse-on-surface px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 text-xs">
      <div class="flex items-center gap-2 pr-2 border-r border-white/15">
        <span class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
        <span class="font-bold tracking-tight text-sm text-tertiary-fixed">CivicFix</span>
        <span class="text-white/60 text-[11px]">BBMP Partner</span>
      </div>

      <!-- Quick Screen Jump Menu -->
      <div class="flex items-center gap-1.5">
        <span class="text-white/60">Screen:</span>
        <select id="screen-jumper" onchange="App.navigate(this.value)" class="bg-surface-container-highest text-on-surface font-medium text-xs rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer">
          <option value="#/">1. Welcome & Landing</option>
          <option value="#/login">2. Citizen Login & Register</option>
          <option value="#/my-complaints">3. My Complaints List</option>
          <option value="#/report/step1">4. Report Issue: Step 1 (Details)</option>
          <option value="#/report/step2">5. Report Issue: Step 2 (Location)</option>
          <option value="#/report/step3">6. Report Issue: Step 3 (Review)</option>
          <option value="#/report/success/CF-2026-00124">7. Submission Success</option>
          <option value="#/complaint/CF-2026-00124">8. Live Ticket Tracking</option>
          <option value="#/profile">9. Citizen Profile & Impact</option>
          <option value="#/notifications">10. Alerts & Notifications</option>
        </select>
      </div>

      <!-- Device Frame Switcher -->
      <button id="device-toggle-btn" onclick="App.toggleDeviceFrame()" class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
        <span class="material-symbols-outlined text-[16px]">fullscreen</span>
        <span>Full View</span>
      </button>

      <!-- Reset Demo Data -->
      <button onclick="App.resetDemoData()" title="Reset Demo LocalStorage" class="flex items-center gap-1 px-2 py-1 rounded-lg text-white/70 hover:text-white transition-colors">
        <span class="material-symbols-outlined text-[16px]">restart_alt</span>
        <span>Reset</span>
      </button>
    </div>
  </aside>

  <!-- App Viewport Container (Mobile Simulator Frame on Desktop) -->
  <div id="app-viewport" class="w-full flex-1 flex flex-col relative bg-surface">
    <!-- Simulated Mobile Notch on Desktop Frame -->
    <div id="device-notch" class="sticky top-0 inset-x-0 h-6 bg-transparent z-[60] pointer-events-none flex items-center justify-between px-6 pt-1">
      <span class="text-[12px] font-semibold text-on-surface font-mono">9:41</span>
      <div class="w-24 h-4 bg-black/80 rounded-full mx-auto"></div>
      <div class="flex items-center gap-1 text-on-surface">
        <span class="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
        <span class="material-symbols-outlined text-[13px]">wifi</span>
        <span class="material-symbols-outlined text-[14px]">battery_full</span>
      </div>
    </div>

    <!-- Active Screen View Container -->
    <div id="view-container" class="flex-1 flex flex-col w-full"></div>

    <!-- Global Persistent Bottom Navigation Bar -->
    <nav id="global-nav" class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container hidden">
      <div class="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-primary transition-colors" data-path="home" href="#/">
          <span class="material-symbols-outlined text-[24px]">home</span>
          <span class="font-label-sm text-label-sm mt-0.5">Home</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-primary transition-colors" data-path="my-complaints" href="#/my-complaints">
          <span class="material-symbols-outlined text-[24px]">assignment</span>
          <span class="font-label-sm text-label-sm mt-0.5">My Complaints</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-primary transition-colors" data-path="explore" href="#/report/step1">
          <span class="material-symbols-outlined text-[24px]">add_circle</span>
          <span class="font-label-sm text-label-sm mt-0.5">Report</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 text-on-surface-variant hover:text-primary transition-colors" data-path="profile" href="#/profile">
          <span class="material-symbols-outlined text-[24px]">person</span>
          <span class="font-label-sm text-label-sm mt-0.5">Profile</span>
        </a>
      </div>
    </nav>
  </div>

  <!-- Global Toast Notification Banner -->
  <div id="global-toast" class="fixed bottom-20 left-4 right-4 max-w-sm mx-auto bg-inverse-surface text-inverse-on-surface py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 transform translate-y-32 opacity-0 transition-all duration-300 pointer-events-none z-[100]">
    <span class="material-symbols-outlined text-tertiary-fixed text-headline-sm">check_circle</span>
    <span id="global-toast-message" class="font-body-md text-body-md font-medium">Action completed successfully</span>
  </div>

  <!-- ================= TEMPLATES FOR REACTIVE SPA ================= -->

  <!-- Template: Landing -->
  <template id="template-landing">
    {landing_html}
  </template>

  <!-- Template: Login & Register -->
  <template id="template-login">
    {login_html}
  </template>

  <!-- Template: My Complaints -->
  <template id="template-my-complaints">
    {complaints_html}
  </template>

  <!-- Template: Report Step 1 -->
  <template id="template-report-step1">
    {step1_html}
  </template>

  <!-- Template: Report Step 2 -->
  <template id="template-report-step2">
    {step2_html}
  </template>

  <!-- Template: Report Step 3 -->
  <template id="template-report-step3">
    {step3_html}
  </template>

  <!-- Template: Success -->
  <template id="template-success">
    {success_html}
  </template>

  <!-- Template: Tracking -->
  <template id="template-tracking">
    {tracking_html}
  </template>

  <!-- Template: Profile & Notifications -->
  <template id="template-profile">
    {profile_html}
  </template>

  <!-- Scripts -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="js/data.js"></script>
  <script src="js/store.js"></script>
  <script src="js/map.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_content)

print("Generated index.html successfully!")
