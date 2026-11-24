/**
 * CivicFix - Map & Location Services Module
 */

import { BANGALORE_LANDMARKS } from '../data/civicData.js';

export const MapService = {
  currentPickerMap: null,
  currentTrackingMap: null,
  pickerMarker: null,
  vehicleMarker: null,
  vehicleAnimationInterval: null,

  initPicker(containerId, options = {}) {
    const defaultLat = options.lat || 12.9121;
    const defaultLng = options.lng || 77.6446;
    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof L !== 'undefined') {
      try {
        if (this.currentPickerMap) {
          this.currentPickerMap.remove();
        }

        const map = L.map(containerId, {
          zoomControl: false,
          attributionControl: false
        }).setView([defaultLat, defaultLng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        const customIcon = L.divIcon({
          className: 'custom-pin-marker',
          html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: grab;">
              <div style="background-color: #00513b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,81,59,0.4); border: 2.5px solid white;">
                <span class="material-symbols-outlined" style="font-size: 22px;">location_on</span>
              </div>
              <div style="width: 10px; height: 10px; background-color: #00513b; transform: rotate(45deg); margin-top: -6px; border-bottom: 2px solid white; border-right: 2px solid white;"></div>
            </div>
          `,
          iconSize: [40, 46],
          iconAnchor: [20, 46]
        });

        const marker = L.marker([defaultLat, defaultLng], {
          draggable: true,
          icon: customIcon
        }).addTo(map);

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          this.onLocationChanged(pos.lat, pos.lng, options.onUpdate);
        });

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          this.onLocationChanged(e.latlng.lat, e.latlng.lng, options.onUpdate);
        });

        this.currentPickerMap = map;
        this.pickerMarker = marker;
        return map;
      } catch (err) {
        console.warn('Leaflet map init failed, using simulated map', err);
      }
    }

    this.initSimulatedPicker(container, defaultLat, defaultLng, options.onUpdate);
  },

  onLocationChanged(lat, lng, callback) {
    const formattedLat = lat.toFixed(4);
    const formattedLng = lng.toFixed(4);

    const match = BANGALORE_LANDMARKS.find(l => {
      const dist = Math.abs(l.lat - lat) + Math.abs(l.lng - lng);
      return dist < 0.05;
    }) || {
      name: `19th Main Road, Sector 2, HSR Layout`,
      ward: 'Ward 174',
      zone: 'BBMP South'
    };

    const details = {
      lat: parseFloat(formattedLat),
      lng: parseFloat(formattedLng),
      address: `${match.name}, Bengaluru`,
      landmark: match.name,
      ward: `${match.ward} (HSR Layout) • ${match.zone}`,
      wardNumber: match.ward.replace('Ward ', '')
    };

    if (callback) callback(details);
  },

  initSimulatedPicker(container, lat, lng, callback) {
    container.innerHTML = `
      <div class="relative w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGgyIzYjJQLzI8Z_WmtcAqWGaY3UjZUmdFfcIoSWbLDB-U9WlOa-KGojjWmBUH1lddxZtZCgfjS59638Ho-QKmLU-TjIlI474ONMprCth-IQbmDmARDYpEHvSI9vrKqdUy-XahzSORvgegSRlNS8i2g2VBb0jC9U9fpBxqeDVX-3Tdt13Z5XKLHnrFMtJJuuUMEIA1hMXMQ4_AdTshhrcV2OoLZMimaCd30PmrPC2U')">
        <div class="absolute inset-0 bg-primary/10"></div>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="relative flex flex-col items-center">
            <span class="absolute -bottom-1 h-12 w-12 rounded-full bg-primary/20 animate-ping"></span>
            <div class="mb-1.5 flex items-center gap-1.5 bg-primary px-2.5 py-1 rounded-full shadow-lg text-on-primary">
              <span class="material-symbols-outlined text-[13px]">location_on</span>
              <span class="font-label-sm text-label-sm">Drag Pin or Click</span>
            </div>
            <div class="cursor-pointer pointer-events-auto transform hover:scale-110 active:scale-95 transition-transform">
              <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
                <path d="M23 0C10.2975 0 0 10.2975 0 23C0 37.3828 20.3125 53.8672 21.2188 54.5938C21.7344 55.0156 22.3672 55.25 23 55.25C23.6328 55.25 24.2656 55.0156 24.7812 54.5938C25.6875 53.8672 46 37.3828 46 23C46 10.2975 35.7025 0 23 0Z" fill="#176B50"/>
                <circle cx="23" cy="22" r="11" fill="#FFFFFF"/>
                <circle cx="23" cy="22" r="6" fill="#176B50"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;

    container.onclick = (e) => {
      const rect = container.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width;
      const yRatio = (e.clientY - rect.top) / rect.height;
      const newLat = 12.9121 + (0.5 - yRatio) * 0.01;
      const newLng = 77.6446 + (xRatio - 0.5) * 0.01;
      this.onLocationChanged(newLat, newLng, callback);
    };
  },

  locateUser(onSuccess, onError) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          if (this.pickerMarker && this.currentPickerMap) {
            this.pickerMarker.setLatLng([lat, lng]);
            this.currentPickerMap.setView([lat, lng], 17);
          }
          this.onLocationChanged(lat, lng, onSuccess);
        },
        (err) => {
          const fallback = BANGALORE_LANDMARKS[0];
          if (this.pickerMarker && this.currentPickerMap) {
            this.pickerMarker.setLatLng([fallback.lat, fallback.lng]);
            this.currentPickerMap.setView([fallback.lat, fallback.lng], 16);
          }
          this.onLocationChanged(fallback.lat, fallback.lng, onSuccess);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      const fallback = BANGALORE_LANDMARKS[0];
      this.onLocationChanged(fallback.lat, fallback.lng, onSuccess);
    }
  },

  initTrackingMap(containerId, complaint) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (this.vehicleAnimationInterval) {
      clearInterval(this.vehicleAnimationInterval);
      this.vehicleAnimationInterval = null;
    }

    const issueLat = complaint.lat || 12.9121;
    const issueLng = complaint.lng || 77.6446;
    const depotLat = issueLat + 0.0095;
    const depotLng = issueLng - 0.0085;

    if (typeof L !== 'undefined') {
      try {
        if (this.currentTrackingMap) {
          this.currentTrackingMap.remove();
        }

        const map = L.map(containerId, {
          zoomControl: false,
          attributionControl: false
        }).setView([issueLat, issueLng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(map);

        const issueIcon = L.divIcon({
          className: 'custom-pin-marker',
          html: `
            <div style="background-color: #ba1a1a; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(186,26,26,0.4); border: 2.5px solid white;">
              <span class="material-symbols-outlined" style="font-size: 20px;">warning</span>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });
        L.marker([issueLat, issueLng], { icon: issueIcon }).addTo(map).bindPopup('<b>Civic Hazard Location</b><br>' + complaint.title);

        const vehicleIcon = L.divIcon({
          className: 'vehicle-marker',
          html: `
            <div style="background-color: #00513b; color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,81,59,0.5); border: 2.5px solid white; position: relative;">
              <span class="material-symbols-outlined" style="font-size: 22px;">local_shipping</span>
              <span style="position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border-radius: 50%; background-color: #89f8c3; border: 1.5px solid #00513b; animation: ping 1.5s infinite;"></span>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        const waypoints = [
          [depotLat, depotLng],
          [depotLat - 0.002, depotLng + 0.001],
          [depotLat - 0.005, depotLng + 0.003],
          [depotLat - 0.007, depotLng + 0.006],
          [issueLat, issueLng]
        ];

        const polyline = L.polyline(waypoints, {
          color: '#176b50',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.8
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

        let currentStep = 0;
        const totalSteps = 100;
        let vMarker = L.marker(waypoints[0], { icon: vehicleIcon }).addTo(map);

        this.vehicleAnimationInterval = setInterval(() => {
          currentStep = (currentStep + 1) % totalSteps;
          const t = currentStep / totalSteps;
          const segCount = waypoints.length - 1;
          const segIndex = Math.min(Math.floor(t * segCount), segCount - 1);
          const segT = (t * segCount) - segIndex;
          const p1 = waypoints[segIndex];
          const p2 = waypoints[segIndex + 1];
          const curLat = p1[0] + (p2[0] - p1[0]) * segT;
          const curLng = p1[1] + (p2[1] - p1[1]) * segT;
          vMarker.setLatLng([curLat, curLng]);
        }, 120);

        this.currentTrackingMap = map;
        this.vehicleMarker = vMarker;
        return map;
      } catch (e) {
        console.warn('Leaflet tracking map error', e);
      }
    }

    container.innerHTML = `
      <div class="relative w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGgyIzYjJQLzI8Z_WmtcAqWGaY3UjZUmdFfcIoSWbLDB-U9WlOa-KGojjWmBUH1lddxZtZCgfjS59638Ho-QKmLU-TjIlI474ONMprCth-IQbmDmARDYpEHvSI9vrKqdUy-XahzSORvgegSRlNS8i2g2VBb0jC9U9fpBxqeDVX-3Tdt13Z5XKLHnrFMtJJuuUMEIA1hMXMQ4_AdTshhrcV2OoLZMimaCd30PmrPC2U')">
        <div class="absolute inset-0 bg-primary/10"></div>
        <div class="absolute top-1/4 left-1/4 flex items-center gap-2 bg-primary text-on-primary px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold animate-bounce">
          <span class="material-symbols-outlined text-[16px]">local_shipping</span>
          <span>Field Crew #4 (KA-01-EA-4821) • En Route</span>
        </div>
        <div class="absolute bottom-1/3 right-1/3 flex flex-col items-center">
          <div class="w-8 h-8 rounded-full bg-error text-white flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-[18px]">priority_high</span>
          </div>
          <span class="font-label-sm text-[10px] bg-white px-2 py-0.5 rounded shadow mt-0.5 text-on-surface font-bold">Pothole Hazard</span>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.CivicMap = MapService;
}
