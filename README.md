# CivicFix (Civi) — Urban Governance & Smart Municipal Action Platform

A modern civic-tech platform connecting urban citizens with local municipal authorities (**Bruhat Bengaluru Mahanagara Palike - BBMP**). CivicFix empowers residents to snap photos of civic hazards, automatically geo-tag locations with pinpoint precision, route issues through automated AI triage to relevant municipal departments, and track field crew repairs in real-time under guaranteed Service Level Agreements (SLA).

---

## 🌟 Key Features

1. **AI-Assisted Issue Reporting (3-Step Flow)**:
   - **Step 1: Details & Evidence**: AI Vision classification with 98% accuracy match, category selection (Roads & Potholes, Solid Waste, Broken Streetlights, Water Leakage, Drainage), description with live character count, and camera/gallery photo upload with EXIF metadata tagging.
   - **Step 2: Precision Location Pin**: Interactive map with street/landmark search across Bengaluru wards, draggable pinpoint anchor, ±3m accuracy calculation, and one-tap GPS *"Locate Me"* detection.
   - **Step 3: Review & Citizen Certification**: Summary confirmation card, automated routing preview to BBMP departmental cells, anonymous posting toggle, and official Section 134 Karnataka Municipal Corporations Act compliance disclaimer.

2. **Real-time Live Dispatch & SLA Tracking**:
   - **4-Stage Resolution Journey**:
     1. Complaint Registered (GPS geotag & geofence validated)
     2. AI Duplicate & Severity Check (Assessing photo depth & road typology)
     3. Municipal Engineer Dispatch (Field crew paver / compactor en route with vehicle registration & ETA)
     4. Resolution & Verified Photo Proof (Citizen rating & before/after inspection)
   - **Live Vehicle Radar**: Interactive tracking map showing field crew vehicle movement en route from the municipal depot.

3. **Community Backing & Citizen Karma**:
   - **Neighborhood Upvoting**: Residents upvote local reports to escalate urgency to *High Urgent* on the municipal dashboard.
   - **Social Alerting**: One-click sharing to WhatsApp neighborhood groups with customized ticket reference links.
   - **Civic Karma Progression**: Earn points (+20 for reporting, +5 for upvoting, +10 for feedback) and level up from *Level 3 Contributor* to *Civic Champion*.

4. **Municipal Governance & Notifications**:
   - Active Ward Zone tracking (Ward 174 HSR Layout, Ward 112 Indiranagar, Ward 151 Koramangala, Ward 84 Whitefield).
   - Real-time notification center for crew dispatch alerts, inspection notes, and ticket closure.

---

## 📁 Source Code & Project Structure

The project follows a standard modern frontend web architecture with all source code organized inside `src/`:

```
Civi/
├── index.html                           # Root HTML entry point loading ./src/main.js
├── server.js                            # Zero-dependency local Node.js development server
├── package.json                         # NPM project scripts
├── README.md                            # Documentation & user guide
│
└── src/                                 # 📂 Application Source Code
    ├── main.js                          # Application bootstrap & entry point
    ├── router.js                        # Client-side hash router
    │
    ├── styles/                          # 🎨 Style Assets
    │   └── main.css                     # Brand styling, animations & device simulator frame
    │
    ├── data/                            # 📊 Seed Data & Wards
    │   └── civicData.js                 # Categories, Bangalore landmarks & complaints data
    │
    ├── services/                        # ⚙️ Core Application Services
    │   ├── store.js                     # LocalStorage state persistence (complaints, karma, notifs)
    │   └── mapService.js                # Leaflet map service, draggable pins & vehicle radar
    │
    ├── components/                      # 🧩 Reusable Components
    │   ├── Header.js                    # Top municipal navigation bar
    │   ├── BottomNav.js                 # Persistent bottom app navigation
    │   └── Toast.js                     # Global toast notifications
    │
    ├── views/                           # 📱 Views & Template Modules
    │   └── index.js                     # Views export index
    │
    └── screens/                         # 🖥️ Standalone HTML Prototype Screens
        ├── 01-welcome-landing.html      # Hero banner, stats, how it works & get started
        ├── 02-submission-success.html   # Ticket receipt (#CF-2026-00124) & SLA stepper
        ├── 03-review-submit-step3.html  # Review summary & BBMP dispatch trigger
        ├── 04-my-complaints.html        # Complaint list with search, tabs & sort
        ├── 05-citizen-login.html        # Citizen Sign In, Register & Aadhaar OTP modal
        ├── 06-report-details-step1.html # Category picker, description & camera upload
        ├── 07-report-location-step2.html# Map pin dropper & address autocomplete
        ├── 08-profile-notifications.html# Citizen profile, Karma points & notification center
        └── 09-complaint-details-tracking.html # Live tracking map & crew vehicle radar
```

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch
Simply double-click [`index.html`](file:///c:/Users/shrut/OneDrive/Desktop/web%20dev/Student-project/Civi/index.html) in your file explorer to open it directly in Chrome, Edge, Safari, or Firefox.

### Option 2: Using the Included Node Server
```bash
npm start
# or
node server.js
```
Then navigate to: **`http://localhost:3000`**

---

## 📱 Presentation & Evaluation Tools

When viewing `index.html` on a desktop monitor, a top floating control bar is available:
- **Screen Dropdown**: Instantly jump to any of the 10 screen views for live demonstrations.
- **Toggle View Button**: Switch between **Mobile Simulator Frame** (sleek smartphone bezel with status bar) and **Full Responsive View**.
- **Reset Demo Button**: Resets the `localStorage` state back to clean default demo data.

---

## 🛠️ Tech Stack & Design System

- **Architecture**: Modular ES6+ JavaScript (`src/main.js`, `src/services/`, `src/data/`, `src/router.js`).
- **Styling**: Tailwind CSS (Material Design 3 semantic color tokens with `#00513b` primary forest green, `#effdf3` organic surface, and `#48607d` secondary slate).
- **Typography**: Google Fonts Inter.
- **Icons**: Google Material Symbols Outlined.
- **Maps**: Leaflet.js with OpenStreetMap tiles, custom SVG markers, and GPS Geolocation API.
- **State Persistence**: Browser `localStorage` for offline complaint creation, upvoting, and karma points.
