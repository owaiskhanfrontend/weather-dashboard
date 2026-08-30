export {getCurrentLocation};


async function getCurrentLocation() {

    const position = await new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            }
        );
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (!response.ok) {
        throw new Error(
            `Unable to determine current city. Status: ${response.status}`
        );
    }

    const locationData = await response.json();

    return {
        city: locationData.city || locationData.locality,
        latitude,
        longitude
    };
}





