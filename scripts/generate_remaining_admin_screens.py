"""
Script: scripts/generate_remaining_admin_screens.py
Generates the 3 remaining CivicFix BBMP Central Command screens:
14. Issue GIS Heatmap & Spatial Command (14-admin-map.html)
15. Departments & Field Crew Fleet Management (15-admin-departments.html)
16. Central Command Settings & SLA Configuration (16-admin-settings.html)
"""

import os

TAILWIND_HEAD = """<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script id="tailwind-config">
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#9be9c6",
        "tertiary-container": "#006c49",
        "outline": "#6f7973",
        "primary-container": "#176b50",
        "on-background": "#121e18",
        "on-secondary-fixed-variant": "#304864",
        "tertiary-fixed": "#89f8c3",
        "on-primary-fixed-variant": "#00513b",
        "secondary-container": "#c3dcfe",
        "error-container": "#ffdad6",
        "background": "#effdf3",
        "primary-fixed": "#a4f3d0",
        "on-surface-variant": "#3f4944",
        "surface-container": "#e4f1e7",
        "surface": "#effdf3",
        "on-secondary-fixed": "#001d37",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed-variant": "#005236",
        "outline-variant": "#bec9c2",
        "tertiary": "#005136",
        "surface-container-low": "#e9f7ed",
        "secondary-fixed": "#d2e4ff",
        "on-primary-fixed": "#002116",
        "primary-fixed-dim": "#89d6b5",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#121e18",
        "surface-container-highest": "#d8e6dc",
        "surface-variant": "#d8e6dc",
        "surface-dim": "#d0ddd4",
        "on-primary": "#ffffff",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#49617e",
        "on-error": "#ffffff",
        "primary": "#00513b",
        "surface-tint": "#176b50",
        "inverse-surface": "#27332d",
        "secondary-fixed-dim": "#b0c8ea",
        "tertiary-fixed-dim": "#6cdba8",
        "inverse-primary": "#89d6b5",
        "on-tertiary-container": "#7fedb9",
        "inverse-on-surface": "#e6f4ea",
        "error": "#ba1a1a",
        "surface-bright": "#effdf3",
        "secondary": "#48607d",
        "on-error-container": "#93000a",
        "surface-container-high": "#deece2",
        "on-tertiary-fixed": "#002113"
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
      spacing: { "space-md": "1rem", "gutter": "1.5rem", "space-xs": "0.25rem", "space-xl": "2rem", "space-sm": "0.5rem", "margin": "2rem", "space-lg": "1.5rem" },
      fontFamily: { sans: ["Inter", "sans-serif"] }
    }
  }
};
</script>
"""

def get_sidebar(active_path="map", is_named=False):
    root_link = "../../../index.html" if is_named else "../../index.html"
    overview_link = "overview.html" if is_named else "10-admin-overview.html"
    complaints_link = "complaints.html" if is_named else "13-admin-complaints.html"
    map_link = "map.html" if is_named else "14-admin-map.html"
    depts_link = "departments.html" if is_named else "15-admin-departments.html"
    analytics_link = "analytics.html" if is_named else "12-admin-analytics.html"
    settings_link = "settings.html" if is_named else "16-admin-settings.html"
    login_link = "login.html" if is_named else "11-admin-login.html"

    def link_cls(p):
        if p == active_path:
            return "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary font-semibold"
        return "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"

    return f"""
<aside class="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
  <div class="flex flex-col">
    <div class="h-16 px-gutter flex items-center gap-space-sm bg-surface-container-lowest border-b border-surface-container/50">
      <div class="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center shadow-sm">
        <span class="material-symbols-outlined text-on-primary-container text-[20px]">account_balance</span>
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-primary tracking-tight leading-tight text-base">CivicFix</span>
        <span class="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Central Command • BBMP</span>
      </div>
    </div>

    <!-- Citizen portal link -->
    <div class="p-space-sm mx-space-sm my-2 rounded-lg bg-surface-container-low border border-primary/20 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-[18px]">smartphone</span>
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-primary leading-tight">Citizen Portal</span>
          <span class="text-[10px] text-on-surface-variant">Switch to mobile app</span>
        </div>
      </div>
      <a href="{root_link}" class="px-2 py-1 rounded bg-primary text-on-primary text-[11px] font-semibold hover:bg-primary-container transition-colors">
        Open App
      </a>
    </div>

    <div class="px-space-md py-space-xs">
      <div class="text-[11px] text-on-surface-variant px-space-sm py-space-xs uppercase tracking-wider font-semibold">Municipal Operations</div>
    </div>

    <nav class="px-space-sm space-y-1">
      <a href="{overview_link}" class="{link_cls('overview')}">
        <span class="material-symbols-outlined text-[20px]">dashboard</span>
        <span class="text-sm">Overview</span>
      </a>
      <a href="{complaints_link}" class="{link_cls('complaints')}">
        <span class="material-symbols-outlined text-[20px]">assignment_late</span>
        <span class="text-sm">Complaints</span>
      </a>
      <a href="{map_link}" class="{link_cls('map')}">
        <span class="material-symbols-outlined text-[20px]">map</span>
        <span class="text-sm">Issue GIS Map</span>
        <span class="ml-auto px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Spatial</span>
      </a>
      <a href="{depts_link}" class="{link_cls('departments')}">
        <span class="material-symbols-outlined text-[20px]">groups</span>
        <span class="text-sm">Departments</span>
      </a>
      <a href="{analytics_link}" class="{link_cls('analytics')}">
        <span class="material-symbols-outlined text-[20px]">bar_chart</span>
        <span class="text-sm">Analytics</span>
      </a>
      <a href="{settings_link}" class="{link_cls('settings')}">
        <span class="material-symbols-outlined text-[20px]">settings</span>
        <span class="text-sm">Settings</span>
      </a>
    </nav>
  </div>

  <div class="p-space-sm m-space-sm rounded-xl bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-surface-container">
    <div class="flex items-center gap-space-sm">
      <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary shadow-sm">
        <span class="material-symbols-outlined text-[18px]">engineering</span>
      </div>
      <div class="flex flex-col min-w-0 flex-1">
        <span class="text-xs text-on-surface font-semibold truncate">Er. Priya N.</span>
        <span class="text-[10px] text-on-surface-variant truncate">Chief Municipal Eng.</span>
        <span class="text-[10px] text-primary font-medium truncate">BBMP Command Center</span>
      </div>
      <a href="{login_link}" class="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-colors" title="Logout">
        <span class="material-symbols-outlined text-[18px]">logout</span>
      </a>
    </div>
  </div>
</aside>
"""

def get_header(title="Central Command", subtitle="BBMP Urban Governance"):
    return f"""
<header class="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 flex items-center justify-between px-gutter shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="flex items-center gap-space-md w-full max-w-lg">
    <div class="relative w-full flex items-center">
      <span class="material-symbols-outlined absolute left-space-sm text-on-surface-variant text-[20px]">search</span>
      <input class="w-full pl-10 pr-space-md py-space-xs rounded-lg bg-surface-container-low text-xs text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all" placeholder="Search GPS coordinates, ward, road, citizen ID..." type="text">
    </div>
    <div class="hidden xl:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high text-primary whitespace-nowrap">
      <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      <span class="text-xs font-semibold">GIS Grid Live • 198 Wards Connected</span>
    </div>
  </div>
  <div class="flex items-center gap-space-md">
    <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-primary text-xs font-semibold">
      <span class="material-symbols-outlined text-[16px]">satellite_alt</span>
      <span>Live GeoTelemetry</span>
    </div>
    <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
      <span class="material-symbols-outlined text-[18px]">person</span>
    </div>
  </div>
</header>
"""

TEMPLATE_14 = """<!-- CivicFix - Municipal Issue GIS Spatial Command & Heatmap -->
__TAILWIND_HEAD__
<title>CivicFix - Municipal Issue GIS Spatial Command</title>
</head>
<body class="bg-surface font-sans text-on-surface antialiased">
__SIDEBAR__

<div class="pl-72">
__HEADER__

<main class="relative pt-16 w-full px-gutter bg-surface min-h-screen pb-12">
  <div class="flex flex-col w-full">
    <!-- Top Action Bar -->
    <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pt-space-lg pb-space-lg">
      <div class="flex flex-col space-y-1">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          <span class="text-xs uppercase tracking-wider text-primary font-bold">BBMP Spatial Intelligence</span>
          <span class="text-outline-variant">•</span>
          <span class="text-xs text-on-surface-variant">Real-time GPS Incident Clustering & Fleet Telemetry</span>
        </div>
        <h1 class="text-2xl font-bold text-on-surface tracking-tight">Municipal Issue GIS Heatmap</h1>
        <p class="text-xs text-on-surface-variant max-w-2xl">
          Visualizing active civic bottlenecks, citizen upvote density, and live field crew radar across 198 wards.
        </p>
      </div>

      <!-- Quick Layer Controls -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="inline-flex items-center gap-1 bg-surface-container-lowest px-3 py-1.5 rounded-lg border border-surface-container shadow-sm text-xs">
          <span class="material-symbols-outlined text-[16px] text-primary">layers</span>
          <select id="gis-layer-select" class="bg-transparent font-semibold text-on-surface focus:outline-none cursor-pointer">
            <option value="all">All Layers (Incidents + Fleet)</option>
            <option value="potholes">Potholes & Roads Only</option>
            <option value="waste">Solid Waste Hotspots</option>
            <option value="water">Water Mains & Drains</option>
            <option value="fleet">Field Crew Vehicles Only</option>
          </select>
        </div>

        <button onclick="zoomToZone(12.9121, 77.6446, 14)" class="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[16px] text-primary">my_location</span>
          <span>Ward 174 (HSR)</span>
        </button>

        <button onclick="zoomToZone(12.9260, 77.6762, 14)" class="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[16px] text-primary">location_city</span>
          <span>Ward 150 (Bellandur)</span>
        </button>
      </div>
    </div>

    <!-- Ward Incident Density Index (Summary Pills) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
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

    <!-- GIS Map Container -->
    <div class="relative w-full rounded-2xl overflow-hidden border border-surface-container shadow-md bg-surface-container-lowest">
      <div id="admin-gis-map" class="w-full h-[580px] z-10"></div>

      <!-- Floating Incident Legend Overlay -->
      <div class="absolute top-4 left-4 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-xl border border-surface-container shadow-lg max-w-xs text-xs space-y-2">
        <span class="font-bold text-on-surface block text-[11px] uppercase tracking-wider">Spatial Layer Legend</span>
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-600"></span>
            <span class="font-medium text-on-surface">Road Hazard / Pothole</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500"></span>
            <span class="font-medium text-on-surface">Solid Waste Accumulation</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-600"></span>
            <span class="font-medium text-on-surface">Water Pipe Main Rupture</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-purple-600"></span>
            <span class="font-medium text-on-surface">Stormwater Drain Sump</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
            <span class="font-medium text-emerald-800">Field Crew Radar (Live)</span>
          </div>
        </div>
      </div>

      <!-- Floating Fleet Radar Overlay -->
      <div class="absolute top-4 right-4 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-3.5 rounded-xl border border-surface-container shadow-lg max-w-sm text-xs hidden md:block">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-on-surface text-[11px] uppercase tracking-wider">Fleet Radar Telemetry</span>
          <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
        </div>
        <div class="space-y-2">
          <div class="p-2 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div>
              <span class="font-mono font-bold text-primary block">KA-01-EA-4821</span>
              <span class="text-[10px] text-on-surface-variant">Hot-Mix Bitumen Paver • Ward 174</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-primary text-on-primary font-bold text-[10px]">24 km/h</span>
          </div>
          <div class="p-2 rounded-lg bg-surface-container-low flex items-center justify-between">
            <div>
              <span class="font-mono font-bold text-secondary block">KA-03-GA-1102</span>
              <span class="text-[10px] text-on-surface-variant">SWM Compactor • Ward 112</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-bold text-[10px]">On-site</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</div>

<script>
var gisMap = null;
function initMap() {
  gisMap = L.map('admin-gis-map').setView([12.9352, 77.6245], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenStreetMap BBMP GIS'
  }).addTo(gisMap);

  var incidents = [
    { title: 'Severe Pothole (#CF-2026-00124)', lat: 12.9121, lng: 77.6446, color: '#dc2626', ward: 'Ward 174 HSR' },
    { title: 'Waste Dump (#CF-2026-00125)', lat: 12.9172, lng: 77.6228, color: '#f59e0b', ward: 'Ward 176 BTM' },
    { title: 'Exposed Cable (#CF-2026-00126)', lat: 12.9784, lng: 77.6408, color: '#9333ea', ward: 'Ward 112 Indiranagar' },
    { title: 'Water Main Leak (#CF-2026-00127)', lat: 12.9352, lng: 77.6245, color: '#2563eb', ward: 'Ward 151 Koramangala' },
    { title: 'Drain Overflow (#CF-2026-00128)', lat: 13.0031, lng: 77.5701, color: '#7c3aed', ward: 'Ward 64 Malleshwaram' },
    { title: 'Repaired Patch (#CF-2026-00129)', lat: 12.9260, lng: 77.6762, color: '#059669', ward: 'Ward 150 Bellandur' }
  ];

  incidents.forEach(function(inc) {
    L.circleMarker([inc.lat, inc.lng], {
      radius: 9,
      fillColor: inc.color,
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(gisMap).bindPopup('<b>' + inc.title + '</b><br>' + inc.ward);
  });

  var fleet = [
    { name: 'Bitumen Paver KA-01-EA-4821', lat: 12.9150, lng: 77.6400 },
    { name: 'SWM Compactor KA-03-GA-1102', lat: 12.9750, lng: 77.6420 }
  ];
  fleet.forEach(function(f) {
    L.circleMarker([f.lat, f.lng], {
      radius: 7,
      fillColor: '#00513b',
      color: '#a4f3d0',
      weight: 3,
      opacity: 1,
      fillOpacity: 1
    }).addTo(gisMap).bindPopup('<b>' + f.name + '</b><br>Field Crew GPS Connected');
  });
}

function zoomToZone(lat, lng, zoom) {
  if (gisMap) gisMap.flyTo([lat, lng], zoom, { duration: 1.2 });
}

window.addEventListener('DOMContentLoaded', initMap);
</script>
</body></html>
"""

TEMPLATE_15 = """<!-- CivicFix - Departments & Field Crew Fleet Management -->
__TAILWIND_HEAD__
<title>CivicFix - Departments & Field Crew Fleet Management</title>
</head>
<body class="bg-surface font-sans text-on-surface antialiased">
__SIDEBAR__

<div class="pl-72">
__HEADER__

<main class="relative pt-16 w-full px-gutter bg-surface min-h-screen pb-12">
  <div class="flex flex-col w-full">
    <!-- Top Action Bar -->
    <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pt-space-lg pb-space-lg">
      <div class="flex flex-col space-y-1">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
          <span class="text-xs uppercase tracking-wider text-primary font-bold">BBMP Municipal Workforce</span>
          <span class="text-outline-variant">•</span>
          <span class="text-xs text-on-surface-variant">5 Municipal Divisions • 28 Active Response Teams</span>
        </div>
        <h1 class="text-2xl font-bold text-on-surface tracking-tight">Departments & Fleet Command</h1>
        <p class="text-xs text-on-surface-variant max-w-2xl">
          Real-time crew deployment, machinery telemetry, shift handovers, and work order load balancing.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[16px]">file_download</span>
          <span>Fleet Audit</span>
        </button>
        <button class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[16px]">add_task</span>
          <span>Dispatch Emergency Unit</span>
        </button>
      </div>
    </div>

    <!-- 5 Department Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-space-xl">
      <!-- 1. Road Infrastructure -->
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

      <!-- 2. Solid Waste -->
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

      <!-- 3. BESCOM Electrical -->
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

      <!-- 4. BWSSB Water -->
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

      <!-- 5. Stormwater Drain -->
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

    <!-- Live Fleet Vehicle Table -->
    <div class="rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm overflow-hidden">
      <div class="p-4 border-b border-surface-container flex items-center justify-between">
        <h3 class="font-bold text-base text-on-surface">Vehicle Telemetry & Field Crew Deployment</h3>
        <span class="text-xs text-on-surface-variant">Real-time GPS status of all BBMP emergency vehicles</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-surface-container-low text-on-surface-variant uppercase font-semibold text-[11px]">
            <tr>
              <th class="py-3 px-3">Vehicle Reg #</th>
              <th class="py-3 px-3">Machinery Type</th>
              <th class="py-3 px-3">Department</th>
              <th class="py-3 px-3">Assigned Lead</th>
              <th class="py-3 px-3">Current Ward Location</th>
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
              <td class="py-3 px-3 text-right"><button class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
            </tr>
            <tr class="hover:bg-surface-container-low transition-colors">
              <td class="py-3 px-3 font-mono font-bold text-primary">KA-03-GA-1102</td>
              <td class="py-3 px-3">Hydraulic SWM Compactor</td>
              <td class="py-3 px-3 font-medium">Solid Waste Division</td>
              <td class="py-3 px-3">Supervisor K. Nanjappa</td>
              <td class="py-3 px-3">Metro Pillar 42, Indiranagar</td>
              <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00118</td>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">En Route</span></td>
              <td class="py-3 px-3 text-right"><button class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
            </tr>
            <tr class="hover:bg-surface-container-low transition-colors">
              <td class="py-3 px-3 font-mono font-bold text-primary">KA-04-E-2190</td>
              <td class="py-3 px-3">Aerial Boom Truck #3</td>
              <td class="py-3 px-3 font-medium">BESCOM Electrical</td>
              <td class="py-3 px-3">Er. S. Ramesh</td>
              <td class="py-3 px-3">100ft Road, Indiranagar</td>
              <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00126</td>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Active Isolation</span></td>
              <td class="py-3 px-3 text-right"><button class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
            </tr>
            <tr class="hover:bg-surface-container-low transition-colors">
              <td class="py-3 px-3 font-mono font-bold text-primary">KA-02-D-9903</td>
              <td class="py-3 px-3">High-Pressure Super Sucker</td>
              <td class="py-3 px-3 font-medium">SWD Desilting Unit</td>
              <td class="py-3 px-3">Er. C. Chandrashekar</td>
              <td class="py-3 px-3">11th Cross, Malleshwaram</td>
              <td class="py-3 px-3 font-mono text-primary font-bold">#CF-2026-00128</td>
              <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Desilting Sump</span></td>
              <td class="py-3 px-3 text-right"><button class="px-2.5 py-1 rounded bg-surface-container-high font-semibold text-[11px]">Ping Crew</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
</div>
</body></html>
"""

TEMPLATE_16 = """<!-- CivicFix - Central Command Settings & Municipal Governance Rules -->
__TAILWIND_HEAD__
<title>CivicFix - Central Command Settings</title>
</head>
<body class="bg-surface font-sans text-on-surface antialiased">
__SIDEBAR__

<div class="pl-72">
__HEADER__

<main class="relative pt-16 w-full px-gutter bg-surface min-h-screen pb-12">
  <div class="flex flex-col w-full">
    <!-- Top Action Bar -->
    <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pt-space-lg pb-space-lg">
      <div class="flex flex-col space-y-1">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
          <span class="text-xs uppercase tracking-wider text-primary font-bold">Policy & Configuration Console</span>
          <span class="text-outline-variant">•</span>
          <span class="text-xs text-on-surface-variant">Karnataka Municipal Corporations Act Compliance</span>
        </div>
        <h1 class="text-2xl font-bold text-on-surface tracking-tight">System Settings & SLA Thresholds</h1>
        <p class="text-xs text-on-surface-variant max-w-2xl">
          Configure automated SLA timers, AI vision auto-routing triggers, notification webhooks, and GovSSO RBAC.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors">
          Reset to BBMP Defaults
        </button>
        <button onclick="alert('Municipal settings saved successfully.')" class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[16px]">save</span>
          <span>Save Changes</span>
        </button>
      </div>
    </div>

    <!-- 4 Settings Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
      <!-- 1. SLA Thresholds -->
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

      <!-- 2. AI Auto-Triage Parameters -->
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

      <!-- 3. Citizen Alerts & Notification Gateway -->
      <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-surface-container">
          <span class="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
          <h3 class="font-bold text-sm text-on-surface">Citizen Push & SMS Gateways</h3>
        </div>
        <div class="space-y-3 text-xs">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold text-on-surface block">Karnataka GovSMS DLT Gateway</span>
              <span class="text-[10px] text-primary">Status: Connected • Header: KA-BBMP</span>
            </div>
            <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold text-on-surface block">WhatsApp Business Cloud API</span>
              <span class="text-[10px] text-on-surface-variant">Instant ticket tracking URLs sent to citizen phone</span>
            </div>
            <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold text-on-surface block">Automated Councillor Briefing Dossier</span>
              <span class="text-[10px] text-on-surface-variant">Daily 08:00 AM incident summary digest</span>
            </div>
            <input type="checkbox" checked class="w-4 h-4 rounded text-primary accent-primary"/>
          </div>
        </div>
      </div>

      <!-- 4. Security & GovSSO Integration -->
      <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container shadow-sm space-y-3">
        <div class="flex items-center gap-2 pb-2 border-b border-surface-container">
          <span class="material-symbols-outlined text-primary text-[20px]">shield</span>
          <h3 class="font-bold text-sm text-on-surface">GovSSO & Parichay Security</h3>
        </div>
        <div class="space-y-3 text-xs">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold text-on-surface block">National Parichay Single Sign-On (NIC)</span>
              <span class="text-[10px] text-primary">Active Gateway: https://parichay.nic.in</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Active</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <span class="font-semibold text-on-surface block">DigiLocker Certified Engineer Signature</span>
              <span class="text-[10px] text-on-surface-variant">Mandatory for Work Order completion certificates</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Enforced</span>
          </div>
          <div class="pt-2 border-t border-surface-container flex items-center justify-between">
            <span class="text-on-surface-variant font-medium">Session Inactivity Timeout</span>
            <select class="px-2 py-1 rounded border border-outline-variant bg-surface text-xs font-semibold">
              <option>15 Minutes</option>
              <option selected>30 Minutes</option>
              <option>60 Minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</div>
</body></html>
"""

def generate_screen(tmpl, active_path, is_named):
    s = tmpl.replace("__TAILWIND_HEAD__", TAILWIND_HEAD)
    s = s.replace("__SIDEBAR__", get_sidebar(active_path, is_named))
    s = s.replace("__HEADER__", get_header())
    return s

def main():
    screens_to_make = [
        ("14-admin-map.html", "map.html", TEMPLATE_14, "map"),
        ("15-admin-departments.html", "departments.html", TEMPLATE_15, "departments"),
        ("16-admin-settings.html", "settings.html", TEMPLATE_16, "settings")
    ]

    for num_name, file_name, tmpl, active_path in screens_to_make:
        content_num = generate_screen(tmpl, active_path, is_named=False)
        content_named = generate_screen(tmpl, active_path, is_named=True)

        # src/screens/
        p1 = os.path.join("src/screens", num_name)
        with open(p1, "w", encoding="utf-8") as f:
            f.write(content_num)
        print(f"Wrote {p1} ({len(content_num)} bytes)")

        # src/screens/admin/
        p2 = os.path.join("src/screens/admin", file_name)
        with open(p2, "w", encoding="utf-8") as f:
            f.write(content_named)
        print(f"Wrote {p2} ({len(content_named)} bytes)")

        # screens/
        p3 = os.path.join("screens", num_name)
        with open(p3, "w", encoding="utf-8") as f:
            f.write(content_num)

        # screens/admin/
        p4 = os.path.join("screens/admin", file_name)
        with open(p4, "w", encoding="utf-8") as f:
            f.write(content_named)

    print("All 3 remaining screens generated successfully!")

if __name__ == "__main__":
    main()
