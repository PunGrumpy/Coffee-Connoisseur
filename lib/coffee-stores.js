const getUrlForCoffeeStores = (query, latLong, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores('coffee', '13.7690544%2C100.6806354', 6),
        options
    );
    const data = await response.json();
    return data.results;
};
