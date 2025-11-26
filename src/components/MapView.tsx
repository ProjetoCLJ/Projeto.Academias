import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MarkerItem = {
  position?: [number, number];
  label?: string;
  address?: string;
};

// Fix leaflet's default icon paths so they work with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

// Geocodificar endereço usando Nominatim (OpenStreetMap)
async function geocodeAddress(address: string): Promise<[number, number] | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ', São Paulo, Brasil')}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.error('Erro ao geocodificar endereço:', error);
  }
  return null;
}

export default function MapView({
  center = [-23.55, -46.63],
  zoom = 12,
  markers = [],
}: {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerItem[];
}) {
  const [resolvedMarkers, setResolvedMarkers] = useState<Array<{ position: [number, number]; label?: string; address?: string }>>([]);

  useEffect(() => {
    const resolveAddresses = async () => {
      const resolved = await Promise.all(
        markers.map(async (marker) => {
          // Se já tem posição definida, usa ela
          if (marker.position) {
            return { ...marker, position: marker.position };
          }
          // Se tem endereço, geocodifica
          if (marker.address) {
            const coords = await geocodeAddress(marker.address);
            return { ...marker, position: coords || center };
          }
          // Fallback para centro
          return { ...marker, position: center };
        })
      );
      setResolvedMarkers(resolved as Array<{ position: [number, number]; label?: string; address?: string }>);
    };

    resolveAddresses();
  }, [markers, center]);

  return (
    <div className="w-full h-full">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resolvedMarkers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{m.label}</p>
                {m.address && <p className="text-xs text-gray-600">{m.address}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
