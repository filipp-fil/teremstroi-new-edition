"use client";

import * as React from "react";
import { workPoints, type WorkPoint } from "@/content/works-map";

/**
 * Большая карта всех построенных объектов (Leaflet + OpenStreetMap).
 * Точки извлечены из карт Яндекс.Конструктора старого сайта (content/works-map.ts).
 * Leaflet подгружается только в браузере (динамический import) — иначе ломается SSR.
 */
export function WorksMap() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let map: import("leaflet").Map | null = null;
    let disposed = false;

    (async () => {
      const L = await import("leaflet");
      if (disposed || !ref.current || ref.current.dataset.ready) return;
      ref.current.dataset.ready = "1";

      const lats = workPoints.map((p) => p.lat);
      const lons = workPoints.map((p) => p.lon);
      const bounds: import("leaflet").LatLngBoundsExpression = [
        [Math.min(...lats) - 0.4, Math.min(...lons) - 0.6],
        [Math.max(...lats) + 0.4, Math.max(...lons) + 0.6],
      ];

      map = L.map(ref.current!, {
        scrollWheelZoom: false,
        attributionControl: false,
      }).fitBounds(bounds);

      // Тайлы грузим через прокси на нашем сервере (/map-tiles/): openstreetmap.org
      // из России отдаёт медленно/блокирует, а свой прокси работает всегда быстро.
      L.tileLayer("/map-tiles/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        className: "work-marker",
        html: `<div style="
            width:22px;height:22px;border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            background:#e8503a;border:2px solid #fff;
            box-shadow:0 2px 6px rgba(0,0,0,.35);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22],
        popupAnchor: [0, -22],
      });

      workPoints.forEach((p: WorkPoint) => {
        L.marker([p.lat, p.lon], { icon })
          .addTo(map!)
          .bindPopup(
            `<a href="/works/${p.slug}" style="font-weight:700;color:#1f3d2b">${p.title}</a><br/>
             <span style="color:#666;font-size:12px">${p.location}</span><br/>
             <a href="/works/${p.slug}" style="color:#c53a2d;font-size:12px;font-weight:600">Смотреть объект →</a>`
          );
      });
    })();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden rounded-2xl shadow-soft">
      <div ref={ref} className="works-leaflet h-[480px] w-full" />
      <p className="absolute bottom-3 left-3 z-[500] rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur-sm">
        {workPoints.length} построенных объектов на карте
      </p>
      <style jsx global>{`
        .works-leaflet .leaflet-tile-pane {
          filter: saturate(0.75) brightness(0.96);
        }
        .works-leaflet .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
