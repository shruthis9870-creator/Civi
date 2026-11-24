/**
 * CivicFix - LocalStorage State Store Service
 */

import { INITIAL_COMPLAINTS, INITIAL_USER, INITIAL_NOTIFICATIONS, CIVIC_CATEGORIES } from '../data/civicData.js';

export const Store = {
  KEYS: {
    COMPLAINTS: 'civicfix_complaints_v1',
    USER: 'civicfix_user_v1',
    NOTIFS: 'civicfix_notifs_v1',
    DRAFT: 'civicfix_draft_report_v1',
    DEVICE_MODE: 'civicfix_device_mode'
  },

  init() {
    if (!localStorage.getItem(this.KEYS.COMPLAINTS)) {
      localStorage.setItem(this.KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
    }
    if (!localStorage.getItem(this.KEYS.USER)) {
      localStorage.setItem(this.KEYS.USER, JSON.stringify(INITIAL_USER));
    }
    if (!localStorage.getItem(this.KEYS.NOTIFS)) {
      localStorage.setItem(this.KEYS.NOTIFS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
  },

  getComplaints() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.COMPLAINTS)) || INITIAL_COMPLAINTS;
    } catch (e) {
      return INITIAL_COMPLAINTS;
    }
  },

  getComplaintById(id) {
    const list = this.getComplaints();
    return list.find(c => c.id === id || c.id === `#${id}` || `#${c.id}` === id);
  },

  saveComplaints(list) {
    localStorage.setItem(this.KEYS.COMPLAINTS, JSON.stringify(list));
  },

  getUser() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.USER)) || INITIAL_USER;
    } catch (e) {
      return INITIAL_USER;
    }
  },

  saveUser(user) {
    localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
  },

  addKarmaPoints(pts) {
    const user = this.getUser();
    user.karmaPoints = (user.karmaPoints || 0) + pts;
    if (user.karmaPoints >= 300) {
      user.level = 'Civic Champion';
      user.nextLevel = 'Ward Council Lead';
      user.pointsToNext = Math.max(0, 500 - user.karmaPoints);
    } else {
      user.pointsToNext = Math.max(0, 300 - user.karmaPoints);
    }
    this.saveUser(user);
    return user;
  },

  getNotifications() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.NOTIFS)) || INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  },

  saveNotifications(notifs) {
    localStorage.setItem(this.KEYS.NOTIFS, JSON.stringify(notifs));
  },

  markAllNotificationsRead() {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    this.saveNotifications(notifs);
    return notifs;
  },

  getUnreadNotifsCount() {
    return this.getNotifications().filter(n => !n.read).length;
  },

  getDraftReport() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.DRAFT)) || {
        title: 'Deep dangerous pothole near 5th Block junction',
        category: 'pothole',
        categoryLabel: 'Potholes & Road Damage',
        description: 'Deep pothole roughly 2 feet wide right in the middle of 19th Main Road, opposite BDA Complex. Vehicles are swerving into oncoming traffic to avoid it.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoOJ2yv1B80Uo_JJWtcx0E9BRq4ZmjlCq_bF9lQRhcMSV-2RTd44qO1U7iMjl3rhOJ0UlWxdnpa5q0li2nwgZzGB8iTJL-d19Wl0d23nnPwUz_onZr8vQO6z8yZ3zLDQPHk3W2Go89NOFiWaS-VSCJ9CyuU4cNCFyWqWhQqSX4Q-zh2m8Mq_22dFkbWaQDTxOAiPyCu0bkBhuA1d2rf7IM9ONSZo8x4UG-kmQNzjbS',
        imageName: 'pothole_19th_main.jpg',
        locationAddress: 'Opposite BDA Complex, 19th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
        landmark: 'Opposite BDA Complex',
        ward: 'Ward 174 (HSR Layout) • BBMP South Zone',
        wardNumber: '174',
        lat: 12.9121,
        lng: 77.6446,
        anonymous: false
      };
    } catch (e) {
      return {};
    }
  },

  saveDraftReport(data) {
    const current = this.getDraftReport();
    localStorage.setItem(this.KEYS.DRAFT, JSON.stringify({ ...current, ...data }));
  },

  clearDraftReport() {
    localStorage.removeItem(this.KEYS.DRAFT);
  },

  createComplaint(draft) {
    const list = this.getComplaints();
    const nextNum = 125 + list.length - 4;
    const ticketId = `CF-2026-${String(nextNum).padStart(5, '0')}`;

    const catObj = CIVIC_CATEGORIES.find(c => c.id === draft.category) || CIVIC_CATEGORIES[0];
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' +
                    now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST';
    const dateShort = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeShort = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newComplaint = {
      id: ticketId,
      title: draft.title || 'Civic infrastructure repair request',
      category: draft.category || 'pothole',
      categoryLabel: catObj.name,
      description: draft.description || '',
      priority: catObj.priority || 'High Priority',
      priorityColor: 'error',
      status: 'In Progress',
      statusStep: 2,
      timestamp: timeStr,
      dateShort: dateShort,
      timeShort: timeShort,
      assignedDept: catObj.dept,
      assignedCrew: `BBMP ${catObj.name} Response Unit`,
      crewVehicle: 'KA-01-EQ-9104',
      engineer: 'Assigned to Ward Junior Engineer',
      slaTarget: `${catObj.slaHours} Hours Resolution`,
      slaReview: `Review within 4 hrs • Target fix: ${catObj.slaHours} hrs`,
      slaRemaining: 'Automated triage completed • Inspection scheduled',
      locationAddress: draft.locationAddress || '19th Main Road, Sector 2, HSR Layout, Bengaluru',
      landmark: draft.landmark || 'HSR Sector 2',
      ward: draft.ward || 'Ward 174 (HSR Layout) • BBMP South Zone',
      lat: draft.lat || 12.9121,
      lng: draft.lng || 77.6446,
      accuracy: '±3m Accuracy',
      imageUrl: draft.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoOJ2yv1B80Uo_JJWtcx0E9BRq4ZmjlCq_bF9lQRhcMSV-2RTd44qO1U7iMjl3rhOJ0UlWxdnpa5q0li2nwgZzGB8iTJL-d19Wl0d23nnPwUz_onZr8vQO6z8yZ3zLDQPHk3W2Go89NOFiWaS-VSCJ9CyuU4cNCFyWqWhQqSX4Q-zh2m8Mq_22dFkbWaQDTxOAiPyCu0bkBhuA1d2rf7IM9ONSZo8x4UG-kmQNzjbS',
      aiConfidence: '98.4%',
      aiRouting: catObj.dept,
      upvotes: 1,
      hasUpvoted: true,
      reporter: draft.anonymous ? 'Anonymous Resident' : (this.getUser().name || 'Rahul Sharma'),
      anonymous: Boolean(draft.anonymous),
      feedbackRating: null,
      timeline: [
        { step: 1, title: 'Complaint Registered', desc: 'Validated via GPS Geotag & Ward geo-fencing', time: timeShort, done: true },
        { step: 2, title: 'AI Duplicate & Severity Check', desc: 'Assessing photo depth, road typology & duplicate reports', time: 'Active', done: true, active: true },
        { step: 3, title: 'Municipal Engineer Dispatch', desc: 'Sub-divisional officer assigns work order', time: 'Pending', done: false },
        { step: 4, title: 'Field Crew Repair & Photo Proof', desc: 'Before/After inspection report published', time: 'Pending', done: false }
      ],
      comments: [
        { author: 'CivicFix System', role: 'Automated Triage', text: `Registered under Ticket #${ticketId}. Assigned SLA: ${catObj.slaHours} hrs.`, time: timeShort }
      ]
    };

    list.unshift(newComplaint);
    this.saveComplaints(list);
    this.addKarmaPoints(20);

    const notifs = this.getNotifications();
    notifs.unshift({
      id: `notif-${Date.now()}`,
      type: 'triage',
      badge: 'Ticket Registered',
      badgeColor: 'primary-container text-on-primary',
      timeAgo: 'Just now',
      title: `Complaint Registered #${ticketId}`,
      message: `Your complaint for "${newComplaint.title}" is queued with ${newComplaint.assignedDept}.`,
      targetId: ticketId,
      read: false,
      icon: 'receipt_long',
      iconBg: 'bg-primary text-on-primary',
      footerText: 'Ward Triage Active',
      actionText: 'View Ticket'
    });
    this.saveNotifications(notifs);

    return newComplaint;
  },

  upvoteComplaint(id) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (!item) return null;

    if (!item.hasUpvoted) {
      item.upvotes = (item.upvotes || 0) + 1;
      item.hasUpvoted = true;
      this.addKarmaPoints(5);
    } else {
      item.upvotes = Math.max(0, (item.upvotes || 1) - 1);
      item.hasUpvoted = false;
    }
    this.saveComplaints(list);
    return item;
  },

  rateComplaint(id, rating) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (!item) return null;
    item.feedbackRating = rating;
    this.addKarmaPoints(10);
    this.saveComplaints(list);
    return item;
  },

  addComment(id, text) {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id);
    if (!item) return null;
    if (!item.comments) item.comments = [];
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    item.comments.push({
      author: this.getUser().name || 'Rahul Sharma',
      role: 'Resident',
      text: text,
      time: timeStr
    });
    this.saveComplaints(list);
    return item;
  },

  // ================= ADMIN COMMAND CENTER SERVICES =================
  updateComplaintStatus(id, newStatus, remarks = '') {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id || `#${c.id}` === id || c.id === `#${id}`);
    if (!item) return null;

    item.status = newStatus;
    const now = new Date();
    const timeShort = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (newStatus === 'Resolved') {
      item.statusStep = 4;
      item.slaRemaining = 'Resolved by BBMP Crew';
      if (item.timeline && item.timeline[3]) {
        item.timeline[3].done = true;
        item.timeline[3].time = `Resolved • ${timeShort}`;
      }
    } else if (newStatus === 'In Progress') {
      item.statusStep = 3;
      item.slaRemaining = 'Work order active • Crew on site';
      if (item.timeline && item.timeline[2]) {
        item.timeline[2].done = true;
        item.timeline[2].active = true;
      }
    } else if (newStatus === 'Pending Review') {
      item.statusStep = 1;
      item.slaRemaining = 'Awaiting Engineer Sign-off';
    }

    if (remarks) {
      if (!item.comments) item.comments = [];
      item.comments.push({
        author: 'Er. Priya N. (Chief Municipal Eng.)',
        role: 'BBMP Central Command',
        text: `Status updated to ${newStatus}. Note: ${remarks}`,
        time: timeShort
      });
    }

    this.saveComplaints(list);

    // Create notification for citizen
    const notifs = this.getNotifications();
    notifs.unshift({
      id: `notif-${Date.now()}`,
      type: newStatus === 'Resolved' ? 'resolved' : 'dispatch',
      badge: `Status: ${newStatus}`,
      badgeColor: newStatus === 'Resolved' ? 'primary-container text-on-primary' : 'secondary-container',
      timeAgo: 'Just now',
      title: `Ticket #${item.id} is now ${newStatus}`,
      message: `BBMP Central Command updated ticket "${item.title}". ${remarks || 'Field team updated the status.'}`,
      targetId: item.id,
      read: false,
      icon: newStatus === 'Resolved' ? 'check_circle' : 'engineering',
      iconBg: newStatus === 'Resolved' ? 'bg-primary text-on-primary' : 'bg-primary-fixed text-on-primary-fixed',
      footerText: 'BBMP Municipal Governance',
      actionText: 'View Tracking'
    });
    this.saveNotifications(notifs);

    return item;
  },

  assignDepartment(id, dept, engineer, crewVehicle = '') {
    const list = this.getComplaints();
    const item = list.find(c => c.id === id || `#${c.id}` === id || c.id === `#${id}`);
    if (!item) return null;

    if (dept) item.assignedDept = dept;
    if (engineer) item.engineer = engineer;
    if (crewVehicle) item.crewVehicle = crewVehicle;

    item.status = 'In Progress';
    item.statusStep = 3;

    const now = new Date();
    const timeShort = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (!item.comments) item.comments = [];
    item.comments.push({
      author: 'BBMP Central Command',
      role: 'Official',
      text: `Work order dispatched to ${dept}. Assigned Engineer: ${engineer || 'Field Officer'}.`,
      time: timeShort
    });

    this.saveComplaints(list);
    return item;
  },

  bulkUpdateStatus(ids, newStatus) {
    const list = this.getComplaints();
    const updatedCount = 0;
    const cleanIds = ids.map(id => id.replace(/^#/, ''));

    list.forEach(item => {
      const bareId = item.id.replace(/^#/, '');
      if (cleanIds.includes(bareId)) {
        item.status = newStatus;
        if (newStatus === 'Resolved') item.statusStep = 4;
        if (newStatus === 'In Progress') item.statusStep = 3;
      }
    });

    this.saveComplaints(list);
    return list;
  },

  getAdminStats() {
    const list = this.getComplaints();
    const total = list.length;
    const pending = list.filter(c => c.status === 'Pending Review').length;
    const inProgress = list.filter(c => c.status === 'In Progress').length;
    const resolved = list.filter(c => c.status === 'Resolved').length;
    const escalated = list.filter(c => c.status === 'Escalated' || c.priority?.includes('Urgent')).length;

    // Categories breakdown
    const byCategory = {
      pothole: list.filter(c => c.category === 'pothole').length,
      garbage: list.filter(c => c.category === 'garbage').length,
      streetlights: list.filter(c => c.category === 'streetlights').length,
      water: list.filter(c => c.category === 'water').length,
      drainage: list.filter(c => c.category === 'drainage').length,
      other: list.filter(c => c.category === 'other' || !['pothole', 'garbage', 'streetlights', 'water', 'drainage'].includes(c.category)).length
    };

    // Calculate dynamic SLA compliance
    const slaCompliance = total > 0 ? Math.round(((resolved + inProgress * 0.9) / total) * 100 * 10) / 10 : 94.2;

    return {
      total,
      pending,
      inProgress,
      resolved,
      escalated,
      slaCompliance: Math.min(100, Math.max(88, slaCompliance)),
      meanTimeToDispatch: '42 mins',
      avgResolutionHours: '18.4 hrs',
      byCategory
    };
  },

  resetComplaints() {
    localStorage.setItem(this.KEYS.COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
    return INITIAL_COMPLAINTS;
  }
};

if (typeof window !== 'undefined') {
  window.CivicStore = Store;
  Store.init();
}
