# CivicFix (Civi) — Urban Governance & Smart Municipal Action Platform

A modern civic-tech platform connecting urban citizens with local municipal authorities (**Bruhat Bengaluru Mahanagara Palike - BBMP**). CivicFix empowers residents to snap photos of civic hazards, automatically geo-tag locations with pinpoint precision, route issues through automated AI triage to relevant municipal departments, and track field crew repairs in real-time under guaranteed Service Level Agreements (SLA).

The platform also provides a comprehensive **Admin Central Command Suite** for municipal engineers, executive officers, and ward supervisors to monitor operations, dispatch field crews, triage complaints, and review analytics.

---

## 🌟 Key Features

### 1. Citizen Portal (Mobile-First Experience)
- **AI-Assisted Issue Reporting (3-Step Flow)**:
  - **Step 1: Details & Evidence**: AI Vision classification with 98% accuracy match, category selection (Roads & Potholes, Solid Waste, Broken Streetlights, Water Leakage, Drainage), description with live character count, and camera/gallery photo upload with EXIF metadata tagging.
  - **Step 2: Precision Location Pin**: Interactive map with street/landmark search across Bengaluru wards, draggable pinpoint anchor, ±3m accuracy calculation, and one-tap GPS *"Locate Me"* detection.
  - **Step 3: Review & Citizen Certification**: Summary confirmation card, automated routing preview to BBMP departmental cells, anonymous posting toggle, and official Section 134 Karnataka Municipal Corporations Act compliance disclaimer.
- **Real-time Live Dispatch & SLA Tracking**:
  - 4-stage resolution timeline: Complaint Registered → AI Duplicate & Severity Check → Municipal Engineer Dispatch → Field Crew Repair & Photo Proof.
  - Interactive Leaflet map with simulated real-time crew vehicle radar (`KA-01-EA-4821`).
- **Community Backing & Citizen Karma**:
  - Neighborhood upvoting, WhatsApp community sharing, and karma points progression.
- **Notification Center**: Real-time alerts on ticket dispatches, ward milestones, and status changes.

### 2. BBMP Central Command (Admin Suite)
- **City Operations Overview (`admin.html#admin`)**:
  - Live KPI cards: Total Active Complaints, Pending Review, In Progress, SLA Compliance Rate (94.2%).
  - Monthly complaint trends & resolution velocity chart (June – November).
  - Distribution by Status donut chart with live percentages.
  - Recent municipal complaints feed with one-click quick inspection drawer.
- **Complaint Management Matrix (`admin.html#admin/complaints`)**:
  - Full-featured data table supporting 198 BBMP wards.
  - Multi-filter matrix: Status tabs (All, Pending Review, In Progress, Resolved), Priority filter, Ward dropdown, and live search.
  - Row-level inline status updater: change status to *Resolved* or *In Progress* directly, updating citizen tracking in real time.
  - Multi-row bulk actions: Bulk resolve selected tickets with one click.
  - Export to CSV functionality.
  - Detailed Inspection Drawer: View high-resolution citizen evidence photo, AI confidence rating, and engineer assignment notes.
- **Municipal Performance Analytics (`admin.html#admin/analytics`)**:
  - Resolution velocity statistics (18.4 hrs average resolution across departments).
  - Citizen satisfaction rating (4.8 / 5.0 ★).
  - Ward Health & Incident Density index (HSR Layout, Bellandur, Indiranagar, Koramangala, Malleshwaram).
- **Issue GIS Spatial Command & Heatmap (`admin.html#admin/map`)**:
  - Full-screen interactive Leaflet map plotting active complaints across 198 BBMP wards.
  - Color-coded category markers (Potholes, Solid Waste, Electrical, Water Mains, Drains).
  - Live GPS field crew vehicle radar (`KA-01-EA-4821`, `KA-03-GA-1102`).
  - Spatial layer toggles and one-click ward zoom controls (Ward 174 HSR, Ward 150 Bellandur).
- **Departments & Field Crew Fleet Management (`admin.html#admin/departments`)**:
  - Live workload status for 5 BBMP divisions: Road Infra, SWM, BESCOM, BWSSB, SWD.
  - Vehicle telemetry table: Registration number, machinery type, assigned engineer, current location, and ping action.
  - Emergency unit dispatch trigger.
- **Central Command Settings & Governance Rules (`admin.html#admin/settings`)**:
  - Configurable SLA resolution thresholds per category (12h to 48h).
  - AI vision confidence threshold slider (default 95% auto-triage).
  - Community upvote auto-escalation triggers.
  - Push/SMS DLT gateway and Parichay GovSSO session timeouts.
- **Administrator Secure Gateway (`admin.html#admin/login`)**:
  - Parichay / DigiLocker GovSSO badge.
  - Auto-fill demo credentials for Chief Municipal Engineer Er. Priya N.

---

## 📁 Source Code & Project Structure

All source code is cleanly organized inside `src/`:

```
Civi/
├── index.html                           # Root Citizen App entry point (loads ./src/main.js)
├── admin.html                           # Root BBMP Admin Command Center (loads ./src/admin/adminApp.js)
├── server.js                            # Zero-dependency local Node.js development server
├── package.json                         # NPM project scripts
├── README.md                            # Documentation & user guide
│
├── src/                                 # 📂 Application Source Code
│   ├── main.js                          # Citizen SPA controller & bootstrap
│   ├── router.js                        # Client-side hash router with admin redirect support
│   │
│   ├── admin/                           # 🏛️ Admin Command Center Module
│   │   ├── adminApp.js                  # Admin controller, matrix filters & bulk triage
│   │   └── adminViews.js                # ES module templates for Overview, Matrix, Analytics, Login
│   │
│   ├── styles/                          # 🎨 Style Assets
│   │   └── main.css                     # Brand styling, animations & device simulator frame
│   │
│   ├── data/                            # 📊 Seed Data & Wards
│   │   └── civicData.js                 # Categories, BBMP wards, seed complaints (#CF-00124 to #CF-00129)
│   │
│   ├── services/                        # ⚙️ Core Application Services
│   │   ├── store.js                     # LocalStorage state persistence with admin triage & bulk update
│   │   └── mapService.js                # Leaflet map service, draggable pins & vehicle radar
│   │
│   ├── components/                      # 🧩 Reusable Citizen Components
│   │   ├── Header.js                    # Top municipal navigation bar
│   │   ├── BottomNav.js                 # Persistent bottom app navigation
│   │   └── Toast.js                     # Toast notification service
│   │
│   ├── views/                           # 📄 Modular Citizen Views
│   │   └── index.js                     # View registry
│   │
│   └── screens/                         # 📱 Standalone Prototype Templates
│       ├── 01-welcome-landing.html
│       ├── 02-submission-success.html
│       ├── 03-review-submit-step3.html
│       ├── 04-my-complaints.html
│       ├── 05-citizen-login.html
│       ├── 06-report-details-step1.html
│       ├── 07-report-location-step2.html
│       ├── 08-profile-notifications.html
│       ├── 09-complaint-details-tracking.html
│       ├── 10-admin-overview.html       # Prototype: Admin Overview Dashboard
│       ├── 11-admin-login.html          # Prototype: Administrator Login
│       ├── 12-admin-analytics.html      # Prototype: Performance Analytics
│       ├── 13-admin-complaints.html     # Prototype: Complaint Management
│       ├── 14-admin-map.html            # Prototype: Issue GIS Spatial Heatmap
│       ├── 15-admin-departments.html   # Prototype: Departments & Field Crew Fleet
│       ├── 16-admin-settings.html      # Prototype: Central Command Settings & Rules
│       └── admin/                       # Named screen templates
│           ├── overview.html
│           ├── login.html
│           ├── analytics.html
│           ├── complaints.html
│           ├── map.html
│           ├── departments.html
│           └── settings.html
```

---

## 🚀 Getting Started

### Prerequisites
Node.js (v16 or higher) installed on your system.

### Running Locally
```bash
# Start the local development server
npm start
# or:
node server.js
```
Open your browser at:
- **Citizen Portal**: `http://localhost:3000/`
- **Admin Command Center**: `http://localhost:3000/admin.html`

### Quick Navigation Routes
- `#/` — Welcome & Landing Screen
- `#/report/step1` — Report Issue Step 1 (Photo & Details)
- `#/report/step2` — Report Issue Step 2 (Interactive GPS Location Pin)
- `#/report/step3` — Report Issue Step 3 (Review & Submit)
- `#/report/success/:id` — Submission Confirmation
- `#/complaint/:id` — Real-time Live Crew Tracking & Map
- `#/my-complaints` — Citizen Reported Complaints Feed
- `#/profile` — Citizen Impact & Karma Points
- `#/notifications` — Civic Notifications Center
- `admin.html#admin` — BBMP Central Command Overview
- `admin.html#admin/complaints` — Complaint Management Matrix
- `admin.html#admin/map` — Issue GIS Spatial Command & Heatmap
- `admin.html#admin/departments` — Departments & Field Crew Management
- `admin.html#admin/analytics` — Municipal Performance Analytics
- `admin.html#admin/settings` — Central Command Settings & Governance Rules
- `admin.html#admin/login` — Administrator Secure Login
- `#/notifications` — Civic Notifications Center
- `admin.html#admin` — BBMP Central Command Overview
- `admin.html#admin/complaints` — Complaint Management Matrix
- `admin.html#admin/analytics` — Municipal Performance Analytics
- `admin.html#admin/login` — Administrator Secure Login

---

## 👥 Demo Administrator Credentials
- **Role**: Chief Municipal Engineer, BBMP Central Command
- **Official Email**: `priya.n@bbmp.gov.in`
- **Password**: `bbmp_command_2026`
*(Quick auto-fill available on login screen via "Auto-Fill Chief Municipal Engineer Credentials")*
