import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavFeed = () => {
    const [favoriteCoins, setFavoriteCoins] = useState([]);

    useEffect(() => {
        const fetchFavoriteCoins = () => {
            const coins = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.includes('coin-')) {
                    const coin = JSON.parse(localStorage.getItem(key));
                    coins.push(coin);
                }
            }
            setFavoriteCoins(coins);
        };

        fetchFavoriteCoins();
    }, []);

    if (favoriteCoins.length === 0) {
        return (
            <div className="bg-gray-100 min-h-screen py-10">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 className="text-4xl font-bold mb-8">Favorite Coins</h1>
                    <p className="text-xl">No favorite coins saved</p>
                    <div className="flex justify-center mt-6">
                        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-screen-lg mx-auto p-8">
                <h1 className="text-5xl font-extrabold text-center mb-8">Favorite Coins</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {favoriteCoins.map((coin) => (
                        <Link to={`/detail/${coin.uuid}`} key={coin.uuid} className="block w-full">
                            <div className="flex flex-col items-center justify-between h-full bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 w-full">
                                <img src={coin.iconUrl} width={40} height={40} alt={`${coin.name} icon`} className="mb-2" />
                                <p className="text-lg font-semibold text-center">{coin.name}</p>
                                <p className="text-md text-center text-gray-700">{coin.symbol}</p>
                                <p className="text-md text-center">${Number(coin.price).toFixed(6)}</p>
                                <p className="text-md text-center">Market Cap: ${Number(coin.marketCap).toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FavFeed;
