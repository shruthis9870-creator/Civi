/**
 * CivicFix - Main Application Bootstrap
 * ES Module Entry Point for Modern Web Development
 */

import { Store } from './services/store.js';
import { MapService } from './services/mapService.js';
import { Router } from './router.js';
import { CIVIC_CATEGORIES, INITIAL_COMPLAINTS } from './data/civicData.js';

export const App = {
  router: null,
  currentViewData: {},
  activeFilter: 'all',
  searchQuery: '',
  sortBy: 'newest',

  init() {
    Store.init();

    // Check device simulator mode
    const savedMode = localStorage.getItem(Store.KEYS.DEVICE_MODE);
    if (savedMode === 'full') {
      document.body.classList.remove('device-frame-active');
      const toggleBtn = document.getElementById('device-toggle-btn');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">smartphone</span><span>Mobile View</span>';
      }
    } else {
      document.body.classList.add('device-frame-active');
    }

    // Configure SPA Router
    this.router = new Router({
      '#/': () => this.showLanding(),
      '#/landing': () => this.showLanding(),
      '#/login': () => this.showLogin(),
      '#/my-complaints': () => this.showMyComplaints(),
      '#/report/step1': () => this.showReportStep1(),
      '#/report/step2': () => this.showReportStep2(),
      '#/report/step3': () => this.showReportStep3(),
      '#/report/success/:id': (id) => this.showSuccess(id),
      '#/complaint/:id': (id) => this.showComplaintTracking(id),
      '#/profile': () => this.showProfile('profile'),
      '#/notifications': () => this.showProfile('notifs')
    });

    // Start router
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      this.router.handleRoute();
    }
  },

  navigate(hash) {
    if (hash && (hash.startsWith('admin.html') || hash.startsWith('#/admin') || hash.startsWith('#admin'))) {
      const target = hash.startsWith('admin.html') ? hash : `admin.html${hash.replace('#/', '#')}`;
      window.location.href = target;
      return;
    }
    if (this.router) {
      this.router.navigate(hash);
    } else {
      window.location.hash = hash;
    }
  },

  // ================= VIEW: WELCOME & LANDING =================
  showLanding() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-landing');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;
  },

  // ================= VIEW: CITIZEN LOGIN & REGISTRATION =================
  showLogin() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-login');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;
  },

  // ================= VIEW: MY COMPLAINTS =================
  showMyComplaints() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-my-complaints');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    this.renderComplaintsList();
    this.updateComplaintsStats();
  },

  renderComplaintsList() {
    const listEl = document.getElementById('complaints-list-container');
    if (!listEl) return;

    const all = Store.getComplaints();
    let filtered = [...all];

    if (this.activeFilter === 'pending') {
      filtered = filtered.filter(c => c.status === 'Pending Review');
    } else if (this.activeFilter === 'in_progress') {
      filtered = filtered.filter(c => c.status === 'In Progress');
    } else if (this.activeFilter === 'resolved') {
      filtered = filtered.filter(c => c.status === 'Resolved');
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        (c.locationAddress && c.locationAddress.toLowerCase().includes(q)) ||
        (c.ward && c.ward.toLowerCase().includes(q))
      );
    }

    if (this.sortBy === 'upvotes') {
      filtered.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center bg-surface-container-lowest rounded-xl shadow-sm flex flex-col items-center gap-2">
          <span class="material-symbols-outlined text-[36px] text-outline">search_off</span>
          <p class="font-title-md text-on-surface font-semibold">No complaints found</p>
          <p class="font-body-sm text-on-surface-variant">Try adjusting your search terms or filter selection.</p>
          <button onclick="App.activeFilter='all'; App.searchQuery=''; App.renderComplaintsList();" class="mt-2 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-label-md">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map(c => {
      let statusBadge = '';
      if (c.status === 'In Progress') {
        statusBadge = `
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
            In Progress
          </span>
        `;
      } else if (c.status === 'Resolved') {
        statusBadge = `
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
            <span class="material-symbols-outlined text-[13px]">check</span>
            Resolved
          </span>
        `;
      } else {
        statusBadge = `
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Pending Review
          </span>
        `;
      }

      const priorityBadge = `
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${c.priority.includes('High') ? 'bg-error-container/60 text-error' : 'bg-surface-container text-on-surface-variant'} font-label-sm text-label-sm font-semibold">
          ${c.priority.includes('High') ? '<span class="material-symbols-outlined text-[12px]">priority_high</span>' : ''}
          ${c.priority}
        </span>
      `;

      return `
        <article class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm transition-all hover:shadow-md cursor-pointer" onclick="App.navigate('#/complaint/${c.id}')">
          <div class="flex items-start justify-between gap-space-sm">
            <div class="flex items-center gap-space-xs flex-wrap">
              ${statusBadge}
              ${priorityBadge}
            </div>
            <span class="font-label-sm text-label-sm font-mono text-outline shrink-0">#${c.id}</span>
          </div>

          <div class="flex gap-space-sm">
            <img class="w-20 h-20 rounded-lg object-cover shrink-0 bg-surface-container" src="${c.imageUrl}" alt="${c.title}" onerror="this.src='https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=200&q=80'"/>
            <div class="flex flex-col min-w-0 justify-center">
              <h2 class="font-title-md text-title-md text-on-surface truncate">${c.title}</h2>
              <div class="flex items-center gap-1 text-on-surface-variant mt-1">
                <span class="material-symbols-outlined text-[16px] text-outline shrink-0">location_on</span>
                <span class="font-body-sm text-body-sm truncate">${c.locationAddress}</span>
              </div>
              <div class="flex items-center gap-1 text-outline mt-0.5">
                <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                <span class="font-label-sm text-label-sm">${c.timestamp || c.dateShort}</span>
              </div>
            </div>
          </div>

          <div class="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="font-label-sm text-label-sm font-semibold text-secondary flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">engineering</span>
                ${c.assignedCrew || c.assignedDept}
              </span>
              <span class="font-label-sm text-label-sm text-on-surface-variant font-medium">SLA: On Time</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${c.slaRemaining || 'Automated triage completed'}</p>
            <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div class="bg-secondary h-full rounded-full" style="width: ${c.status === 'Resolved' ? '100%' : (c.status === 'In Progress' ? '66%' : '33%')};"></div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <div class="flex items-center gap-1.5 text-tertiary">
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span class="font-label-sm text-label-sm font-semibold">AI Triage ${c.aiConfidence || '98%'} Match</span>
            </div>
            <button class="inline-flex items-center gap-1 text-primary font-title-md text-title-md font-semibold hover:text-primary-container transition-colors" onclick="event.stopPropagation(); App.navigate('#/complaint/${c.id}')">
              <span>View Details</span>
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </article>
      `;
    }).join('');
  },

  updateComplaintsStats() {
    const list = Store.getComplaints();
    const totalEl = document.getElementById('stat-total');
    const activeEl = document.getElementById('stat-active');
    const resolvedEl = document.getElementById('stat-resolved');

    if (totalEl) totalEl.innerText = String(list.length).padStart(2, '0');
    if (activeEl) {
      const activeCount = list.filter(c => c.status !== 'Resolved').length;
      activeEl.innerText = String(activeCount).padStart(2, '0');
    }
    if (resolvedEl) {
      const resCount = list.filter(c => c.status === 'Resolved').length;
      resolvedEl.innerText = String(resCount).padStart(2, '0');
    }
  },

  setFilter(filterName, btn) {
    this.activeFilter = filterName;
    const parent = btn.parentElement;
    if (parent) {
      parent.querySelectorAll('button').forEach(b => {
        b.className = "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-md text-label-md shadow-sm transition-colors";
      });
      btn.className = "flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-sm";
    }
    this.renderComplaintsList();
  },

  toggleSort() {
    this.sortBy = this.sortBy === 'newest' ? 'upvotes' : 'newest';
    const label = document.getElementById('sort-label');
    if (label) {
      label.innerText = this.sortBy === 'newest' ? 'Sort: Newest First' : 'Sort: Most Upvoted';
    }
    this.renderComplaintsList();
  },

  // ================= VIEW: STEP 1 - ISSUE DETAILS =================
  showReportStep1() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-report-step1');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const draft = Store.getDraftReport();
    const titleInput = document.getElementById('complaint-title');
    const descInput = document.getElementById('issue-description');
    const counter = document.getElementById('char-counter');

    if (titleInput && draft.title) titleInput.value = draft.title;
    if (descInput && draft.description) {
      descInput.value = draft.description;
      if (counter) counter.innerText = `${draft.description.length} / 500`;
    }

    this.initCategorySelection(draft.category || 'pothole');
  },

  initCategorySelection(activeCat) {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if (cat === activeCat) {
        card.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        card.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
        const iconBox = card.querySelector('.icon-box');
        if (iconBox) iconBox.className = 'icon-box w-8 h-8 rounded-lg bg-on-primary/15 flex items-center justify-center text-on-primary';
        const check = card.querySelector('.checkmark');
        if (check) check.classList.remove('hidden');
      }

      card.addEventListener('click', () => {
        cards.forEach(c => {
          c.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
          c.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
          const ib = c.querySelector('.icon-box');
          if (ib) ib.className = 'icon-box w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary';
          const ck = c.querySelector('.checkmark');
          if (ck) ck.classList.add('hidden');
        });

        card.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
        card.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
        const activeIb = card.querySelector('.icon-box');
        if (activeIb) activeIb.className = 'icon-box w-8 h-8 rounded-lg bg-on-primary/15 flex items-center justify-center text-on-primary';
        const activeCk = card.querySelector('.checkmark');
        if (activeCk) activeCk.classList.remove('hidden');

        const catId = card.getAttribute('data-category');
        const catObj = CIVIC_CATEGORIES.find(x => x.id === catId);
        Store.saveDraftReport({
          category: catId,
          categoryLabel: catObj ? catObj.name : 'Civic Issue'
        });
      });
    });
  },

  handlePhotoUpload(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImg = document.getElementById('preview-image-elem');
      const previewCard = document.getElementById('media-preview');
      const filenameElem = document.getElementById('preview-filename');

      if (previewImg) previewImg.src = e.target.result;
      if (filenameElem) filenameElem.innerText = file.name;
      if (previewCard) previewCard.classList.remove('hidden');

      Store.saveDraftReport({
        imageUrl: e.target.result,
        imageName: file.name
      });
      App.showToast('Photo evidence attached with EXIF metadata!');
    };
    reader.readAsDataURL(file);
  },

  submitStep1() {
    const titleInput = document.getElementById('complaint-title');
    const descInput = document.getElementById('issue-description');

    if (!titleInput.value.trim()) {
      App.showToast('Please enter a complaint title');
      titleInput.focus();
      return;
    }

    Store.saveDraftReport({
      title: titleInput.value.trim(),
      description: descInput.value.trim()
    });

    this.navigate('#/report/step2');
  },

  // ================= VIEW: STEP 2 - LOCATION =================
  showReportStep2() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-report-step2');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const draft = Store.getDraftReport();
    const addressInput = document.getElementById('addressInput');
    if (addressInput && draft.locationAddress) {
      addressInput.value = draft.locationAddress;
    }

    setTimeout(() => {
      MapService.initPicker('location-map-container', {
        lat: draft.lat || 12.9121,
        lng: draft.lng || 77.6446,
        onUpdate: (loc) => {
          this.updateLocationFields(loc);
        }
      });
    }, 100);
  },

  updateLocationFields(loc) {
    const addrInput = document.getElementById('addressInput');
    const titleEl = document.getElementById('loc-card-title');
    const roadEl = document.getElementById('loc-card-road');
    const wardChip = document.getElementById('loc-ward-chip');
    const coordsEl = document.getElementById('loc-coords-chip');

    if (addrInput) addrInput.value = loc.address;
    if (titleEl) titleEl.innerText = loc.landmark;
    if (roadEl) roadEl.innerText = loc.address;
    if (wardChip) wardChip.innerText = `${loc.ward}`;
    if (coordsEl) coordsEl.innerText = `${loc.lat.toFixed(4)}° N, ${loc.lng.toFixed(4)}° E`;

    Store.saveDraftReport({
      lat: loc.lat,
      lng: loc.lng,
      locationAddress: loc.address,
      landmark: loc.landmark,
      ward: loc.ward,
      wardNumber: loc.wardNumber
    });
  },

  handleLocationSearch(term) {
    if (!term) return;
    const match = window.BANGALORE_LANDMARKS?.find(l => 
      l.name.toLowerCase().includes(term.toLowerCase()) || 
      l.ward.toLowerCase().includes(term.toLowerCase())
    );
    if (match) {
      if (MapService.pickerMarker && MapService.currentPickerMap) {
        MapService.pickerMarker.setLatLng([match.lat, match.lng]);
        MapService.currentPickerMap.setView([match.lat, match.lng], 16);
      }
      MapService.onLocationChanged(match.lat, match.lng, (loc) => {
        this.updateLocationFields(loc);
      });
      App.showToast(`Found: ${match.name}`);
    }
  },

  submitStep2() {
    const confirmBtn = document.getElementById('confirmLocationBtn');
    if (confirmBtn) {
      confirmBtn.innerHTML = `
        <span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
        <span>Validating GPS Geofence...</span>
      `;
    }
    setTimeout(() => {
      this.navigate('#/report/step3');
    }, 600);
  },

  // ================= VIEW: STEP 3 - REVIEW & SUBMIT =================
  showReportStep3() {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-report-step3');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const draft = Store.getDraftReport();
    const user = Store.getUser();

    const catLabelEl = document.getElementById('review-category-label');
    const titleEl = document.getElementById('review-title');
    const descEl = document.getElementById('review-desc');
    const imageEl = document.getElementById('review-image');
    const addrEl = document.getElementById('review-address');
    const wardEl = document.getElementById('review-ward');
    const coordsEl = document.getElementById('review-coords');
    const reporterNameEl = document.getElementById('review-reporter-name');
    const reporterPhoneEl = document.getElementById('review-reporter-phone');

    if (catLabelEl) catLabelEl.innerText = draft.categoryLabel || 'Potholes & Road Damage';
    if (titleEl) titleEl.innerText = draft.title || 'Civic infrastructure repair request';
    if (descEl) descEl.innerText = draft.description || 'Reported civic issue on public road.';
    if (imageEl && draft.imageUrl) imageEl.src = draft.imageUrl;
    if (addrEl) addrEl.innerText = draft.locationAddress || '19th Main Road, Sector 2, HSR Layout, Bengaluru';
    if (wardEl) wardEl.innerText = draft.ward || 'Ward 174 (HSR Layout) • BBMP South Zone';
    if (coordsEl) coordsEl.innerText = `${(draft.lat || 12.9121).toFixed(4)}° N, ${(draft.lng || 77.6446).toFixed(4)}° E`;
    if (reporterNameEl) reporterNameEl.innerText = user.name;
    if (reporterPhoneEl) reporterPhoneEl.innerText = user.phone;
  },

  submitFinalComplaint() {
    const btn = document.getElementById('submitComplaintBtn');
    const anonToggle = document.getElementById('anonToggle');
    const isAnon = anonToggle ? anonToggle.checked : false;

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Dispatching Ticket to Ward 174...</span>
      `;
    }

    setTimeout(() => {
      const draft = Store.getDraftReport();
      draft.anonymous = isAnon;
      const created = Store.createComplaint(draft);
      Store.clearDraftReport();

      if (btn) {
        btn.classList.remove('bg-primary');
        btn.classList.add('bg-tertiary-container');
        btn.innerHTML = `
          <span class="material-symbols-outlined text-[24px]">task_alt</span>
          <span>Dispatched • #${created.id}</span>
        `;
      }

      setTimeout(() => {
        this.navigate(`#/report/success/${created.id}`);
      }, 700);
    }, 1200);
  },

  // ================= VIEW: SUBMISSION SUCCESS =================
  showSuccess(ticketId) {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-success');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const complaint = Store.getComplaintById(ticketId) || INITIAL_COMPLAINTS[0];
    const ticketIdElem = document.getElementById('success-ticket-id');
    const catElem = document.getElementById('success-cat');
    const timeElem = document.getElementById('success-time');
    const unitElem = document.getElementById('success-unit');
    const shareBtn = document.getElementById('success-share-btn');
    const trackBtn = document.getElementById('success-track-btn');

    if (ticketIdElem) ticketIdElem.innerText = `#${complaint.id}`;
    if (catElem) catElem.innerText = complaint.categoryLabel;
    if (timeElem) timeElem.innerText = complaint.timestamp || complaint.dateShort;
    if (unitElem) unitElem.innerText = complaint.assignedDept;

    if (shareBtn) {
      shareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey neighbors, I have logged a civic repair request (Ticket #${complaint.id}) with BBMP Ward 174. Track or upvote it on CivicFix!`)}`;
    }
    if (trackBtn) {
      trackBtn.onclick = () => this.navigate(`#/complaint/${complaint.id}`);
    }
  },

  // ================= VIEW: COMPLAINT DETAILS & TRACKING =================
  showComplaintTracking(ticketId) {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-tracking');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const complaint = Store.getComplaintById(ticketId) || INITIAL_COMPLAINTS[0];
    this.currentViewData.complaint = complaint;

    const idEl = document.getElementById('track-ticket-id');
    const titleEl = document.getElementById('track-title');
    const descEl = document.getElementById('track-desc');
    const catEl = document.getElementById('track-cat');
    const timeEl = document.getElementById('track-time');
    const addrEl = document.getElementById('track-address');
    const wardEl = document.getElementById('track-ward');
    const imgEl = document.getElementById('track-image');
    const upvoteCount = document.getElementById('track-upvote-count');
    const upvoteBtn = document.getElementById('track-upvote-btn');
    const crewName = document.getElementById('track-crew-name');
    const crewVeh = document.getElementById('track-crew-veh');

    if (idEl) idEl.innerText = `#${complaint.id}`;
    if (titleEl) titleEl.innerText = complaint.title;
    if (descEl) descEl.innerText = complaint.description;
    if (catEl) catEl.innerText = complaint.categoryLabel;
    if (timeEl) timeEl.innerText = `Registered ${complaint.timestamp}`;
    if (addrEl) addrEl.innerText = complaint.locationAddress;
    if (wardEl) wardEl.innerText = `${complaint.ward} • ${complaint.lat.toFixed(4)}° N, ${complaint.lng.toFixed(4)}° E`;
    if (imgEl) imgEl.src = complaint.imageUrl;
    if (upvoteCount) upvoteCount.innerText = complaint.upvotes || 0;
    if (crewName) crewName.innerText = complaint.assignedCrew || complaint.assignedDept;
    if (crewVeh) crewVeh.innerText = `Vehicle: ${complaint.crewVehicle || 'KA-01-EA-4821'} • ${complaint.engineer || 'Supervisor In Charge'}`;

    if (upvoteBtn && complaint.hasUpvoted) {
      upvoteBtn.className = "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-semibold transition-all active:scale-95 shadow-sm";
    }

    setTimeout(() => {
      MapService.initTrackingMap('tracking-map-canvas', complaint);
    }, 100);
  },

  handleTrackingUpvote() {
    const c = this.currentViewData.complaint;
    if (!c) return;
    const updated = Store.upvoteComplaint(c.id);
    const countEl = document.getElementById('track-upvote-count');
    const btn = document.getElementById('track-upvote-btn');
    if (countEl) countEl.innerText = updated.upvotes;
    if (btn) {
      if (updated.hasUpvoted) {
        btn.className = "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-semibold transition-all active:scale-95 shadow-sm";
        App.showToast('Upvoted! Priority escalated with Ward desk (+5 Karma)');
      } else {
        btn.className = "flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low text-primary font-title-md text-title-md font-semibold hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-sm";
      }
    }
  },

  addTrackingComment() {
    const input = document.getElementById('track-comment-input');
    if (!input || !input.value.trim()) return;
    const c = this.currentViewData.complaint;
    if (!c) return;

    Store.addComment(c.id, input.value.trim());
    App.showToast('Note added to the municipal ticket log');
    input.value = '';
    this.showComplaintTracking(c.id);
  },

  // ================= VIEW: PROFILE & NOTIFICATIONS =================
  showProfile(subTab = 'profile') {
    const container = document.getElementById('view-container');
    const template = document.getElementById('template-profile');
    if (!container || !template) return;
    container.innerHTML = template.innerHTML;

    const user = Store.getUser();
    const complaints = Store.getComplaints();

    const nameEl = document.getElementById('user-name');
    const emailEl = document.getElementById('user-email');
    const karmaEl = document.getElementById('user-karma');
    const levelEl = document.getElementById('user-level');
    const nextLevelEl = document.getElementById('user-next-level');
    const karmaProgress = document.getElementById('user-karma-progress');

    if (nameEl) nameEl.innerText = user.name;
    if (emailEl) emailEl.innerText = `${user.phone} • ${user.email}`;
    if (karmaEl) karmaEl.innerText = `${user.karmaPoints} Karma Points earned`;
    if (levelEl) levelEl.innerText = user.level;
    if (nextLevelEl) nextLevelEl.innerHTML = `Next tier: <strong class="text-on-surface">${user.nextLevel}</strong>`;
    if (karmaProgress) {
      const pct = Math.min(100, Math.round((user.karmaPoints / 300) * 100));
      karmaProgress.style.width = `${pct}%`;
    }

    const totalFiled = document.getElementById('profile-total-filed');
    const totalRes = document.getElementById('profile-total-resolved');
    if (totalFiled) totalFiled.innerText = complaints.length;
    if (totalRes) totalRes.innerText = complaints.filter(c => c.status === 'Resolved').length;

    this.switchCivicTab(subTab);
  },

  switchCivicTab(tab) {
    const profileView = document.getElementById('view-profile-section');
    const notifsView = document.getElementById('view-notifs-section');
    const profileBtn = document.getElementById('tab-profile-btn');
    const notifsBtn = document.getElementById('tab-notifs-btn');

    if (!profileView || !notifsView) return;

    if (tab === 'profile') {
      profileView.classList.remove('hidden');
      profileView.classList.add('flex');
      notifsView.classList.add('hidden');
      notifsView.classList.remove('flex');

      if (profileBtn) profileBtn.className = "px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm font-semibold transition-all flex items-center gap-1.5";
      if (notifsBtn) notifsBtn.className = "px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5 relative";
    } else {
      notifsView.classList.remove('hidden');
      notifsView.classList.add('flex');
      profileView.classList.add('hidden');
      profileView.classList.remove('flex');

      if (notifsBtn) notifsBtn.className = "px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm font-semibold transition-all flex items-center gap-1.5 relative";
      if (profileBtn) profileBtn.className = "px-space-md py-1.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all flex items-center gap-1.5";
    }
  },

  markAllNotificationsAsRead() {
    Store.markAllNotificationsRead();
    const items = document.querySelectorAll('.notif-item');
    items.forEach(item => {
      item.classList.remove('border-l-4', 'border-primary');
      item.classList.add('opacity-90');
    });
    const dots = document.querySelectorAll('.notif-dot');
    dots.forEach(dot => dot.remove());

    const badge = document.getElementById('unread-counter-badge');
    if (badge) {
      badge.textContent = '0 Unread';
      badge.className = 'px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium';
    }

    const headerDot = document.querySelector('#tab-notifs-btn .bg-error');
    if (headerDot) headerDot.remove();

    App.showToast('All notifications marked as read');
  },

  toggleDeviceFrame() {
    const isFrameActive = document.body.classList.toggle('device-frame-active');
    localStorage.setItem(Store.KEYS.DEVICE_MODE, isFrameActive ? 'mobile' : 'full');
    const toggleBtn = document.getElementById('device-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = isFrameActive ? 
        '<span class="material-symbols-outlined text-[18px]">fullscreen</span><span>Full View</span>' : 
        '<span class="material-symbols-outlined text-[18px]">smartphone</span><span>Mobile View</span>';
    }
  },

  resetDemoData() {
    if (confirm('Reset CivicFix demo data to default state?')) {
      localStorage.clear();
      Store.init();
      App.showToast('Demo data restored to defaults!');
      App.navigate('#/');
    }
  },

  copyTicketId(id) {
    const text = id || 'CF-2026-00124';
    navigator.clipboard.writeText(text).then(() => {
      App.showToast(`Copied Ticket ID: ${text}`);
    }).catch(() => {
      App.showToast(`Ticket ID: ${text}`);
    });
  },

  showToast(msg) {
    const banner = document.getElementById('global-toast');
    const message = document.getElementById('global-toast-message');
    if (!banner || !message) return;

    message.textContent = msg;
    banner.classList.remove('translate-y-32', 'opacity-0');
    banner.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      banner.classList.remove('translate-y-0', 'opacity-100');
      banner.classList.add('translate-y-32', 'opacity-0');
    }, 3200);
  }
};

// Global Helpers for inline template callbacks
window.App = App;
window.CivicStore = Store;
window.CivicMap = MapService;

window.switchAuthMode = function(mode) {
  const tabSignIn = document.getElementById('tab-signin');
  const tabRegister = document.getElementById('tab-register');
  const secSignIn = document.getElementById('section-signin');
  const secRegister = document.getElementById('section-register');
  if (!tabSignIn || !tabRegister || !secSignIn || !secRegister) return;

  if (mode === 'signin') {
    tabSignIn.className = 'flex-1 py-space-sm rounded-lg font-title-md text-title-md text-center transition-all duration-200 bg-surface-container-lowest text-primary shadow-sm font-semibold flex items-center justify-center gap-1';
    tabRegister.className = 'flex-1 py-space-sm rounded-lg font-title-md text-title-md text-center transition-all duration-200 text-on-surface-variant hover:text-on-surface font-medium flex items-center justify-center gap-1';
    secSignIn.classList.remove('hidden');
    secRegister.classList.add('hidden');
  } else {
    tabRegister.className = 'flex-1 py-space-sm rounded-lg font-title-md text-title-md text-center transition-all duration-200 bg-surface-container-lowest text-primary shadow-sm font-semibold flex items-center justify-center gap-1';
    tabSignIn.className = 'flex-1 py-space-sm rounded-lg font-title-md text-title-md text-center transition-all duration-200 text-on-surface-variant hover:text-on-surface font-medium flex items-center justify-center gap-1';
    secSignIn.classList.add('hidden');
    secRegister.classList.remove('hidden');
  }
};

window.togglePasswordVisibility = function(fieldId, btnElement) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const icon = btnElement.querySelector('.material-symbols-outlined');
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = 'visibility';
  }
};

window.triggerOtpFlow = function() {
  const sheet = document.getElementById('otp-sheet');
  if (sheet) {
    sheet.classList.remove('hidden');
    sheet.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  App.showToast('Secure OTP sent to linked Aadhaar mobile (+91 ******450)');
};

window.showToast = function(msg) {
  App.showToast(msg);
};

// Auto-boot on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
