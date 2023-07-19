import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = { lat: 12.668109, lng: 79.282176 }

function Map({ onMarkerPositionChange, initialPosition }) {
    console.log(initialPosition)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY"
    })

    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(initialPosition || center);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    const handleMarkerDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkerPosition(newPosition);
        onMarkerPositionChange(newPosition);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={14}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map);
