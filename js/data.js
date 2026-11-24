/**
 * CivicFix - Seed Data & Configurations
 * Municipal Portal for BBMP (Bruhat Bengaluru Mahanagara Palike)
 */

const CIVIC_CATEGORIES = [
  {
    id: 'pothole',
    name: 'Potholes & Road Damage',
    icon: 'crisis_alert',
    dept: 'BBMP Road Infrastructure Dept',
    slaHours: 48,
    priority: 'High Priority (Traffic Hazard)'
  },
  {
    id: 'garbage',
    name: 'Garbage & Waste',
    icon: 'delete_sweep',
    dept: 'Solid Waste Management (SWM)',
    slaHours: 24,
    priority: 'Medium Priority'
  },
  {
    id: 'streetlights',
    name: 'Broken Streetlights',
    icon: 'light',
    dept: 'BESCOM Electrical Division',
    slaHours: 48,
    priority: 'Medium Priority'
  },
  {
    id: 'water',
    name: 'Water Leakage',
    icon: 'water_drop',
    dept: 'BWSSB Rapid Response Unit',
    slaHours: 24,
    priority: 'High Priority'
  },
  {
    id: 'drainage',
    name: 'Drainage Problems',
    icon: 'water_damage',
    dept: 'Stormwater Drain (SWD) Cell',
    slaHours: 36,
    priority: 'High Priority'
  },
  {
    id: 'other',
    name: 'Other Civic Issues',
    icon: 'build_circle',
    dept: 'Ward Public Works Cell',
    slaHours: 72,
    priority: 'Normal'
  }
];

const INITIAL_USER = {
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@gmail.com',
  ward: 'Ward 174, HSR Layout, Bengaluru',
  wardNumber: '174',
  pincode: '560102',
  zone: 'BBMP South Zone',
  karmaPoints: 240,
  level: 'Level 3 Civic Contributor',
  nextLevel: 'Civic Champion',
  pointsToNext: 60,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgneWTVDhAgQ7IOLqv-e606SeDyxPQfq8EX_DHv8A61T36mRdP30GoBp71jI-bSDRg9m4ROkrwp5hUTfvxRmFGVOMDKtifOHO5gIfzAThtXftPmNlKU6l4Xpk-HCS0YM2N3oW-dQUG3ROOdilgWbpFg8AOnXBj14euKZ-QV2xTj4yd6-UO_J_GVHCAnXSHvOCLd8uXac7SAO9x740wB3vRwd1ENCq4xRR2yMFZVpn8',
  verified: true
};

const INITIAL_COMPLAINTS = [
  {
    id: 'CF-2026-00124',
    title: 'Severe Pothole on 19th Main Road',
    category: 'pothole',
    categoryLabel: 'Potholes & Road Damage',
    description: 'Deep dangerous pothole roughly 2 feet wide right in the middle of 19th Main Road, opposite BDA Complex. Vehicles are swerving into oncoming traffic to avoid it.',
    priority: 'High Priority',
    priorityColor: 'error',
    status: 'In Progress',
    statusStep: 3, // 1: Registered, 2: AI Triage, 3: Crew Dispatched, 4: Verified
    timestamp: '24 Oct 2026, 09:42 AM IST',
    dateShort: '24 Oct 2026',
    timeShort: '09:42 AM',
    assignedDept: 'BBMP Ward 174 Roads Maintenance Unit',
    assignedCrew: 'BBMP Road Infrastructure Crew #4',
    crewVehicle: 'KA-01-EA-4821 (Asphalt Paver)',
    engineer: 'Er. R. Venkatesh (Assistant Executive Engineer)',
    slaTarget: '48 Hours Resolution',
    slaReview: 'Review within 4 hrs • Target fix: 48 hrs',
    slaRemaining: 'Expected fix today • 11:30 AM arrival',
    locationAddress: 'Opposite BDA Complex, 19th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
    landmark: 'Opposite BDA Complex',
    ward: 'Ward 174 (HSR Layout) • BBMP South Zone',
    lat: 12.9121,
    lng: 77.6446,
    accuracy: '±3m Accuracy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM5QQ7SpQIGphNqy1gBxvuA23Fdg-EzzIR-Q7L4E1L9dwkeEsq3IUfcdk1ZHNDzipaFmb3z_JTasgzJvknfGC-5Gm6PjNv9J9RLopNPr1_0D6Pzph9xS6iRz_9QKP30XYF-Vg8pzSUi5EpXcqMEqvmprq60t1z1xRLzTET33iQTjtX2X3Yul4vI2rM9lPxh6UsVhTM1Vr3kVhKAgwR-520U14xF-iQhIRRIIE4mHyy',
    aiConfidence: '98.4%',
    aiRouting: 'BBMP Ward Road Cell',
    upvotes: 42,
    hasUpvoted: false,
    reporter: 'Rahul Sharma',
    anonymous: false,
    feedbackRating: null,
    timeline: [
      { step: 1, title: 'Complaint Registered', desc: 'Validated via GPS Geotag & Ward geo-fencing', time: '24 Oct, 09:42 AM', done: true },
      { step: 2, title: 'AI Duplicate & Severity Check', desc: 'Assessing photo depth, road typology & duplicate reports', time: '24 Oct, 09:45 AM', done: true },
      { step: 3, title: 'Municipal Engineer Dispatch', desc: 'Field Crew #4 en route with hot-mix bitumen dispatch', time: '24 Oct, 10:15 AM', done: true, active: true },
      { step: 4, title: 'Field Crew Repair & Photo Proof', desc: 'Before/After inspection report published', time: 'Pending completion', done: false }
    ],
    comments: [
      { author: 'BBMP Desk Control', role: 'Official', text: 'Work order #WO-174-889 issued to HSR Division maintenance unit.', time: '10:00 AM' },
      { author: 'Ananya S. (Ward 174 Resident)', role: 'Neighbor', text: 'I drive through here daily, thank you for reporting! Two 2-wheelers slipped yesterday.', time: '10:20 AM' }
    ]
  },
  {
    id: 'CF-2026-00118',
    title: 'Unattended Waste Accumulation',
    category: 'garbage',
    categoryLabel: 'Garbage & Waste',
    description: 'Urban garbage container overflowing with dry waste and cardboard by metro station viaduct. Foul smell spreading toward pedestrian walkway.',
    priority: 'Medium Priority',
    priorityColor: 'secondary',
    status: 'Pending Review',
    statusStep: 1,
    timestamp: '22 Oct 2026, 04:15 PM IST',
    dateShort: '22 Oct 2026',
    timeShort: '04:15 PM',
    assignedDept: 'Solid Waste Management (SWM)',
    assignedCrew: 'SWM Indiranagar Rapid Compactor',
    crewVehicle: 'KA-03-GA-1102',
    engineer: 'Supervisor K. Nanjappa',
    slaTarget: '24 Hours Resolution',
    slaReview: 'Review within 2 hrs • Target fix: 24 hrs',
    slaRemaining: 'Awaiting Supervisor Sign-off',
    locationAddress: 'Near Indiranagar Metro Station Pillar 42, Bengaluru 560038',
    landmark: 'Metro Pillar 42',
    ward: 'Ward 112 (Indiranagar) • BBMP East Zone',
    lat: 12.9784,
    lng: 77.6408,
    accuracy: '±5m Accuracy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNM9qcCqu8hll9LEg32TJCBpFgb_ajYmou4C_YDfT5WIpw8ta0kMQ2lDDElYIj2_JTKXck3P6mFuQK3fGQ_pYa05qjY67GlV-NFxgTJ1v00YrWRVGpbHNOa2-Y38gGKi3ztURtx_Jzke-nUH7-ShIbXZu-QCRb1I4l1kgrrjtOibzoDEnVRELri8DrS9vPiZrUTrNN8aEYykJ3vBeAoB3GXMwy1otRR2LC2PtQrIJS',
    aiConfidence: '96.2%',
    aiRouting: 'Solid Waste Division',
    upvotes: 18,
    hasUpvoted: false,
    reporter: 'Rahul Sharma',
    anonymous: false,
    feedbackRating: null,
    timeline: [
      { step: 1, title: 'Complaint Registered', desc: 'Logged via CivicFix citizen mobile desk', time: '22 Oct, 04:15 PM', done: true, active: true },
      { step: 2, title: 'AI Duplicate & Severity Check', desc: 'Waste density and classification validated', time: 'Pending', done: false },
      { step: 3, title: 'Sanitation Truck Dispatch', desc: 'Compactor vehicle scheduled for route', time: 'Pending', done: false },
      { step: 4, title: 'Clearing & Sanitization Proof', desc: 'Spot cleared and bleached report', time: 'Pending', done: false }
    ],
    comments: [
      { author: 'BBMP Triage', role: 'Official', text: 'Routed to East Zone SWM supervisor.', time: '04:20 PM' }
    ]
  },
  {
    id: 'CF-2026-00095',
    title: 'Damaged Streetlight Pole #42',
    category: 'streetlights',
    categoryLabel: 'Broken Streetlights',
    description: 'Refurbished municipal modern LED streetlight pole standing clean against dusk sky over an urban street, showing loose hanging wiring at base.',
    priority: 'High Priority',
    priorityColor: 'error',
    status: 'Resolved',
    statusStep: 4,
    timestamp: '18 Oct 2026, 11:20 AM IST',
    dateShort: '18 Oct 2026',
    timeShort: '11:20 AM',
    assignedDept: 'BESCOM Koramangala Sub-division',
    assignedCrew: 'BESCOM Electrical Maintenance Unit #2',
    crewVehicle: 'KA-05-MD-9014',
    engineer: 'Line Inspector Suresh Babu',
    slaTarget: '48 Hours Resolution',
    slaReview: 'Resolved in 28 hours (SLA Met)',
    slaRemaining: 'Fixed & Verified by BESCOM',
    locationAddress: '5th Block, Koramangala, Bengaluru 560095',
    landmark: 'Near 5th Block Park Corner',
    ward: 'Ward 151 (Koramangala) • BBMP South Zone',
    lat: 12.9352,
    lng: 77.6245,
    accuracy: '±2m Accuracy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_vmr4HDxqeZx2vd9wDatWmKuRA47ap5JE_t2iw-B27n6GKFzJIIDlJCCvrV9kQgBfIL0sM1Z6w8zNrjM-P70LkjKij6L047MV3Wl0zhlGSmaXpWtneqyTR7Ohb5RspeuFVZf1PI6ZT6wMrLBPln_gFltdJCOTG8brtumkeCmq7_srcOlm10TXaRafPLmZ_ikS5QPpiZiEhngloEm9xCoCs3hhioCNiPKJdyzwwfC',
    aiConfidence: '99.1%',
    aiRouting: 'BESCOM South Ward',
    upvotes: 29,
    hasUpvoted: true,
    reporter: 'Rahul Sharma',
    anonymous: false,
    feedbackRating: 5,
    timeline: [
      { step: 1, title: 'Complaint Registered', desc: 'Registered with photo proof', time: '18 Oct, 11:20 AM', done: true },
      { step: 2, title: 'AI Triage & Electrical Hazard Tag', desc: 'Hazard tagged: Exposed low-voltage wiring', time: '18 Oct, 11:25 AM', done: true },
      { step: 3, title: 'BESCOM Linesmen Dispatch', desc: 'Repair crew assigned work ticket #BES-4412', time: '18 Oct, 02:00 PM', done: true },
      { step: 4, title: 'Issue Resolved & Verification', desc: 'Wiring secured and LED illumination restored', time: '19 Oct, 03:20 PM', done: true, active: false }
    ],
    comments: [
      { author: 'BESCOM Desk', role: 'Official', text: 'Pole #42 replaced connector junction box and restored light.', time: '19 Oct, 03:30 PM' },
      { author: 'Rahul Sharma', role: 'Citizen Reporter', text: 'Verified last night, bright and safe now. Thank you team!', time: '19 Oct, 08:45 PM' }
    ]
  },
  {
    id: 'CF-2026-00088',
    title: 'Drinking Water Pipeline Leakage',
    category: 'water',
    categoryLabel: 'Water Leakage',
    description: 'Clear potable drinking water pooling cleanly beside a curbed pedestrian pavement along busy tech corridor road.',
    priority: 'High Priority',
    priorityColor: 'error',
    status: 'Pending Review',
    statusStep: 1,
    timestamp: '15 Oct 2026, 02:48 PM IST',
    dateShort: '15 Oct 2026',
    timeShort: '02:48 PM',
    assignedDept: 'BWSSB Rapid Response Unit',
    assignedCrew: 'BWSSB Pipeline Crew Whitefield',
    crewVehicle: 'KA-53-E-3392',
    engineer: 'Assistant Engineer Mohan Kumar',
    slaTarget: '24 Hours Resolution',
    slaReview: 'Review within 2 hrs • Target fix: 24 hrs',
    slaRemaining: 'Target SLA: 24 hrs • Under Assessment',
    locationAddress: 'Whitefield Main Road, Near ITPL, Bengaluru 560066',
    landmark: 'Opposite ITPL Gate 2',
    ward: 'Ward 84 (Whitefield) • BBMP Mahadevapura Zone',
    lat: 12.9856,
    lng: 77.7289,
    accuracy: '±4m Accuracy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPlyJ9tI7njt_l7hqYH17HBs5GU7JXIECSa1WjlkaYWSHt5BFTD_sNieJjbeowDA0z3XVJS9C-es7KubioeplSm67BZFIvW2z0Q6c9mbqqWXwFG3f7Si-ILQzAfq_lkDuTOOyFXtN2Jfm5EBbbFOdDm_0cEul9uu9tpq-JuVae8Lg1A1MJK-wMXC822einCWQ5-0JJhmA71eSrkmciFjWmSHEBxWX9AdU-UFOQD8Cw',
    aiConfidence: '97.5%',
    aiRouting: 'BWSSB Pipeline Division',
    upvotes: 35,
    hasUpvoted: false,
    reporter: 'Rahul Sharma',
    anonymous: false,
    feedbackRating: null,
    timeline: [
      { step: 1, title: 'Complaint Registered', desc: 'Geotagged complaint lodged', time: '15 Oct, 02:48 PM', done: true, active: true },
      { step: 2, title: 'AI Duplicate & Pressure Assessment', desc: 'Mains line branch identified', time: 'Pending', done: false },
      { step: 3, title: 'Valve Isolation & Excavation Crew', desc: 'Joint inspection scheduled', time: 'Pending', done: false },
      { step: 4, title: 'Pipe Repair & Pressure Test', desc: 'Repair completion verification', time: 'Pending', done: false }
    ],
    comments: [
      { author: 'BWSSB Control', role: 'Official', text: 'Sub-divisional engineer alerted for valve isolation.', time: '03:15 PM' }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'dispatch',
    badge: 'Dispatch Alert',
    badgeColor: 'secondary-container',
    timeAgo: '25 mins ago',
    title: 'Field Crew #4 Dispatched',
    message: 'Field Crew #4 has been dispatched to your complaint #CF-2026-00124 (Severe Pothole on 19th Main Road). Expected arrival at 11:30 AM.',
    targetId: 'CF-2026-00124',
    read: false,
    icon: 'engineering',
    iconBg: 'bg-primary-fixed text-on-primary-fixed',
    footerText: 'BBMP Road Infrastructure Dept',
    actionText: 'Track Crew Live'
  },
  {
    id: 'notif-2',
    type: 'upvote',
    badge: 'Trending in Ward',
    badgeColor: 'surface-container-high',
    timeAgo: '1 hour ago',
    title: 'Community Upvote Milestone Reached',
    message: '42 neighbors in Sector 2 upvoted your pothole report! Priority automatically elevated by BBMP Triage to High Urgent.',
    targetId: 'CF-2026-00124',
    read: false,
    icon: 'thumb_up',
    iconBg: 'bg-secondary-fixed text-on-secondary-fixed',
    footerText: '+15 Karma Points credited',
    actionText: 'View Neighborhood Board'
  },
  {
    id: 'notif-3',
    type: 'triage',
    badge: 'Assigned',
    badgeColor: 'surface-container-low',
    timeAgo: 'Yesterday, 04:15 PM',
    title: 'Municipal Review Complete',
    message: 'Your complaint #CF-2026-00118 (Garbage Accumulation) was verified on-site by Assistant Engineer R. Venkatesh.',
    targetId: 'CF-2026-00118',
    read: false,
    icon: 'assignment_turned_in',
    iconBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    footerText: 'Solid Waste Management Division',
    actionText: 'View Inspection Note'
  },
  {
    id: 'notif-4',
    type: 'resolved',
    badge: 'Resolved',
    badgeColor: 'surface-container',
    timeAgo: '18 Oct 2026',
    title: 'Issue Resolved & Streetlight Repaired',
    message: 'Streetlight Pole #42 on 5th Block has been repaired and verified by BESCOM electrical linesmen. Please provide your feedback.',
    targetId: 'CF-2026-00095',
    read: true,
    icon: 'check_circle',
    iconBg: 'bg-surface-container text-primary',
    footerText: 'Ticket Closed',
    actionText: 'Rate Fix'
  }
];

const BANGALORE_LANDMARKS = [
  { name: '19th Main Rd, Sector 2, HSR Layout', ward: 'Ward 174', zone: 'BBMP South', lat: 12.9121, lng: 77.6446 },
  { name: 'Indiranagar 100ft Road, Near Metro', ward: 'Ward 112', zone: 'BBMP East', lat: 12.9784, lng: 77.6408 },
  { name: '5th Block, Koramangala', ward: 'Ward 151', zone: 'BBMP South', lat: 12.9352, lng: 77.6245 },
  { name: 'Whitefield Main Road, Near ITPL', ward: 'Ward 84', zone: 'BBMP Mahadevapura', lat: 12.9856, lng: 77.7289 },
  { name: '4th Block, Jayanagar', ward: 'Ward 153', zone: 'BBMP South', lat: 12.9299, lng: 77.5824 },
  { name: 'BTM 2nd Stage, Outer Ring Road', ward: 'Ward 176', zone: 'BBMP South', lat: 12.9166, lng: 77.6101 },
  { name: 'Sampige Road, Malleshwaram', ward: 'Ward 45', zone: 'BBMP West', lat: 13.0031, lng: 77.5701 },
  { name: 'MG Road Metro Boulevard', ward: 'Ward 111', zone: 'BBMP East', lat: 12.9756, lng: 77.6066 }
];
