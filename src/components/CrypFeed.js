import React, { useState, useEffect } from 'react';
import CrypGetApi from '../service/CrypGetApi';
import CrypFeedDropDown from './CrypFeedDropDown';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CrypFeed = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortCriteria, setSortCriteria] = useState();
    const [nameFilter, setNameFilter] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await CrypGetApi();
                setCoins(data.data.coins);
                setLoading(false);
                const storedFavorites = Object.keys(localStorage)
                    .filter(key => key.startsWith('coin-'))
                    .map(key => JSON.parse(localStorage.getItem(key)));
                setFavorites(storedFavorites);
            } catch (error) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (criteria) => {
        setSortCriteria(criteria);
    };

    const handleNameFilterChange = (input) => {
        setNameFilter(input);
    };

    const handleFavorite = (coin) => {
        const isFavorite = favorites.some(fav => fav.uuid === coin.uuid);
        if (isFavorite) {
            localStorage.removeItem(`coin-${coin.uuid}`);
            setFavorites(favorites.filter(fav => fav.uuid !== coin.uuid));
        } else {
            localStorage.setItem(`coin-${coin.uuid}`, JSON.stringify(coin));
            setFavorites([...favorites, coin]);
        }
    };

    const sortCoins = (coins) => {
        let filteredCoins = coins.filter(coin =>
            coin.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

        switch (sortCriteria) {
            case 'name-asc':
                return [...filteredCoins].sort((a, b) => a.name > b.name ? 1 : -1);
            case 'name-desc':
                return [...filteredCoins].sort((a, b) => a.name < b.name ? 1 : -1);
            case 'price-asc':
                return [...filteredCoins].sort((a, b) => Number(a.price) - Number(b.price));
            case 'price-desc':
                return [...filteredCoins].sort((a, b) => Number(b.price) - Number(a.price));
            case 'marketCap-asc':
                return [...filteredCoins].sort((a, b) => Number(a.marketCap) - Number(b.marketCap));
            case 'marketCap-desc':
                return [...filteredCoins].sort((a, b) => Number(b.marketCap) - Number(a.marketCap));
            default:
                return filteredCoins;
        }
    };

    const sortedCoins = sortCoins(coins);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <ReactLoading type="bars" color="#000" />
            </div>
        );
    }

    if (error) {
        return <p className="text-center">{error}</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-5xl py-5 font-extrabold">CRYP FEED</h1>
            <CrypFeedDropDown
                onSortChange={handleSortChange}
                onNameFilterChange={handleNameFilterChange}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 max-w-screen-lg w-full">
                {sortedCoins.map((coin) => (
                    <div key={coin.uuid} className="relative h-full w-full">
                        <button
                            onClick={() => handleFavorite(coin)}
                            className="absolute top-2 right-2 z-10 text-xl"
                        >
                            {favorites.some(fav => fav.uuid === coin.uuid) ? (
                                <FaHeart className="text-red-500" />
                            ) : (
                                <FaRegHeart className="text-gray-400 hover:text-red-500" />
                            )}
                        </button>
                        <Link to={`/detail/${coin.uuid}`} className="block h-full">
                            <div className="flex flex-col items-center justify-between h-full w-full bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
                                <img src={coin.iconUrl} width={40} height={40} alt={`${coin.name} icon`} className="mb-2" />
                                <p className="text-lg font-semibold text-center">Name: {coin.name}</p>
                                <p className="text-md text-center">Symbol: {coin.symbol}</p>
                                <p className="text-md text-center">Price: {Number(coin.price).toFixed(6).toLocaleString()} $</p>
                                <p className="text-md text-center">Market Cap: {Number(coin.marketCap).toLocaleString()} $</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CrypFeed;
