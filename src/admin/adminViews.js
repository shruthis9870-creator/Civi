/**
 * CivicFix - Admin Command Center Views
 * Bruhat Bengaluru Mahanagara Palike (BBMP) Municipal Urban Governance
 */

export const AdminViews = {
  // Render persistent desktop admin sidebar
  renderSidebar(activeRoute = 'overview') {
    const isOverview = activeRoute === 'overview' || activeRoute === '#admin' || activeRoute === '';
    const isComplaints = activeRoute === 'complaints' || activeRoute === '#admin/complaints';
    const isMap = activeRoute === 'map' || activeRoute === '#admin/map';
    const isDepartments = activeRoute === 'departments' || activeRoute === '#admin/departments';
    const isAnalytics = activeRoute === 'analytics' || activeRoute === '#admin/analytics';
    const isSettings = activeRoute === 'settings' || activeRoute === '#admin/settings';
    const isLogin = activeRoute === 'login' || activeRoute === '#admin/login';

    const getLinkClass = (active) => active
      ? 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary font-semibold'
      : 'flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors';

    return `
      <aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
        <div class="flex flex-col">
          <!-- Central Command Brand Header -->
          <div class="h-16 px-gutter flex items-center gap-space-sm bg-surface-container-lowest border-b border-surface-container/50">
            <div class="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center shadow-sm">
              <span class="material-symbols-outlined text-on-primary-container text-[20px]">account_balance</span>
            </div>
            <div class="flex flex-col">
              <span class="font-title-md text-title-md text-primary font-bold tracking-tight leading-tight">CivicFix</span>
              <span class="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Central Command • BBMP</span>
            </div>
          </div>

          <!-- Switch to Citizen Mobile View Link -->
          <div class="p-space-sm mx-space-sm my-2 rounded-lg bg-surface-container-low border border-primary/20 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">smartphone</span>
              <div class="flex flex-col">
                <span class="font-label-sm text-xs font-semibold text-primary leading-tight">Citizen Portal</span>
                <span class="text-[10px] text-on-surface-variant">Switch to mobile app</span>
              </div>
            </div>
            <a href="index.html#/" class="px-2 py-1 rounded bg-primary text-on-primary text-[11px] font-semibold hover:bg-primary-container transition-colors">
              Open App
            </a>
          </div>

          <div class="px-space-md py-space-xs">
            <div class="font-label-sm text-[11px] text-on-surface-variant px-space-sm py-space-xs uppercase tracking-wider font-semibold">Municipal Operations</div>
          </div>

          <!-- Navigation Links -->
          <nav class="px-space-sm space-y-1">
            <a href="#admin" data-admin-nav="overview" class="${getLinkClass(isOverview)}">
              <span class="material-symbols-outlined text-[20px]">dashboard</span>
              <span class="font-body-md text-body-md">Overview</span>
            </a>
            <a href="#admin/complaints" data-admin-nav="complaints" class="${getLinkClass(isComplaints)}">
              <span class="material-symbols-outlined text-[20px]">assignment_late</span>
              <span class="font-body-md text-body-md">Complaints</span>
              <span class="ml-auto px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">Live</span>
            </a>
            <a href="#admin/map" data-admin-nav="map" class="${getLinkClass(isMap)}">
              <span class="material-symbols-outlined text-[20px]">map</span>
              <span class="font-body-md text-body-md">Issue GIS Map</span>
              <span class="ml-auto px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Spatial</span>
            </a>
            <a href="#admin/departments" data-admin-nav="departments" class="${getLinkClass(isDepartments)}">
              <span class="material-symbols-outlined text-[20px]">groups</span>
              <span class="font-body-md text-body-md">Departments</span>
            </a>
            <a href="#admin/analytics" data-admin-nav="analytics" class="${getLinkClass(isAnalytics)}">
              <span class="material-symbols-outlined text-[20px]">bar_chart</span>
              <span class="font-body-md text-body-md">Analytics</span>
            </a>
            <a href="#admin/settings" data-admin-nav="settings" class="${getLinkClass(isSettings)}">
              <span class="material-symbols-outlined text-[20px]">settings</span>
              <span class="font-body-md text-body-md">Settings</span>
            </a>
          </nav>
        </div>

        <!-- Administrator User Profile Card -->
        <div class="p-space-sm m-space-sm rounded-xl bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-surface-container">
          <div class="flex items-center gap-space-sm">
            <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary shadow-sm">
              <span class="material-symbols-outlined text-[18px]">engineering</span>
            </div>
            <div class="flex flex-col min-w-0 flex-1">
              <span class="font-label-md text-xs text-on-surface font-semibold truncate">Er. Priya N.</span>
              <span class="text-[10px] text-on-surface-variant truncate">Chief Municipal Eng.</span>
              <span class="text-[10px] text-primary font-medium truncate">BBMP Command Center</span>
            </div>
            <a href="#admin/login" data-admin-nav="login" class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors" title="Logout / Switch Account">
              <span class="material-symbols-outlined text-[18px]">logout</span>
            </a>
          </div>
        </div>
      </aside>
    `;
  },

  // Render top admin command header
  renderHeader(title = 'Central Command Dashboard', subtitle = 'Bruhat Bengaluru Mahanagara Palike') {
    const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `
      <header class="h-16 border-b border-surface-container bg-surface-container-lowest/80 backdrop-blur-md px-gutter flex items-center justify-between sticky top-0 z-40">
        <div class="flex items-center gap-space-md">
          <div class="flex flex-col">
            <h1 class="font-headline-sm text-lg font-bold text-on-surface leading-tight">${title}</h1>
            <span class="text-xs text-on-surface-variant">${subtitle} • ${nowStr}</span>
          </div>
        </div>
        <div class="flex items-center gap-space-sm">
          <!-- Refresh Data Button -->
          <button id="admin-refresh-btn" class="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center gap-1 text-xs font-semibold" title="Refresh Live Municipal Feed">
            <span class="material-symbols-outlined text-[18px]">refresh</span>
            <span class="hidden md:inline">Sync Live</span>
          </button>
          <!-- Live Operations Badge -->
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low border border-primary/20 text-primary text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>All 198 Wards Online</span>
          </div>
          <!-- Citizen App Link -->
          <a href="index.html#/" class="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors">
            <span class="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Citizen View</span>
          </a>
        </div>
      </header>
    `;
  },

  // 1. OVERVIEW DASHBOARD VIEW
  renderOverview(complaints = [], metrics = {}) {
    const total = metrics.total || complaints.length;
    const pending = metrics.pending || complaints.filter(c => c.status === 'Pending Review').length;
    const inProgress = metrics.inProgress || complaints.filter(c => c.status === 'In Progress').length;
    const resolved = metrics.resolved || complaints.filter(c => c.status === 'Resolved').length;
    const compliance = metrics.slaCompliance || 94.2;

    const recentComplaints = complaints.slice(0, 5);

    return `
      <div class="p-gutter space-y-gutter">
        <!-- City Operations Welcome Banner -->
        <div class="p-space-lg rounded-2xl bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full bg-on-primary/10 text-on-primary text-xs font-semibold">Karnataka Urban Governance Hub</span>
              <span class="text-xs text-on-primary/80">Zone: BBMP South & Central</span>
            </div>
            <h2 class="text-2xl font-bold mt-1 tracking-tight">City Operations Overview</h2>
            <p class="text-sm text-on-primary/80 mt-0.5 max-w-xl">
              Live automated monitoring, incident routing, and field engineering dispatch across Bangalore municipal divisions.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <a href="#admin/complaints" class="px-4 py-2 rounded-xl bg-on-primary text-primary font-semibold text-xs hover:bg-surface-container-lowest transition-colors shadow">
              Manage Complaints (${total})
            </a>
            <a href="#admin/analytics" class="px-4 py-2 rounded-xl bg-on-primary/20 text-on-primary font-semibold text-xs hover:bg-on-primary/30 transition-colors">
              Performance Reports
            </a>
          </div>
        </div>

        <!-- 4 KPI Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-on-surface-variant font-medium">Total Active Complaints</span>
              <span class="text-3xl font-bold text-on-surface mt-1">${total}</span>
              <span class="text-[11px] text-primary flex items-center gap-0.5 mt-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">trending_up</span> +12% this week
              </span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">assignment</span>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-on-surface-variant font-medium">Pending Review & Triage</span>
              <span class="text-3xl font-bold text-amber-700 mt-1">${pending}</span>
              <span class="text-[11px] text-amber-700 flex items-center gap-0.5 mt-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">schedule</span> Immediate Action Required
              </span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-on-surface-variant font-medium">Crews Dispatched / In Progress</span>
              <span class="text-3xl font-bold text-secondary mt-1">${inProgress}</span>
              <span class="text-[11px] text-secondary flex items-center gap-0.5 mt-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">engineering</span> Hot-mix & Repair on-site
              </span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">construction</span>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-on-surface-variant font-medium">SLA Resolution Rate</span>
              <span class="text-3xl font-bold text-primary mt-1">${compliance}%</span>
              <span class="text-[11px] text-primary flex items-center gap-0.5 mt-1 font-semibold">
                <span class="material-symbols-outlined text-[14px]">verified</span> Target: 90% (Exceeded)
              </span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary-container/20 text-primary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
          </div>
        </div>

        <!-- Charts and Breakdown Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <!-- Trends Chart Card -->
          <div class="lg:col-span-2 p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-surface-container pb-space-sm mb-4">
              <div class="flex flex-col">
                <h3 class="font-bold text-base text-on-surface">Monthly Complaint Trends & Resolution Velocity</h3>
                <span class="text-xs text-on-surface-variant">Incoming citizen tickets vs verified resolved cases</span>
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-container text-primary">FY 2026</span>
            </div>
            <!-- SVG Vector Visual Chart -->
            <div class="w-full h-56 flex items-end justify-between px-4 pt-4 pb-2 border-b border-surface-container">
              ${[
                { month: 'Jun', total: 65, resolved: 58 },
                { month: 'Jul', total: 85, resolved: 78 },
                { month: 'Aug', total: 110, resolved: 102 },
                { month: 'Sep', total: 95, resolved: 89 },
                { month: 'Oct', total: 130, resolved: 118 },
                { month: 'Nov', total: 80, resolved: 74 }
              ].map(item => `
                <div class="flex flex-col items-center gap-1.5 flex-1 max-w-[50px]">
                  <div class="w-full flex items-end justify-center gap-1 h-40">
                    <div style="height: ${(item.total / 130) * 100}%" class="w-3 rounded-t bg-secondary/40 hover:bg-secondary transition-all" title="Total: ${item.total}"></div>
                    <div style="height: ${(item.resolved / 130) * 100}%" class="w-3 rounded-t bg-primary hover:bg-primary-container transition-all" title="Resolved: ${item.resolved}"></div>
                  </div>
                  <span class="text-xs font-medium text-on-surface-variant">${item.month}</span>
                </div>
              `).join('')}
            </div>
            <div class="flex items-center justify-center gap-6 pt-3 text-xs text-on-surface-variant">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-secondary/40"></span> Total Registered</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-primary"></span> Resolved Cases</span>
            </div>
          </div>

          <!-- Status Distribution Donut Card -->
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-surface-container pb-space-sm mb-4">
              <h3 class="font-bold text-base text-on-surface">Distribution by Status</h3>
              <span class="text-xs text-on-surface-variant">${total} Total</span>
            </div>
            <div class="flex flex-col items-center justify-center py-2">
              <div class="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 36 36" class="w-36 h-36 transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#effdf3" stroke-width="4"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#00513b" stroke-width="4" stroke-dasharray="${(resolved/Math.max(1, total))*100} 100" stroke-dashoffset="0"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#48607d" stroke-width="4" stroke-dasharray="${(inProgress/Math.max(1, total))*100} 100" stroke-dashoffset="-${(resolved/Math.max(1, total))*100}"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e9a23b" stroke-width="4" stroke-dasharray="${(pending/Math.max(1, total))*100} 100" stroke-dashoffset="-${((resolved+inProgress)/Math.max(1, total))*100}"></circle>
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-2xl font-bold text-on-surface">${total}</span>
                  <span class="text-[10px] text-on-surface-variant uppercase font-semibold">Complaints</span>
                </div>
              </div>
            </div>
            <div class="space-y-2 pt-2 border-t border-surface-container text-xs">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-primary"></span> Resolved</span>
                <span class="font-semibold text-on-surface">${resolved} (${Math.round((resolved/Math.max(1, total))*100)}%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-secondary"></span> In Progress</span>
                <span class="font-semibold text-on-surface">${inProgress} (${Math.round((inProgress/Math.max(1, total))*100)}%)</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-[#e9a23b]"></span> Pending Review</span>
                <span class="font-semibold text-on-surface">${pending} (${Math.round((pending/Math.max(1, total))*100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Incident Feed Table -->
        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
          <div class="flex items-center justify-between pb-space-sm mb-4 border-b border-surface-container">
            <div class="flex flex-col">
              <h3 class="font-bold text-base text-on-surface">Recent Municipal Complaints Feed</h3>
              <span class="text-xs text-on-surface-variant">Live incoming reports from citizen mobile desk</span>
            </div>
            <a href="#admin/complaints" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              <span>View All Complaints</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-container-low text-on-surface-variant uppercase font-semibold text-[11px]">
                <tr>
                  <th class="py-2.5 px-3">Ticket ID</th>
                  <th class="py-2.5 px-3">Issue Title</th>
                  <th class="py-2.5 px-3">Category</th>
                  <th class="py-2.5 px-3">Ward & Location</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3">Assigned Crew</th>
                  <th class="py-2.5 px-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container">
                ${recentComplaints.map(item => `
                  <tr class="hover:bg-surface-container-low transition-colors">
                    <td class="py-3 px-3 font-mono font-bold text-primary">${item.id}</td>
                    <td class="py-3 px-3 font-medium text-on-surface max-w-xs truncate">${item.title}</td>
                    <td class="py-3 px-3">
                      <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[10px]">
                        ${item.categoryLabel || item.category}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-on-surface-variant max-w-xs truncate">${item.ward || item.locationAddress}</td>
                    <td class="py-3 px-3">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                        item.status === 'Resolved' ? 'bg-primary/10 text-primary' :
                        item.status === 'In Progress' ? 'bg-primary-container/10 text-primary-container' :
                        'bg-amber-100 text-amber-800'
                      }">
                        <span class="w-1.5 h-1.5 rounded-full ${
                          item.status === 'Resolved' ? 'bg-primary' :
                          item.status === 'In Progress' ? 'bg-primary-container' : 'bg-amber-600'
                        }"></span>
                        ${item.status}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-on-surface font-medium">${item.engineer || 'Unassigned'}</td>
                    <td class="py-3 px-3 text-right">
                      <button data-quick-view="${item.id}" class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-[11px] transition-colors">
                        Inspect
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 2. COMPLAINT MANAGEMENT MATRIX VIEW
  renderComplaints(complaints = [], filters = {}, selectedIds = []) {
    return `
      <div class="p-gutter space-y-gutter">
        <!-- Header & Title -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex flex-col">
            <h2 class="text-2xl font-bold text-on-surface">Complaint Management Matrix</h2>
            <span class="text-xs text-on-surface-variant">Live municipal triage, department dispatch, and resolution verification</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="admin-export-csv" class="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span>Export CSV</span>
            </button>
            <button id="admin-bulk-resolve-btn" class="${selectedIds.length > 0 ? 'flex' : 'hidden'} items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow hover:bg-primary-container transition-colors">
              <span class="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Bulk Resolve (${selectedIds.length})</span>
            </button>
          </div>
        </div>

        <!-- Filter & Search Bar Matrix -->
        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- Status Buttons -->
            <div class="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
              ${[
                { id: 'all', label: 'All Cases' },
                { id: 'Pending Review', label: 'Pending Review' },
                { id: 'In Progress', label: 'In Progress' },
                { id: 'Resolved', label: 'Resolved' }
              ].map(btn => `
                <button data-filter-status="${btn.id}" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  (filters.status || 'all') === btn.id ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }">
                  ${btn.label}
                </button>
              `).join('')}
            </div>

            <!-- Priority & Ward Dropdowns -->
            <div class="flex items-center gap-2 flex-wrap">
              <select id="filter-priority" class="text-xs rounded-lg border border-outline-variant bg-surface-container-lowest px-2.5 py-1.5 text-on-surface focus:outline-none focus:border-primary">
                <option value="all">All Priorities</option>
                <option value="Urgent">Urgent / Critical</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
              </select>

              <select id="filter-ward" class="text-xs rounded-lg border border-outline-variant bg-surface-container-lowest px-2.5 py-1.5 text-on-surface focus:outline-none focus:border-primary">
                <option value="all">All Wards (BBMP)</option>
                <option value="174">Ward 174 (HSR Layout)</option>
                <option value="150">Ward 150 (Bellandur)</option>
                <option value="112">Ward 112 (Indiranagar)</option>
                <option value="151">Ward 151 (Koramangala)</option>
                <option value="64">Ward 64 (Malleshwaram)</option>
              </select>
            </div>
          </div>

          <!-- Search Input -->
          <div class="relative w-full">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
            <input id="admin-search-input" value="${filters.search || ''}" type="text" placeholder="Search complaints by Ticket ID, citizen name, street address, or keyword..."
                   class="w-full pl-9 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"/>
          </div>
        </div>

        <!-- Data Table Card -->
        <div class="rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-container-low text-on-surface-variant uppercase font-semibold text-[11px] border-b border-surface-container">
                <tr>
                  <th class="py-3 px-3 text-center w-10">
                    <input id="admin-select-all" type="checkbox" class="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"/>
                  </th>
                  <th class="py-3 px-3">Ticket ID</th>
                  <th class="py-3 px-3">Report Details</th>
                  <th class="py-3 px-3">Category</th>
                  <th class="py-3 px-3">Ward Location</th>
                  <th class="py-3 px-3">Citizen Contact</th>
                  <th class="py-3 px-3">AI Confidence</th>
                  <th class="py-3 px-3">Assigned Crew</th>
                  <th class="py-3 px-3">Priority</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container">
                ${complaints.length === 0 ? `
                  <tr>
                    <td colspan="11" class="py-12 text-center text-on-surface-variant">
                      <span class="material-symbols-outlined text-4xl mb-2 text-on-surface-variant/40">inbox</span>
                      <p class="font-semibold text-sm">No complaints found matching current filters.</p>
                      <button id="admin-reset-filters" class="mt-2 text-xs text-primary font-bold hover:underline">Reset Filters</button>
                    </td>
                  </tr>
                ` : complaints.map(c => `
                  <tr class="hover:bg-surface-container-low transition-colors">
                    <td class="py-3 px-3 text-center align-middle">
                      <input data-ticket-check="${c.id}" ${selectedIds.includes(c.id) ? 'checked' : ''} type="checkbox" class="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"/>
                    </td>
                    <td class="py-3 px-3 font-semibold text-primary font-mono whitespace-nowrap">
                      ${c.id}
                    </td>
                    <td class="py-3 px-3">
                      <div class="flex items-center gap-2.5">
                        <img class="w-10 h-10 rounded-lg object-cover flex-shrink-0 shadow-sm border border-surface-container" src="${c.imageUrl}" alt="${c.title}"/>
                        <div class="flex flex-col min-w-0">
                          <span class="font-semibold text-on-surface truncate max-w-[180px]" title="${c.title}">${c.title}</span>
                          <span class="text-[10px] text-on-surface-variant flex items-center gap-1">
                            <span class="material-symbols-outlined text-[12px]">photo_camera</span> Attached Photo
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold text-[10px]">
                        ${c.categoryLabel || c.category}
                      </span>
                    </td>
                    <td class="py-3 px-3">
                      <div class="flex flex-col max-w-[140px]">
                        <span class="font-medium text-on-surface truncate">${c.landmark || c.locationAddress}</span>
                        <span class="text-[10px] text-on-surface-variant truncate">${c.ward}</span>
                      </div>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <div class="flex flex-col">
                        <span class="font-medium text-on-surface">${c.reporter || 'Resident'}</span>
                        <span class="text-[10px] text-on-surface-variant font-mono">+91 98765 *****</span>
                      </div>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <div class="flex items-center gap-1 text-primary font-semibold text-[11px]">
                        <span class="material-symbols-outlined text-[14px]">auto_awesome</span>
                        <span>${c.aiConfidence || '98%'}</span>
                      </div>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <div class="flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <span class="font-medium text-on-surface">${c.engineer || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        c.priority?.includes('Urgent') || c.priority?.includes('High') ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-on-surface'
                      }">
                        ${c.priority || 'Normal'}
                      </span>
                    </td>
                    <td class="py-3 px-3 whitespace-nowrap">
                      <select data-status-select="${c.id}" class="text-[11px] font-semibold rounded-full px-2 py-1 border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary">
                        <option value="Pending Review" ${c.status === 'Pending Review' ? 'selected' : ''}>Pending Review</option>
                        <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                      </select>
                    </td>
                    <td class="py-3 px-3 text-right whitespace-nowrap">
                      <button data-quick-view="${c.id}" class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-[11px] transition-colors">
                        Details
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pagination Bar -->
          <div class="p-space-md border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
            <span>Showing <span class="font-bold text-on-surface">${complaints.length}</span> active cases</span>
            <div class="flex items-center gap-1">
              <button class="w-7 h-7 rounded bg-primary text-on-primary font-bold flex items-center justify-center">1</button>
              <button class="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center font-medium">2</button>
              <button class="w-7 h-7 rounded hover:bg-surface-container flex items-center justify-center font-medium">3</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 3. MUNICIPAL PERFORMANCE ANALYTICS VIEW
  renderAnalytics(complaints = [], metrics = {}) {
    return `
      <div class="p-gutter space-y-gutter">
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold text-on-surface">Municipal Performance Analytics & Reports</h2>
          <span class="text-xs text-on-surface-variant">Statistical SLA velocity, ward density, and operational compliance dossier</span>
        </div>

        <!-- 3 KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-xs text-on-surface-variant font-medium">Average Resolution Velocity</span>
            <div class="text-3xl font-bold text-primary mt-1">18.4 Hours</div>
            <p class="text-[11px] text-on-surface-variant mt-1">Across 4,280 resolved work orders this quarter</p>
          </div>
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-xs text-on-surface-variant font-medium">Citizen Satisfaction Rating</span>
            <div class="text-3xl font-bold text-on-surface mt-1">4.8 / 5.0 ★</div>
            <p class="text-[11px] text-on-surface-variant mt-1">Based on 1,840 verified citizen feedback submissions</p>
          </div>
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-xs text-on-surface-variant font-medium">AI Geotag Accuracy</span>
            <div class="text-3xl font-bold text-secondary mt-1">98.9%</div>
            <p class="text-[11px] text-on-surface-variant mt-1">Automated GPS geofence routing without manual intervention</p>
          </div>
        </div>

        <!-- Ward Density Breakdown Table -->
        <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
          <h3 class="font-bold text-base text-on-surface mb-2">Ward Health & Incident Density Index</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-container-low text-on-surface-variant uppercase font-semibold text-[11px]">
                <tr>
                  <th class="py-2.5 px-3">Ward Name</th>
                  <th class="py-2.5 px-3">Zone</th>
                  <th class="py-2.5 px-3">Active Tickets</th>
                  <th class="py-2.5 px-3">Avg Resolution</th>
                  <th class="py-2.5 px-3">Health Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container">
                ${[
                  { ward: 'Ward 174 (HSR Layout)', zone: 'BBMP South', tickets: 28, time: '14.2 hrs', health: 'Optimal', color: 'text-primary' },
                  { ward: 'Ward 150 (Bellandur)', zone: 'BBMP Mahadevapura', tickets: 54, time: '22.0 hrs', health: 'High Load', color: 'text-amber-700' },
                  { ward: 'Ward 112 (Indiranagar)', zone: 'BBMP East', tickets: 19, time: '16.5 hrs', health: 'Optimal', color: 'text-primary' },
                  { ward: 'Ward 151 (Koramangala)', zone: 'BBMP South', tickets: 32, time: '19.1 hrs', health: 'Moderate', color: 'text-on-surface' },
                  { ward: 'Ward 64 (Malleshwaram)', zone: 'BBMP West', tickets: 14, time: '12.8 hrs', health: 'Optimal', color: 'text-primary' }
                ].map(w => `
                  <tr class="hover:bg-surface-container-low transition-colors">
                    <td class="py-3 px-3 font-semibold text-on-surface">${w.ward}</td>
                    <td class="py-3 px-3 text-on-surface-variant">${w.zone}</td>
                    <td class="py-3 px-3 font-mono font-bold">${w.tickets}</td>
                    <td class="py-3 px-3">${w.time}</td>
                    <td class="py-3 px-3 font-semibold ${w.color}">${w.health}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 4. ADMINISTRATOR LOGIN VIEW
  renderLogin() {
    return `
      <div class="min-h-[85vh] flex items-center justify-center p-gutter">
        <div class="w-full max-w-md p-space-xl rounded-2xl bg-surface-container-lowest border border-surface-container shadow-lg space-y-gutter">
          <div class="flex flex-col items-center text-center">
            <div class="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-md mb-2">
              <span class="material-symbols-outlined text-[28px]">shield</span>
            </div>
            <h2 class="text-xl font-bold text-on-surface">BBMP Central Command</h2>
            <span class="text-xs text-on-surface-variant mt-0.5">Municipal Administrator Secure Access Gateway</span>
            <div class="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-semibold">
              <span class="material-symbols-outlined text-[14px]">verified_user</span> Parichay / DigiLocker GovSSO
            </div>
          </div>

          <form id="admin-login-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-on-surface mb-1">Official Government ID / Email</label>
              <input id="admin-login-email" type="text" value="priya.n@bbmp.gov.in" required
                     class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-on-surface mb-1">Secure Password</label>
              <input id="admin-login-password" type="password" value="bbmp_command_2026" required
                     class="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"/>
            </div>

            <button type="submit" class="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Authorize & Sign In</span>
            </button>

            <button type="button" id="admin-demo-prefill" class="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-semibold text-[11px] transition-colors border border-primary/20">
              Auto-Fill Chief Municipal Engineer Credentials
            </button>
          </form>

          <div class="text-center pt-2 border-t border-surface-container">
            <a href="index.html#/" class="text-xs text-primary font-semibold hover:underline flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Return to Citizen Mobile Portal</span>
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // Modal: Quick Inspection / Details
  renderDetailModal(c) {
    if (!c) return '';
    return `
      <div id="admin-modal-backdrop" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden border border-surface-container max-h-[90vh] flex flex-col">
          <!-- Modal Header -->
          <div class="p-space-md border-b border-surface-container flex items-center justify-between bg-surface-container-low">
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-primary text-sm">${c.id}</span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                ${c.categoryLabel || c.category}
              </span>
            </div>
            <button id="admin-modal-close" class="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-space-md overflow-y-auto space-y-4 text-xs">
            <img class="w-full h-48 rounded-xl object-cover border border-surface-container shadow-sm" src="${c.imageUrl}" alt="${c.title}"/>
            <div>
              <h3 class="text-base font-bold text-on-surface">${c.title}</h3>
              <p class="text-on-surface-variant mt-1 leading-relaxed">${c.description}</p>
            </div>

            <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low">
              <div>
                <span class="text-on-surface-variant block text-[10px] font-semibold uppercase">Ward Location</span>
                <span class="font-semibold text-on-surface">${c.ward}</span>
                <span class="text-on-surface-variant block text-[11px]">${c.landmark || c.locationAddress}</span>
              </div>
              <div>
                <span class="text-on-surface-variant block text-[10px] font-semibold uppercase">Assigned Crew</span>
                <span class="font-semibold text-on-surface">${c.engineer || 'Unassigned'}</span>
                <span class="text-on-surface-variant block text-[11px]">${c.crewVehicle || 'Standard Municipal Unit'}</span>
              </div>
            </div>

            <!-- Triage Quick Action -->
            <div class="pt-2 border-t border-surface-container flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-on-surface">Update Status:</span>
                <select id="modal-status-select" class="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-outline-variant bg-surface">
                  <option value="Pending Review" ${c.status === 'Pending Review' ? 'selected' : ''}>Pending Review</option>
                  <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                  <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
              </div>
              <button id="modal-save-status-btn" data-ticket-id="${c.id}" class="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container transition-colors">
                Apply Update
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 5. GIS SPATIAL COMMAND MAP VIEW
  renderMap(complaints = []) {
    return `
      <div class="p-gutter space-y-gutter">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span class="text-xs uppercase tracking-wider text-primary font-bold">BBMP Spatial Intelligence</span>
              <span class="text-outline-variant">•</span>
              <span class="text-xs text-on-surface-variant">Real-time GPS Incident Clustering & Fleet Telemetry</span>
            </div>
            <h2 class="text-2xl font-bold text-on-surface mt-1">Municipal Issue GIS Heatmap</h2>
            <p class="text-xs text-on-surface-variant">Interactive geographical command across 198 BBMP wards</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="gis-zoom-hsr" class="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px] text-primary">my_location</span>
              <span>Ward 174 (HSR)</span>
            </button>
            <button id="gis-zoom-bellandur" class="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
              <span class="material-symbols-outlined text-[16px] text-primary">location_city</span>
              <span>Ward 150 (Bellandur)</span>
            </button>
          </div>
        </div>

        <!-- 5 Ward Density Summary Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-[10px] text-on-surface-variant uppercase font-semibold block">Ward 174 • HSR Layout</span>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xl font-bold text-on-surface">28 Active</span>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">4 Crews</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-[10px] text-on-surface-variant uppercase font-semibold block">Ward 150 • Bellandur</span>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xl font-bold text-error">54 Active</span>
              <span class="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">High Load</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-[10px] text-on-surface-variant uppercase font-semibold block">Ward 112 • Indiranagar</span>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xl font-bold text-on-surface">19 Active</span>
              <span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">3 Crews</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-[10px] text-on-surface-variant uppercase font-semibold block">Ward 151 • Koramangala</span>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xl font-bold text-on-surface">32 Active</span>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">5 Crews</span>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm">
            <span class="text-[10px] text-on-surface-variant uppercase font-semibold block">Ward 64 • Malleshwaram</span>
            <div class="flex items-center justify-between mt-1">
              <span class="text-xl font-bold text-on-surface">14 Active</span>
              <span class="px-2 py-0.5 rounded-full bg-primary-container/10 text-primary font-bold">Optimal</span>
            </div>
          </div>
        </div>

        <!-- Leaflet Map Container -->
        <div class="relative w-full rounded-2xl overflow-hidden border border-surface-container shadow-md bg-surface-container-lowest">
          <div id="admin-live-leaflet-map" class="w-full h-[580px] z-10"></div>

          <!-- Floating Legend -->
          <div class="absolute top-4 left-4 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-xl border border-surface-container shadow-lg max-w-xs text-xs space-y-2">
            <span class="font-bold text-on-surface block text-[11px] uppercase tracking-wider">Spatial Layer Legend</span>
            <div class="space-y-1.5">
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-600"></span><span>Road Hazard / Pothole</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500"></span><span>Waste Dump</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-blue-600"></span><span>Water Pipe Rupture</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-purple-600"></span><span>Drain Overflow</span></div>
              <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span><span class="font-bold text-emerald-800">Field Crew Radar (Live)</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 6. DEPARTMENTS & FIELD CREW FLEET MANAGEMENT VIEW
  renderDepartments(complaints = []) {
    return `
      <div class="p-gutter space-y-gutter">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span class="text-xs uppercase tracking-wider text-primary font-bold">BBMP Municipal Workforce</span>
              <span class="text-outline-variant">•</span>
              <span class="text-xs text-on-surface-variant">5 Municipal Divisions • 28 Active Response Teams</span>
            </div>
            <h2 class="text-2xl font-bold text-on-surface mt-1">Departments & Fleet Command</h2>
            <p class="text-xs text-on-surface-variant">Real-time crew deployment, machinery telemetry, and work order load balancing</p>
          </div>
          <button id="dispatch-emergency-unit-btn" class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[16px]">add_task</span>
            <span>Dispatch Emergency Unit</span>
          </button>
        </div>

        <!-- 5 Department Division Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">construction</span>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-on-surface">Road Infrastructure Dept</h3>
                  <span class="text-[11px] text-on-surface-variant">EE Er. M. Nataraj</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">94.2% SLA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container text-center text-xs">
              <div><span class="font-bold text-on-surface block">14</span><span class="text-[10px] text-on-surface-variant">Active WOs</span></div>
              <div><span class="font-bold text-on-surface block">8 Units</span><span class="text-[10px] text-on-surface-variant">On-site</span></div>
              <div><span class="font-bold text-primary block">48 Staff</span><span class="text-[10px] text-on-surface-variant">Available</span></div>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">delete_sweep</span>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-on-surface">Solid Waste Management</h3>
                  <span class="text-[11px] text-on-surface-variant">Supervisor K. Nanjappa</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">96.8% SLA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container text-center text-xs">
              <div><span class="font-bold text-on-surface block">9</span><span class="text-[10px] text-on-surface-variant">Active WOs</span></div>
              <div><span class="font-bold text-on-surface block">18 Compactors</span><span class="text-[10px] text-on-surface-variant">Running</span></div>
              <div><span class="font-bold text-primary block">120 Staff</span><span class="text-[10px] text-on-surface-variant">Deployed</span></div>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">electrical_services</span>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-on-surface">BESCOM Electrical Division</h3>
                  <span class="text-[11px] text-on-surface-variant">Er. S. Ramesh</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">92.0% SLA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container text-center text-xs">
              <div><span class="font-bold text-on-surface block">6</span><span class="text-[10px] text-on-surface-variant">Active WOs</span></div>
              <div><span class="font-bold text-on-surface block">4 Booms</span><span class="text-[10px] text-on-surface-variant">On-site</span></div>
              <div><span class="font-bold text-primary block">36 Linesmen</span><span class="text-[10px] text-on-surface-variant">Ready</span></div>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">water_damage</span>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-on-surface">BWSSB Rapid Water Response</h3>
                  <span class="text-[11px] text-on-surface-variant">AE Er. T. Manjunath</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">95.5% SLA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container text-center text-xs">
              <div><span class="font-bold text-on-surface block">5</span><span class="text-[10px] text-on-surface-variant">Active WOs</span></div>
              <div><span class="font-bold text-on-surface block">3 Clamps</span><span class="text-[10px] text-on-surface-variant">In Progress</span></div>
              <div><span class="font-bold text-primary block">28 Plumbers</span><span class="text-[10px] text-on-surface-variant">Ready</span></div>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">waves</span>
                </div>
                <div>
                  <h3 class="font-bold text-sm text-on-surface">Stormwater Drain (SWD) Cell</h3>
                  <span class="text-[11px] text-on-surface-variant">Er. C. Chandrashekar</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">91.4% SLA</span>
            </div>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container text-center text-xs">
              <div><span class="font-bold text-on-surface block">7</span><span class="text-[10px] text-on-surface-variant">Active WOs</span></div>
              <div><span class="font-bold text-on-surface block">4 Suckers</span><span class="text-[10px] text-on-surface-variant">Desilting</span></div>
              <div><span class="font-bold text-primary block">32 Techs</span><span class="text-[10px] text-on-surface-variant">Active</span></div>
            </div>
          </div>
        </div>

        <!-- Live Machinery Fleet Table -->
        <div class="rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm overflow-hidden">
          <div class="p-4 border-b border-surface-container flex items-center justify-between">
            <h3 class="font-bold text-base text-on-surface">Vehicle Telemetry & Field Crew Deployment</h3>
            <span class="text-xs text-on-surface-variant">Real-time GPS status of BBMP emergency vehicles</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-container-low text-on-surface-variant uppercase font-semibold text-[11px]">
                <tr>
                  <th class="py-3 px-3">Vehicle Reg #</th>
                  <th class="py-3 px-3">Machinery Type</th>
                  <th class="py-3 px-3">Department</th>
                  <th class="py-3 px-3">Assigned Lead</th>
                  <th class="py-3 px-3">Ward Location</th>
                  <th class="py-3 px-3">Linked Ticket</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-container">
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-3 font-mono font-bold text-primary">KA-01-EA-4821</td>
                  <td class="py-3 px-3">Hot-mix Bitumen Paver #4</td>
                  <td class="py-3 px-3 font-medium">Road Infrastructure</td>
                  <td class="py-3 px-3">EE Er. M. Nataraj</td>
                  <td class="py-3 px-3">19th Main, Ward 174 HSR</td>
                  <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00124</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">On-site Repair</span></td>
                  <td class="py-3 px-3 text-right"><button onclick="alert('Ping sent to crew unit KA-01-EA-4821')" class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-3 font-mono font-bold text-primary">KA-03-GA-1102</td>
                  <td class="py-3 px-3">Hydraulic SWM Compactor</td>
                  <td class="py-3 px-3 font-medium">Solid Waste Division</td>
                  <td class="py-3 px-3">Supervisor K. Nanjappa</td>
                  <td class="py-3 px-3">Metro Pillar 42, Indiranagar</td>
                  <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00118</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">En Route</span></td>
                  <td class="py-3 px-3 text-right"><button onclick="alert('Ping sent to crew unit KA-03-GA-1102')" class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-3 font-mono font-bold text-primary">KA-04-E-2190</td>
                  <td class="py-3 px-3">Aerial Boom Truck #3</td>
                  <td class="py-3 px-3 font-medium">BESCOM Electrical</td>
                  <td class="py-3 px-3">Er. S. Ramesh</td>
                  <td class="py-3 px-3">100ft Road, Indiranagar</td>
                  <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00126</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Active Isolation</span></td>
                  <td class="py-3 px-3 text-right"><button onclick="alert('Ping sent to crew unit KA-04-E-2190')" class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
                </tr>
                <tr class="hover:bg-surface-container-low transition-colors">
                  <td class="py-3 px-3 font-mono font-bold text-primary">KA-02-D-9903</td>
                  <td class="py-3 px-3">High-Pressure Super Sucker</td>
                  <td class="py-3 px-3 font-medium">SWD Desilting Unit</td>
                  <td class="py-3 px-3">Er. C. Chandrashekar</td>
                  <td class="py-3 px-3">11th Cross, Malleshwaram</td>
                  <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00128</td>
                  <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Desilting Sump</span></td>
                  <td class="py-3 px-3 text-right"><button onclick="alert('Ping sent to crew unit KA-02-D-9903')" class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 7. CENTRAL COMMAND SETTINGS & GOVERNANCE RULES VIEW
  renderSettings() {
    return `
      <div class="p-gutter space-y-gutter">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span class="text-xs uppercase tracking-wider text-primary font-bold">Policy & Configuration Console</span>
              <span class="text-outline-variant">•</span>
              <span class="text-xs text-on-surface-variant">Karnataka Municipal Corporations Act Compliance</span>
            </div>
            <h2 class="text-2xl font-bold text-on-surface mt-1">System Settings & SLA Thresholds</h2>
            <p class="text-xs text-on-surface-variant">Configure automated SLA timers, AI vision auto-routing triggers, notification webhooks, and GovSSO RBAC</p>
          </div>
          <button id="save-settings-btn" class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[16px]">save</span>
            <span>Save Configuration</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-center gap-2 pb-2 border-b border-surface-container">
              <span class="material-symbols-outlined text-primary text-[20px]">timer</span>
              <h3 class="font-bold text-sm text-on-surface">SLA Maximum Resolution Thresholds</h3>
            </div>
            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-semibold text-on-surface block">Potholes & Road Cratering</span>
                  <span class="text-[10px] text-on-surface-variant">BBMP Road Infrastructure Cell</span>
                </div>
                <div class="flex items-center gap-1">
                  <input type="number" value="48" class="w-16 px-2 py-1 border rounded bg-surface text-center font-bold"/>
                  <span class="text-on-surface-variant font-medium">hours</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-semibold text-on-surface block">Solid Waste & Garbage Accumulation</span>
                  <span class="text-[10px] text-on-surface-variant">SWM Hydraulic Compactor Squad</span>
                </div>
                <div class="flex items-center gap-1">
                  <input type="number" value="24" class="w-16 px-2 py-1 border rounded bg-surface text-center font-bold"/>
                  <span class="text-on-surface-variant font-medium">hours</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-semibold text-on-surface block">Exposed Electrical Wiring / Streetlight</span>
                  <span class="text-[10px] text-on-surface-variant">BESCOM Electrical Rapid Repair</span>
                </div>
                <div class="flex items-center gap-1">
                  <input type="number" value="12" class="w-16 px-2 py-1 border rounded bg-surface text-center font-bold text-error"/>
                  <span class="text-on-surface-variant font-medium">hours</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-semibold text-on-surface block">Potable Water Main Rupture</span>
                  <span class="text-[10px] text-on-surface-variant">BWSSB South Pipe Emergency Unit</span>
                </div>
                <div class="flex items-center gap-1">
                  <input type="number" value="24" class="w-16 px-2 py-1 border rounded bg-surface text-center font-bold"/>
                  <span class="text-on-surface-variant font-medium">hours</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
            <div class="flex items-center gap-2 pb-2 border-b border-surface-container">
              <span class="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              <h3 class="font-bold text-sm text-on-surface">AI Computer Vision Auto-Routing</h3>
            </div>
            <div class="space-y-4 text-xs">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-semibold text-on-surface">Minimum Auto-Triage Confidence</span>
                  <span class="font-mono font-bold text-primary">95.0%</span>
                </div>
                <input type="range" min="80" max="99" value="95" class="w-full accent-primary cursor-pointer"/>
                <span class="text-[10px] text-on-surface-variant">Reports with confidence >= 95% skip manual review and dispatch directly.</span>
              </div>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
                  <span class="text-on-surface font-medium">Auto-detect duplicate photos via perceptual hash (pHash)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
                  <span class="text-on-surface font-medium">Strict Ward Boundary Geo-fencing (+-5m radius)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
                  <span class="text-on-surface font-medium">Auto-escalate priority to Critical when upvotes reach 30+</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
