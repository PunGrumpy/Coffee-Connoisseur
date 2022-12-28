import { useState } from 'react';

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    };

    const error = () => {
        setLocationErrorMsg('Unable to retrieve your location');
        setIsFindingLocation(false);
    };

    const handlerTrackLocation = () => {
        setIsFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg('Geolocation is not supported by your browser');
            setIsFindingLocation(false);
        } else {
            // status.textContent = 'Loading...';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return { handlerTrackLocation, latLong, locationErrorMsg, isFindingLocation };
};

export default useTrackLocation;
