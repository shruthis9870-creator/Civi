/**
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
