import re

def update_file(path, replacements):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 01-welcome-landing.html
update_file('screens/01-welcome-landing.html', [
    (r'id="getStartedBtn"[^>]*>', 'id="getStartedBtn" onclick="window.location.href=\'06-report-details-step1.html\'">'),
    (r'id="loginBtn"[^>]*>', 'id="loginBtn" onclick="window.location.href=\'05-citizen-login.html\'">'),
    (r'id="quickReportBtn"[^>]*>', 'id="quickReportBtn" onclick="window.location.href=\'06-report-details-step1.html\'">')
])

# 05-citizen-login.html
update_file('screens/05-citizen-login.html', [
    (r"showToast\('Authenticating credentials with Civic Council servers\.\.\.'\);", "showToast('Authenticating credentials with Civic Council servers...'); setTimeout(() => window.location.href='04-my-complaints.html', 800);"),
    (r"showToast\('Citizen record registered for Ward! Welcome aboard\.'\);", "showToast('Citizen record registered for Ward! Welcome aboard.'); setTimeout(() => window.location.href='04-my-complaints.html', 800);"),
    (r"showToast\('OTP verified! Dispatching to Ward Dashboard\.\.\.'\)", "showToast('OTP verified! Dispatching to Ward Dashboard...'); setTimeout(() => window.location.href='04-my-complaints.html', 800);")
])

# 06-report-details-step1.html
update_file('screens/06-report-details-step1.html', [
    (r'onclick="history\.back\(\)"', 'onclick="window.location.href=\'01-welcome-landing.html\'"'),
    (r'<button class="w-full py-3\.5 px-space-lg rounded-xl bg-primary-container[^>]*type="button">', '<button onclick="window.location.href=\'07-report-location-step2.html\'" class="w-full py-3.5 px-space-lg rounded-xl bg-primary-container text-on-primary font-title-md text-title-md font-semibold shadow-md active:opacity-90 flex items-center justify-center gap-2 transition-transform duration-100 active:scale-[0.99]" type="button">')
])

# 07-report-location-step2.html
update_file('screens/07-report-location-step2.html', [
    (r'onclick="history\.back\(\)"', 'onclick="window.location.href=\'06-report-details-step1.html\'"'),
    (r'setTimeout\(\(\) => \{\s*confirmBtn\.innerHTML = `.*?`;\s*\}, 900\);', "setTimeout(() => { confirmBtn.innerHTML = '<span class=\"material-symbols-outlined text-[20px]\">check_circle</span><span>Location Locked!</span>'; setTimeout(() => window.location.href='03-review-submit-step3.html', 600); }, 900);")
])

# 03-review-submit-step3.html
update_file('screens/03-review-submit-step3.html', [
    (r'onclick="history\.back\(\)"', 'onclick="window.location.href=\'07-report-location-step2.html\'"'),
    (r'setTimeout\(function\(\) \{\s*btn\.classList\.remove\(.*?\);\s*btn\.classList\.add\(.*?\);\s*btn\.innerHTML = `.*?`;\s*\}, 1200\);', "setTimeout(function() { btn.classList.remove('bg-primary'); btn.classList.add('bg-tertiary-container'); btn.innerHTML = '<span class=\"material-symbols-outlined text-[24px]\">task_alt</span><span>Dispatched • #BBMP-89241</span>'; setTimeout(() => window.location.href='02-submission-success.html', 800); }, 1200);")
])

# 02-submission-success.html
update_file('screens/02-submission-success.html', [
    (r'<button class="w-full flex items-center justify-center gap-space-xs py-3\.5 px-space-md rounded-xl bg-primary-container[^>]*>', '<button onclick="window.location.href=\'09-complaint-details-tracking.html\'" class="w-full flex items-center justify-center gap-space-xs py-3.5 px-space-md rounded-xl bg-primary-container text-on-primary font-title-md text-title-md shadow-md active:bg-primary transition-colors">'),
    (r'<button class="w-full flex items-center justify-center py-3 px-space-md rounded-xl bg-surface-container-low[^>]*>\s*Back to Home Dashboard\s*</button>', '<button onclick="window.location.href=\'04-my-complaints.html\'" class="w-full flex items-center justify-center py-3 px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-md text-body-md active:bg-surface-container transition-colors">Back to Home Dashboard</button>')
])

# 04-my-complaints.html
update_file('screens/04-my-complaints.html', [
    (r'<button class="inline-flex items-center gap-1 text-primary font-title-md text-title-md font-semibold hover:text-primary-container transition-colors">\s*<span>View Details</span>', '<button onclick="window.location.href=\'09-complaint-details-tracking.html\'" class="inline-flex items-center gap-1 text-primary font-title-md text-title-md font-semibold hover:text-primary-container transition-colors"><span>View Details</span>'),
    (r'href="#" data-path="home"', 'href="01-welcome-landing.html" data-path="home"'),
    (r'href="#" data-path="my-complaints"', 'href="04-my-complaints.html" data-path="my-complaints"'),
    (r'href="#" data-path="explore"', 'href="06-report-details-step1.html" data-path="explore"'),
    (r'href="#" data-path="profile"', 'href="08-profile-notifications.html" data-path="profile"')
])

# 08-profile-notifications.html
update_file('screens/08-profile-notifications.html', [
    (r'<button class="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1">\s*<span class="material-symbols-outlined text-\[16px\]">navigation</span>\s*Track Crew Live\s*</button>', '<button onclick="window.location.href=\'09-complaint-details-tracking.html\'" class="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">navigation</span>Track Crew Live</button>'),
    (r'<button class="px-2\.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold hover:bg-primary hover:text-on-primary transition-all shrink-0"\s*onclick="switchCivicTab\(\'notifs\'\)">\s*Track\s*</button>', '<button class="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold hover:bg-primary hover:text-on-primary transition-all shrink-0" onclick="window.location.href=\'09-complaint-details-tracking.html\'">Track</button>'),
    (r'href="#" data-path="home"', 'href="01-welcome-landing.html" data-path="home"'),
    (r'href="#" data-path="my-complaints"', 'href="04-my-complaints.html" data-path="my-complaints"'),
    (r'href="#" data-path="explore"', 'href="06-report-details-step1.html" data-path="explore"'),
    (r'href="#" data-path="profile"', 'href="08-profile-notifications.html" data-path="profile"')
])

print('Successfully linked standalone screens!')
