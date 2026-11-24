import os

# Components
header_code = '''/**
 * Header Component
 * CivicFix Top Bar & Municipal Status Banner
 */
export function renderHeader(title = 'CivicFix', showBack = false, onBack = null) {
  return `
    <header class="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div class="h-16 px-gutter-mobile flex items-center justify-between">
        <div class="flex items-center gap-space-xs">
          ${showBack ? `
            <button onclick="${onBack || 'history.back()'}" aria-label="Go back" class="w-11 h-11 -ml-1 flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors focus:outline-none">
              <span class="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ` : `
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <span class="material-symbols-outlined text-on-primary text-[22px]">assured_workload</span>
            </div>
          `}
          <div class="flex flex-col">
            <span class="font-headline-sm text-headline-sm text-primary leading-none tracking-tight font-bold">${title}</span>
            <span class="font-label-sm text-label-sm text-secondary font-medium tracking-wide">MUNICIPAL DESK • BBMP</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-surface-container-high">
          <span class="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span class="font-label-sm text-label-sm text-primary font-semibold">Live System</span>
        </div>
      </div>
    </header>
  `;
}
'''

bottom_nav_code = '''/**
 * BottomNav Component
 * Persistent Civic Navigation Bar
 */
export function renderBottomNav(activeRoute = '#/') {
  return `
    <nav id="global-nav" class="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container">
      <div class="flex justify-around items-center h-16 px-space-xs max-w-md mx-auto">
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 ${activeRoute === '#/' ? 'text-primary font-semibold' : 'text-on-surface-variant'} transition-colors" data-path="home" href="#/">
          <span class="material-symbols-outlined text-[24px]">home</span>
          <span class="font-label-sm text-label-sm mt-0.5">Home</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 ${activeRoute === '#/my-complaints' ? 'text-primary font-semibold' : 'text-on-surface-variant'} transition-colors" data-path="my-complaints" href="#/my-complaints">
          <span class="material-symbols-outlined text-[24px]">assignment</span>
          <span class="font-label-sm text-label-sm mt-0.5">My Complaints</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 ${activeRoute.startsWith('#/report') ? 'text-primary font-semibold' : 'text-on-surface-variant'} transition-colors" data-path="explore" href="#/report/step1">
          <span class="material-symbols-outlined text-[24px]">add_circle</span>
          <span class="font-label-sm text-label-sm mt-0.5">Report</span>
        </a>
        <a class="flex flex-col items-center justify-center min-w-[56px] h-12 ${activeRoute === '#/profile' ? 'text-primary font-semibold' : 'text-on-surface-variant'} transition-colors" data-path="profile" href="#/profile">
          <span class="material-symbols-outlined text-[24px]">person</span>
          <span class="font-label-sm text-label-sm mt-0.5">Profile</span>
        </a>
      </div>
    </nav>
  `;
}
'''

toast_code = '''/**
 * Toast Notification Utility
 */
export function showToast(message) {
  if (window.App && window.App.showToast) {
    window.App.showToast(message);
  }
}
'''

with open('src/components/Header.js', 'w', encoding='utf-8') as f:
    f.write(header_code)

with open('src/components/BottomNav.js', 'w', encoding='utf-8') as f:
    f.write(bottom_nav_code)

with open('src/components/Toast.js', 'w', encoding='utf-8') as f:
    f.write(toast_code)

# Views Index
views_index = '''/**
 * CivicFix - Modular Views Export
 */
export const Views = {
  landing: () => document.getElementById('template-landing').innerHTML,
  login: () => document.getElementById('template-login').innerHTML,
  myComplaints: () => document.getElementById('template-my-complaints').innerHTML,
  reportStep1: () => document.getElementById('template-report-step1').innerHTML,
  reportStep2: () => document.getElementById('template-report-step2').innerHTML,
  reportStep3: () => document.getElementById('template-report-step3').innerHTML,
  success: () => document.getElementById('template-success').innerHTML,
  tracking: () => document.getElementById('template-tracking').innerHTML,
  profile: () => document.getElementById('template-profile').innerHTML
};
'''

with open('src/views/index.js', 'w', encoding='utf-8') as f:
    f.write(views_index)

print("Created src/components and src/views modules successfully!")
