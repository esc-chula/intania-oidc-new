import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const mapOptions = {
    center: {
        lat: 13.73826,
        lng: 100.532413
    }, // Chula location
    zoom: 10,
    disableDefaultUI: true,
};

interface Location{
    lat: number | null;
    lng: number | null;
};

export default function GoogleMaps() {
    const [selectedLocation, setSelectedLocation] = useState <Location>({ lat: null, lng: null });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation({ lat, lng });
            console.log(`Selected location: Latitude: ${lat}, Longitude: ${lng}`);
        } else {
            console.log("No location selected.");
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            options={mapOptions}
            onClick={handleMapClick}
        >
            {selectedLocation.lat && selectedLocation.lng && (
                <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
            )}
        </GoogleMap>
    );
}