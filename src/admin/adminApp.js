/**
 * CivicFix - Admin Command Center Application Controller
 * ES Module for Bruhat Bengaluru Mahanagara Palike (BBMP) Admin Suite
 */

import { Store } from '../services/store.js';
import { AdminViews } from './adminViews.js';

export const AdminApp = {
  currentRoute: 'overview',
  activeFilters: {
    status: 'all',
    priority: 'all',
    ward: 'all',
    search: ''
  },
  selectedTicketIds: [],
  currentModalTicket: null,

  init(containerId = 'admin-root') {
    Store.init();
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`Admin container #${containerId} not found.`);
      return;
    }

    // Bind hash change
    window.addEventListener('hashchange', () => this.handleHashRoute());

    // Initial route handling
    this.handleHashRoute();
  },

  handleHashRoute() {
    const hash = window.location.hash || '#admin';
    if (hash === '#admin/complaints' || hash === '#complaints') {
      this.currentRoute = 'complaints';
    } else if (hash === '#admin/map' || hash === '#map') {
      this.currentRoute = 'map';
    } else if (hash === '#admin/departments' || hash === '#departments') {
      this.currentRoute = 'departments';
    } else if (hash === '#admin/analytics' || hash === '#analytics') {
      this.currentRoute = 'analytics';
    } else if (hash === '#admin/settings' || hash === '#settings') {
      this.currentRoute = 'settings';
    } else if (hash === '#admin/login' || hash === '#login') {
      this.currentRoute = 'login';
    } else {
      this.currentRoute = 'overview';
    }

    this.render();
  },

  render() {
    if (!this.container) return;

    if (this.currentRoute === 'login') {
      this.container.innerHTML = AdminViews.renderLogin();
      this.bindLoginEvents();
      return;
    }

    const complaints = Store.getComplaints();
    const metrics = Store.getAdminStats();

    let mainContentHtml = '';
    let headerTitle = 'Central Command Dashboard';
    let headerSubtitle = 'Municipal Urban Governance Hub';

    if (this.currentRoute === 'complaints') {
      headerTitle = 'Complaint Management Matrix';
      headerSubtitle = 'Live Municipal Triage & Crew Dispatch';
      const filtered = this.getFilteredComplaints(complaints);
      mainContentHtml = AdminViews.renderComplaints(filtered, this.activeFilters, this.selectedTicketIds);
    } else if (this.currentRoute === 'map') {
      headerTitle = 'Municipal Issue GIS Spatial Command';
      headerSubtitle = 'Real-time GPS Incident Clustering & Fleet Telemetry';
      mainContentHtml = AdminViews.renderMap(complaints);
    } else if (this.currentRoute === 'departments') {
      headerTitle = 'Departments & Fleet Command';
      headerSubtitle = 'Municipal Workforce Allocation & Heavy Machinery Telemetry';
      mainContentHtml = AdminViews.renderDepartments(complaints);
    } else if (this.currentRoute === 'analytics') {
      headerTitle = 'Municipal Performance Analytics';
      headerSubtitle = 'Resolution Velocity & Ward Health Indices';
      mainContentHtml = AdminViews.renderAnalytics(complaints, metrics);
    } else if (this.currentRoute === 'settings') {
      headerTitle = 'Central Command Settings & Governance Rules';
      headerSubtitle = 'Policy Console & SLA Threshold Configuration';
      mainContentHtml = AdminViews.renderSettings();
    } else {
      headerTitle = 'Central Command Dashboard';
      headerSubtitle = 'Bruhat Bengaluru Mahanagara Palike Operations';
      mainContentHtml = AdminViews.renderOverview(complaints, metrics);
    }

    this.container.innerHTML = `
      <div class="min-h-screen bg-surface flex">
        ${AdminViews.renderSidebar(this.currentRoute)}
        <div class="flex-1 ml-72 flex flex-col min-w-0">
          ${AdminViews.renderHeader(headerTitle, headerSubtitle)}
          <main class="flex-1 pb-12">
            ${mainContentHtml}
          </main>
        </div>
      </div>
      <div id="admin-modal-container"></div>
    `;

    if (this.currentRoute === 'map') {
      this.initLiveMap(complaints);
    }

    this.bindEvents();
  },

  initLiveMap(complaints) {
    if (typeof L === 'undefined') return;
    const mapEl = document.getElementById('admin-live-leaflet-map');
    if (!mapEl) return;

    if (this._leafletInstance) {
      try { this._leafletInstance.remove(); } catch(e) {}
    }

    const map = L.map('admin-live-leaflet-map').setView([12.9352, 77.6245], 12);
    this._leafletInstance = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'OpenStreetMap BBMP GIS'
    }).addTo(map);

    // Plot real complaints from store
    complaints.forEach(c => {
      const lat = c.lat || 12.92 + (Math.random() * 0.05);
      const lng = c.lng || 77.62 + (Math.random() * 0.05);
      const color = c.category === 'pothole' ? '#dc2626' :
                    c.category === 'garbage' ? '#f59e0b' :
                    c.category === 'streetlights' ? '#9333ea' :
                    c.category === 'water' ? '#2563eb' : '#059669';

      L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map).bindPopup(`<b>${c.id}</b>: ${c.title}<br>${c.ward || ''}`);
    });

    // Fleet markers
    const fleet = [
      { name: 'Bitumen Paver KA-01-EA-4821', lat: 12.9150, lng: 77.6400 },
      { name: 'SWM Compactor KA-03-GA-1102', lat: 12.9750, lng: 77.6420 }
    ];
    fleet.forEach(f => {
      L.circleMarker([f.lat, f.lng], {
        radius: 7,
        fillColor: '#00513b',
        color: '#a4f3d0',
        weight: 3,
        opacity: 1,
        fillOpacity: 1
      }).addTo(map).bindPopup(`<b>${f.name}</b><br>Field Crew GPS Connected`);
    });
  },

  getFilteredComplaints(list) {
    return list.filter(c => {
      // Status filter
      if (this.activeFilters.status !== 'all' && c.status !== this.activeFilters.status) {
        return false;
      }
      // Priority filter
      if (this.activeFilters.priority !== 'all') {
        if (this.activeFilters.priority === 'Urgent' && !c.priority?.includes('Urgent')) return false;
        if (this.activeFilters.priority === 'High' && !c.priority?.includes('High')) return false;
        if (this.activeFilters.priority === 'Medium' && !c.priority?.includes('Medium')) return false;
      }
      // Ward filter
      if (this.activeFilters.ward !== 'all') {
        if (!c.ward?.includes(this.activeFilters.ward)) return false;
      }
      // Search filter
      if (this.activeFilters.search.trim()) {
        const q = this.activeFilters.search.toLowerCase();
        const matches = (
          c.id?.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.ward?.toLowerCase().includes(q) ||
          c.reporter?.toLowerCase().includes(q) ||
          c.landmark?.toLowerCase().includes(q)
        );
        if (!matches) return false;
      }
      return true;
    });
  },

  bindEvents() {
    // Refresh button
    const refreshBtn = document.getElementById('admin-refresh-btn');
    if (refreshBtn) {
      refreshBtn.onclick = () => {
        refreshBtn.classList.add('animate-spin');
        setTimeout(() => {
          refreshBtn.classList.remove('animate-spin');
          this.render();
          this.showToast('Municipal incident feed synchronized with field telemetry.');
        }, 600);
      };
    }

    // Status filter buttons
    document.querySelectorAll('[data-filter-status]').forEach(btn => {
      btn.onclick = (e) => {
        this.activeFilters.status = e.currentTarget.getAttribute('data-filter-status');
        this.render();
      };
    });

    // Priority filter
    const prioritySelect = document.getElementById('filter-priority');
    if (prioritySelect) {
      prioritySelect.value = this.activeFilters.priority;
      prioritySelect.onchange = (e) => {
        this.activeFilters.priority = e.target.value;
        this.render();
      };
    }

    // Ward filter
    const wardSelect = document.getElementById('filter-ward');
    if (wardSelect) {
      wardSelect.value = this.activeFilters.ward;
      wardSelect.onchange = (e) => {
        this.activeFilters.ward = e.target.value;
        this.render();
      };
    }

    // Search input
    const searchInput = document.getElementById('admin-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.activeFilters.search = e.target.value;
        // Debounce render on search
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
          this.render();
          const renewedInput = document.getElementById('admin-search-input');
          if (renewedInput) {
            renewedInput.focus();
            renewedInput.setSelectionRange(renewedInput.value.length, renewedInput.value.length);
          }
        }, 300);
      };
    }

    // Reset filters
    const resetBtn = document.getElementById('admin-reset-filters');
    if (resetBtn) {
      resetBtn.onclick = () => {
        this.activeFilters = { status: 'all', priority: 'all', ward: 'all', search: '' };
        this.render();
      };
    }

    // Checkbox select all
    const selectAll = document.getElementById('admin-select-all');
    if (selectAll) {
      selectAll.onchange = (e) => {
        const checked = e.target.checked;
        const allFiltered = this.getFilteredComplaints(Store.getComplaints());
        this.selectedTicketIds = checked ? allFiltered.map(c => c.id) : [];
        this.render();
      };
    }

    // Checkbox individual
    document.querySelectorAll('[data-ticket-check]').forEach(cb => {
      cb.onchange = (e) => {
        const id = e.target.getAttribute('data-ticket-check');
        if (e.target.checked) {
          if (!this.selectedTicketIds.includes(id)) this.selectedTicketIds.push(id);
        } else {
          this.selectedTicketIds = this.selectedTicketIds.filter(x => x !== id);
        }
        this.render();
      };
    });

    // Bulk resolve button
    const bulkResolveBtn = document.getElementById('admin-bulk-resolve-btn');
    if (bulkResolveBtn) {
      bulkResolveBtn.onclick = () => {
        if (this.selectedTicketIds.length === 0) return;
        Store.bulkUpdateStatus(this.selectedTicketIds, 'Resolved');
        const count = this.selectedTicketIds.length;
        this.selectedTicketIds = [];
        this.render();
        this.showToast(`Successfully marked ${count} complaints as Resolved.`);
      };
    }

    // Row status selector change
    document.querySelectorAll('[data-status-select]').forEach(sel => {
      sel.onchange = (e) => {
        const id = e.target.getAttribute('data-status-select');
        const newStatus = e.target.value;
        Store.updateComplaintStatus(id, newStatus, 'Status changed via Central Command table.');
        this.showToast(`Ticket #${id} updated to ${newStatus}.`);
        this.render();
      };
    });

    // Quick Inspect modal buttons
    document.querySelectorAll('[data-quick-view]').forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.getAttribute('data-quick-view');
        const complaint = Store.getComplaintById(id);
        if (complaint) {
          this.openModal(complaint);
        }
      };
    });

    // Export CSV button
    const exportBtn = document.getElementById('admin-export-csv');
    if (exportBtn) {
      exportBtn.onclick = () => this.exportCsv();
    }

    // GIS Map zoom buttons
    const zoomHsr = document.getElementById('gis-zoom-hsr');
    if (zoomHsr && this._leafletInstance) {
      zoomHsr.onclick = () => this._leafletInstance.flyTo([12.9121, 77.6446], 14);
    }
    const zoomBellandur = document.getElementById('gis-zoom-bellandur');
    if (zoomBellandur && this._leafletInstance) {
      zoomBellandur.onclick = () => this._leafletInstance.flyTo([12.9260, 77.6762], 14);
    }

    // Dispatch emergency unit button
    const dispatchBtn = document.getElementById('dispatch-emergency-unit-btn');
    if (dispatchBtn) {
      dispatchBtn.onclick = () => {
        this.showToast('Emergency Crew KA-01-EA-4821 dispatched with hot-mix bitumen.');
      };
    }

    // Save settings button
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) {
      saveSettingsBtn.onclick = () => {
        this.showToast('Central Command SLA rules and AI confidence settings saved.');
      };
    }
  },

  openModal(complaint) {
    const modalContainer = document.getElementById('admin-modal-container');
    if (!modalContainer) return;
    modalContainer.innerHTML = AdminViews.renderDetailModal(complaint);

    // Close button
    const closeBtn = document.getElementById('admin-modal-close');
    const backdrop = document.getElementById('admin-modal-backdrop');
    const closeModal = () => { modalContainer.innerHTML = ''; };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) closeModal();
      };
    }

    // Modal apply status
    const saveBtn = document.getElementById('modal-save-status-btn');
    const statusSel = document.getElementById('modal-status-select');
    if (saveBtn && statusSel) {
      saveBtn.onclick = () => {
        const newStatus = statusSel.value;
        Store.updateComplaintStatus(complaint.id, newStatus, 'Updated via Administrator inspection drawer.');
        closeModal();
        this.showToast(`Ticket #${complaint.id} status updated to ${newStatus}.`);
        this.render();
      };
    }
  },

  bindLoginEvents() {
    const form = document.getElementById('admin-login-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        window.location.hash = '#admin';
      };
    }

    const prefillBtn = document.getElementById('admin-demo-prefill');
    if (prefillBtn) {
      prefillBtn.onclick = () => {
        document.getElementById('admin-login-email').value = 'priya.n@bbmp.gov.in';
        document.getElementById('admin-login-password').value = 'bbmp_command_2026';
        this.showToast('Credentials filled. Signing in...');
        setTimeout(() => {
          window.location.hash = '#admin';
        }, 500);
      };
    }
  },

  exportCsv() {
    const list = this.getFilteredComplaints(Store.getComplaints());
    const headers = ['Ticket ID', 'Title', 'Category', 'Ward', 'Status', 'Priority', 'Reporter', 'Engineer', 'Timestamp'];
    const rows = list.map(c => [
      `"${c.id}"`,
      `"${(c.title || '').replace(/"/g, '""')}"`,
      `"${c.categoryLabel || c.category}"`,
      `"${(c.ward || '').replace(/"/g, '""')}"`,
      `"${c.status}"`,
      `"${c.priority || ''}"`,
      `"${c.reporter || ''}"`,
      `"${c.engineer || ''}"`,
      `"${c.timestamp || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BBMP_Complaints_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast(`Exported ${list.length} records to CSV.`);
  },

  showToast(msg) {
    let toast = document.getElementById('admin-live-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'admin-live-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-on-surface text-surface text-xs font-semibold shadow-lg flex items-center gap-2 transform transition-all duration-300 opacity-0 translate-y-2 pointer-events-none';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="material-symbols-outlined text-[18px] text-primary-fixed">info</span><span>${msg}</span>`;
    toast.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
    }, 2800);
  }
};

// Global access
if (typeof window !== 'undefined') {
  window.AdminApp = AdminApp;
}
