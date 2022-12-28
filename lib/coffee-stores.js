import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (query, latLong, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        perPage: 30,
    });
    return photos.response.results.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(
        // getUrlForCoffeeStores('coffee', '40.705628%2C-74.0882523', 6), // USA
        getUrlForCoffeeStores('coffee', '13.7690544%2C100.6806354', 6), // TH
        options
    );
    const data = await response.json();
    return data.results.map((result, idx) => {
        const { fsq_id, name, location } = result;

        return {
            id: fsq_id,
            name: name,
            address: location.address ? location.address : location.formatted_address,
            neighborhood: location.neighborhood?.length > 0 ? location.neighborhood[0] : '',
            imgUrl: photos?.length > 0 ? photos[idx] : null,
        };
    });
};
