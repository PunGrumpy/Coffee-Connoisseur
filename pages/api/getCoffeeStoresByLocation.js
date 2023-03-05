import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query; // '40.705628,-74.0882523'
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200).json(response);
    } catch (err) {
        console.error('ERROR!!', err);
        res.status(500).json({ message: 'Oh!!! Something went wrong', err });
    }
};

export default getCoffeeStoresByLocation;
