"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { env } from "@/env";

const mapOptions = {
    center: {
        lat: 13.73826,
        lng: 100.532413,
    }, // Chula location
    zoom: 10,
    disableDefaultUI: true,
};

interface Location {
    lat: number | null;
    lng: number | null;
}

interface GoogleMapsProps {
    onLocationSelect: (lat: number, lng: number) => void;
    width?: string;
    height?: string;
    placeholder: string;
    selectedLocation?: Location;
}

export default function GoogleMaps({
    onLocationSelect,
    width,
    height,
    placeholder,
    selectedLocation: predefinedLocation,
}: GoogleMapsProps) {
    const [selectedLocation, setSelectedLocation] = useState<Location>({
        lat: null,
        lng: null,
    });

    useEffect(() => {
        if (predefinedLocation) {
            setSelectedLocation(predefinedLocation);
        }
    }, [predefinedLocation]);

    const [showOverlay, setShowOverlay] = useState(true);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        setShowOverlay(false);
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation({ lat, lng });
            onLocationSelect(lat, lng);
        } else {
            // no latLng in event
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            {showOverlay && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with opacity
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2, // Ensure it's above the map
                    }}
                    onClick={() => setShowOverlay(false)} // Hide overlay on click
                    className="text-lg font-bold"
                >
                    {placeholder}
                </div>
            )}
            <GoogleMap
                mapContainerStyle={
                    width && height
                        ? { width, height }
                        : { width: "100%", height: "100%" }
                }
                options={mapOptions}
                onClick={handleMapClick}
            >
                {selectedLocation.lat && selectedLocation.lng && (
                    <Marker
                        position={{
                            lat: selectedLocation.lat,
                            lng: selectedLocation.lng,
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}
