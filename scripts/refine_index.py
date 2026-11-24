import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Landing template bindings
html = html.replace('id="getStartedBtn" onclick="window.location.href=\'06-report-details-step1.html\'"', 'id="getStartedBtn" onclick="App.navigate(\'#/report/step1\')"')
html = html.replace('id="loginBtn" onclick="window.location.href=\'05-citizen-login.html\'"', 'id="loginBtn" onclick="App.navigate(\'#/login\')"')
html = html.replace('id="quickReportBtn" onclick="window.location.href=\'06-report-details-step1.html\'"', 'id="quickReportBtn" onclick="App.navigate(\'#/report/step1\')"')

# 2. Update Login template bindings
html = html.replace("handleAuthSubmit(event, 'signin')", "event.preventDefault(); App.showToast('Signed in successfully! Redirecting to dashboard...'); setTimeout(() => App.navigate('#/my-complaints'), 600);")
html = html.replace("handleAuthSubmit(event, 'register')", "event.preventDefault(); App.showToast('Citizen account registered for Ward! Welcome aboard.'); setTimeout(() => App.navigate('#/my-complaints'), 600);")
html = html.replace("showToast('OTP verified! Dispatching to Ward Dashboard...')", "App.showToast('OTP verified! Entering Ward Dashboard...'); setTimeout(() => App.navigate('#/my-complaints'), 600);")

# 3. Update Step 1 template bindings
html = html.replace('onclick="window.location.href=\'01-welcome-landing.html\'"', 'onclick="App.navigate(\'#/\')"')
html = html.replace('<button onclick="window.location.href=\'07-report-location-step2.html\'" class="w-full py-3.5 px-space-lg rounded-xl bg-primary-container', '<button onclick="App.submitStep1()" class="w-full py-3.5 px-space-lg rounded-xl bg-primary-container')

# Add real file input in Step 1 template
photo_btn_pattern = r'<button class="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-lowest rounded-xl shadow-sm text-primary font-title-md text-title-md active:bg-surface-container transition-colors" type="button">\s*<span class="material-symbols-outlined text-\[20px\]">photo_camera</span>\s*<span>Take Photo</span>\s*</button>'
photo_btn_replacement = '''<input type="file" id="camera-file-input" accept="image/*" capture="environment" class="hidden" onchange="App.handlePhotoUpload(this)"/>
<input type="file" id="gallery-file-input" accept="image/*" class="hidden" onchange="App.handlePhotoUpload(this)"/>
<button onclick="document.getElementById('camera-file-input').click()" class="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-lowest rounded-xl shadow-sm text-primary font-title-md text-title-md active:bg-surface-container transition-colors" type="button">
  <span class="material-symbols-outlined text-[20px]">photo_camera</span>
  <span>Take Photo</span>
</button>'''
html = re.sub(photo_btn_pattern, photo_btn_replacement, html)

gallery_btn_pattern = r'<button class="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-lowest rounded-xl shadow-sm text-secondary font-title-md text-title-md active:bg-surface-container transition-colors" type="button">\s*<span class="material-symbols-outlined text-\[20px\]">photo_library</span>\s*<span>From Gallery</span>\s*</button>'
gallery_btn_replacement = '''<button onclick="document.getElementById('gallery-file-input').click()" class="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-lowest rounded-xl shadow-sm text-secondary font-title-md text-title-md active:bg-surface-container transition-colors" type="button">
  <span class="material-symbols-outlined text-[20px]">photo_library</span>
  <span>From Gallery</span>
</button>'''
html = re.sub(gallery_btn_pattern, gallery_btn_replacement, html)

# Give preview elements IDs in Step 1
html = html.replace('data-alt="Close-up high contrast street photograph of an asphalt pothole', 'id="preview-image-elem" data-alt="Close-up high contrast street photograph of an asphalt pothole')
html = html.replace('<span class="font-title-md text-title-md font-semibold text-on-surface truncate">pothole_19th_main.jpg</span>', '<span id="preview-filename" class="font-title-md text-title-md font-semibold text-on-surface truncate">pothole_19th_main.jpg</span>')

# 4. Update Step 2 template bindings
html = html.replace('onclick="window.location.href=\'06-report-details-step1.html\'"', 'onclick="App.navigate(\'#/report/step1\')"')
html = html.replace('<button class="w-full bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-semibold py-3.5 px-space-md rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 group" id="confirmLocationBtn">', '<button onclick="App.submitStep2()" class="w-full bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-semibold py-3.5 px-space-md rounded-xl shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 group" id="confirmLocationBtn">')
html = html.replace('id="locateMeBtn"', 'id="locateMeBtn" onclick="CivicMap.locateUser((loc) => App.updateLocationFields(loc))"')
html = html.replace('id="addressInput"', 'id="addressInput" oninput="App.handleLocationSearch(this.value)"')

# Ensure map container ID in Step 2
html = html.replace('<div class="relative w-full h-[548px] overflow-hidden bg-surface-container select-none">', '<div id="location-map-container" class="relative w-full h-[548px] overflow-hidden bg-surface-container select-none">')
html = html.replace('<span class="font-title-md text-title-md font-semibold text-on-surface">Opposite BDA Complex</span>', '<span id="loc-card-title" class="font-title-md text-title-md font-semibold text-on-surface">Opposite BDA Complex</span>')
html = html.replace('<p class="font-body-md text-body-md text-on-surface-variant mt-0.5">19th Main Road, Sector 2, HSR Layout</p>', '<p id="loc-card-road" class="font-body-md text-body-md text-on-surface-variant mt-0.5">19th Main Road, Sector 2, HSR Layout</p>')
html = html.replace('<span class="font-label-sm text-label-sm font-semibold text-on-surface">Ward 174: HSR Layout</span>', '<span id="loc-ward-chip" class="font-label-sm text-label-sm font-semibold text-on-surface">Ward 174: HSR Layout</span>')
html = html.replace('<span class="font-label-sm text-label-sm tabular-nums">12.9121° N, 77.6446° E</span>', '<span id="loc-coords-chip" class="font-label-sm text-label-sm tabular-nums">12.9121° N, 77.6446° E</span>')

# 5. Update Step 3 template bindings
html = html.replace('onclick="window.location.href=\'07-report-location-step2.html\'"', 'onclick="App.navigate(\'#/report/step2\')"')
html = html.replace('id="submitComplaintBtn" type="button">', 'id="submitComplaintBtn" type="button" onclick="App.submitFinalComplaint()">')
html = html.replace('<h2 class="font-title-md text-body-lg font-semibold text-on-surface">\n          Deep dangerous pothole near 5th Block junction\n        </h2>', '<h2 id="review-title" class="font-title-md text-body-lg font-semibold text-on-surface">Deep dangerous pothole near 5th Block junction</h2>')
html = html.replace('<p class="font-body-md text-body-md text-on-surface-variant leading-normal">\n          Deep pothole roughly 2 feet wide right in the middle of 19th Main Road, opposite BDA Complex. Vehicles are swerving into oncoming traffic to avoid it.\n        </p>', '<p id="review-desc" class="font-body-md text-body-md text-on-surface-variant leading-normal">Deep pothole roughly 2 feet wide right in the middle of 19th Main Road, opposite BDA Complex. Vehicles are swerving into oncoming traffic to avoid it.</p>')
html = html.replace('data-alt="Close up view of an asphalt road in Bangalore featuring a cracked and dangerous deep pothole', 'id="review-image" data-alt="Close up view of an asphalt road in Bangalore featuring a cracked and dangerous deep pothole')
html = html.replace('Opposite BDA Complex, 19th Main Road, Sector 2, HSR Layout, Bengaluru 560102\n          </p>', '<span id="review-address">Opposite BDA Complex, 19th Main Road, Sector 2, HSR Layout, Bengaluru 560102</span></p>')
html = html.replace('<strong class="text-on-surface font-semibold">Ward 174 (HSR Layout)</strong> • BBMP South Zone', '<span id="review-ward"><strong class="text-on-surface font-semibold">Ward 174 (HSR Layout)</strong> • BBMP South Zone</span>')
html = html.replace('12.9121° N, 77.6446° E\n          </p>', '<span id="review-coords">12.9121° N, 77.6446° E</span></p>')
html = html.replace('<span class="font-title-md text-body-lg font-semibold text-on-surface">Rahul Sharma</span>', '<span id="review-reporter-name" class="font-title-md text-body-lg font-semibold text-on-surface">Rahul Sharma</span>')
html = html.replace('<span class="font-body-sm text-body-sm text-on-surface-variant">+91 98765 43210</span>', '<span id="review-reporter-phone" class="font-body-sm text-body-sm text-on-surface-variant">+91 98765 43210</span>')

# 6. Update Success template bindings
html = html.replace('<span class="font-data-metric text-data-metric text-primary tracking-tight" id="ticket-id">#CF-2026-00124</span>', '<span class="font-data-metric text-data-metric text-primary tracking-tight" id="success-ticket-id">#CF-2026-00124</span>')
html = html.replace('<button onclick="window.location.href=\'09-complaint-details-tracking.html\'" class="w-full flex items-center justify-center gap-space-xs py-3.5 px-space-md rounded-xl bg-primary-container', '<button id="success-track-btn" class="w-full flex items-center justify-center gap-space-xs py-3.5 px-space-md rounded-xl bg-primary-container')
html = html.replace('<button onclick="window.location.href=\'04-my-complaints.html\'" class="w-full flex items-center justify-center py-3 px-space-md rounded-xl bg-surface-container-low', '<button onclick="App.navigate(\'#/my-complaints\')" class="w-full flex items-center justify-center py-3 px-space-md rounded-xl bg-surface-container-low')
html = html.replace('id="copy-btn" onclick="copyTicketId()"', 'id="copy-btn" onclick="App.copyTicketId(document.getElementById(\'success-ticket-id\').innerText)"')

# 7. Update My Complaints template bindings
# Replace static articles with dynamic list container
search_bar_pattern = r'(<div class="px-gutter-mobile pt-space-sm flex flex-col gap-space-md">).*?(<!-- End of Stream Civic Community Banner -->)'
replacement_list = r'''<div id="complaints-list-container" class="px-gutter-mobile pt-space-sm flex flex-col gap-space-md"></div>\n\2'''
html = re.sub(search_bar_pattern, replacement_list, html, flags=re.DOTALL)

# Bind search & filter tabs in My Complaints
html = html.replace('placeholder="Search by ID, keyword or ward..." type="search"/>', 'placeholder="Search by ID, keyword or ward..." type="search" oninput="App.searchQuery=this.value; App.renderComplaintsList();"/>')
html = html.replace('<span>All</span>\n<span class="px-1.5 py-0.2 rounded-full bg-on-primary/20 text-on-primary text-[10px]">12</span>\n</button>', '<span>All</span></button>')
html = html.replace('<button class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm">', '<button onclick="App.setFilter(\'all\', this)" class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm">')
html = html.replace('<span>Pending</span>\n<span class="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant text-[10px]">4</span>\n</button>', '<span>Pending</span></button>')
html = html.replace('<span>In Progress</span>\n<span class="px-1.5 py-0.2 rounded-full bg-secondary-container text-secondary text-[10px]">3</span>\n</button>', '<span>In Progress</span></button>')
html = html.replace('<span>Resolved</span>\n<span class="px-1.5 py-0.2 rounded-full bg-surface-container-high text-tertiary text-[10px]">5</span>\n</button>', '<span>Resolved</span></button>')
html = html.replace('<div class="flex items-center gap-1 text-primary cursor-pointer hover:underline">', '<div class="flex items-center gap-1 text-primary cursor-pointer hover:underline" onclick="App.toggleSort()">')
html = html.replace('<span class="font-label-sm text-label-sm font-semibold">Sort: Newest First</span>', '<span id="sort-label" class="font-label-sm text-label-sm font-semibold">Sort: Newest First</span>')
html = html.replace('<span class="font-data-metric text-data-metric text-on-surface leading-none mt-1">12</span>', '<span id="stat-total" class="font-data-metric text-data-metric text-on-surface leading-none mt-1">12</span>')
html = html.replace('<span class="font-data-metric text-data-metric text-secondary leading-none">07</span>', '<span id="stat-active" class="font-data-metric text-data-metric text-secondary leading-none">07</span>')
html = html.replace('<span class="font-data-metric text-data-metric text-tertiary leading-none">05</span>', '<span id="stat-resolved" class="font-data-metric text-data-metric text-tertiary leading-none">05</span>')

# 8. Update Tracking template bindings
html = html.replace('id="tracking-map"', 'id="tracking-map-canvas"')
html = html.replace('id="upvoteBtn" onclick="handleUpvote()"', 'id="track-upvote-btn" onclick="App.handleTrackingUpvote()"')
html = html.replace('id="upvoteCount">42</span>', 'id="track-upvote-count">42</span>')
html = html.replace('id="commentInput"', 'id="track-comment-input"')
html = html.replace('onclick="postComment()"', 'onclick="App.addTrackingComment()"')
html = html.replace('a href="04-my-complaints.html" aria-label="Go back"', 'a href="#/my-complaints" aria-label="Go back"')

# 9. Update Profile & Notifications template bindings
html = html.replace('id="view-profile"', 'id="view-profile-section"')
html = html.replace('id="view-notifs"', 'id="view-notifs-section"')
html = html.replace('onclick="switchCivicTab(\'profile\')"', 'onclick="App.switchCivicTab(\'profile\')"')
html = html.replace('onclick="switchCivicTab(\'notifs\')"', 'onclick="App.switchCivicTab(\'notifs\')"')
html = html.replace('onclick="markAllNotificationsAsRead()"', 'onclick="App.markAllNotificationsAsRead()"')
html = html.replace('<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold truncate">Rahul Sharma</h1>', '<h1 id="user-name" class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold truncate">Rahul Sharma</h1>')
html = html.replace('+91 98765 43210 • rahul.sharma@gmail.com', '<span id="user-email">+91 98765 43210 • rahul.sharma@gmail.com</span>')
html = html.replace('<span class="font-label-sm text-label-sm text-on-surface-variant">240 Karma Points earned</span>', '<span id="user-karma" class="font-label-sm text-label-sm text-on-surface-variant">240 Karma Points earned</span>')
html = html.replace('<span class="font-label-md text-label-md font-semibold text-primary truncate">Level 3 Civic Contributor</span>', '<span id="user-level" class="font-label-md text-label-md font-semibold text-primary truncate">Level 3 Civic Contributor</span>')
html = html.replace('<span class="text-on-surface-variant">Next tier: <strong class="text-on-surface">Civic Champion</strong></span>', '<span id="user-next-level" class="text-on-surface-variant">Next tier: <strong class="text-on-surface">Civic Champion</strong></span>')
html = html.replace('style="width: 80%;"', 'id="user-karma-progress" style="width: 80%;"')
html = html.replace('<span class="font-data-metric text-data-metric text-on-surface">12</span>', '<span id="profile-total-filed" class="font-data-metric text-data-metric text-on-surface">12</span>')
html = html.replace('<span class="font-data-metric text-data-metric text-primary">5</span>', '<span id="profile-total-resolved" class="font-data-metric text-data-metric text-primary">5</span>')
html = html.replace("onclick=\"window.location.href='09-complaint-details-tracking.html'\"", "onclick=\"App.navigate('#/complaint/CF-2026-00124')\"")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Refined index.html with interactive SPA bindings successfully!")
