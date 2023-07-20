import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = { lat: 12.668109, lng: 79.282176 };

function Map({ onMarkerPositionChange, initialPosition }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY"
    });

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(
        initialPosition && initialPosition.lat !== 0 && initialPosition.lng !== 0
            ? initialPosition
            : defaultCenter
    );
    const [markerPosition, setMarkerPosition] = useState(
        initialPosition && initialPosition.lat !== 0 && initialPosition.lng !== 0
            ? initialPosition
            : defaultCenter
    );

    useEffect(() => {
        if (
            initialPosition &&
            initialPosition.lat !== 0 &&
            initialPosition.lng !== 0
        ) {
            setCenter(initialPosition);
            setMarkerPosition(initialPosition);
        }
    }, [initialPosition]);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

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
    ) : <></>;
}

export default React.memo(Map);
