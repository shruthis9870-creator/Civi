/**
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
