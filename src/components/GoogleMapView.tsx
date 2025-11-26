import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

type MarkerItem = {
  position: { lat: number; lng: number };
  label?: string;
};

export default function GoogleMapView({
  center = { lat: -23.55, lng: -46.63 },
  zoom = 12,
  markers = [],
}: {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MarkerItem[];
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 text-center">
        <div>
          <p className="font-semibold">Chave da API do Google Maps não configurada</p>
          <p className="text-sm text-muted-foreground">Defina `VITE_GOOGLE_MAPS_API_KEY` no seu `.env` para ver o mapa.</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return <div className="w-full h-full flex items-center justify-center">Erro ao carregar Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Carregando mapa...</div>;
  }

  return (
    <div className="w-full h-full">
      <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={zoom}>
        {markers.map((m, i) => (
          <Marker key={i} position={m.position} />
        ))}
      </GoogleMap>
    </div>
  );
}
