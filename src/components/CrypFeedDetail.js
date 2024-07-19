import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import CrypGetApiDetail from '../service/CrypGetApiDetail';
import CrypGetApi from '../service/CrypGetApi';

const CrypFeedDetail = () => {
    const { coinUuid } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [exchangeAmount, setExchangeAmount] = useState('');
    const [equivalentAmount, setEquivalentAmount] = useState(null);

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const data = await CrypGetApiDetail(coinUuid);
                setCoin(data.data.coin);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch coin details');
                setLoading(false);
            }
        };

        const fetchCoins = async () => {
            try {
                const data = await CrypGetApi();
                setCoins(data.data.coins);
            } catch (error) {
                console.error('Failed to fetch coins list');
            }
        };

        fetchCoin();
        fetchCoins();
    }, [coinUuid]);

    const handleCompare = async (input) => {
        const selectedCoinUuid = input.target.value;

        if (selectedCoinUuid) {
            try {
                const data = await CrypGetApiDetail(selectedCoinUuid);
                const selectedCoin = data.data.coin;
                setSelectedCoin(selectedCoin);
                calculateExchangeAmount(exchangeAmount, coin, selectedCoin);
            } catch (error) {
                console.error('Failed to fetch comparison coin details');
            }
        } else {
            setEquivalentAmount(null);
            setSelectedCoin(null);
        }
    };

    const handleExchangeAmountChange = (input) => {
        const amount = input.target.value;
        setExchangeAmount(amount);
        calculateExchangeAmount(amount, coin, selectedCoin);
    };

    const calculateExchangeAmount = (amount, baseCoin, targetCoin) => {
        if (amount && baseCoin && targetCoin) {
            const exchangeRate = baseCoin.price / targetCoin.price;
            const equivalent = amount * exchangeRate;
            setEquivalentAmount(equivalent);
        } else {
            setEquivalentAmount(null);
        }
    };

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <ReactLoading type="bars" color="black" />
            </div>
        );
    }

    if (error) {
        return <p className="text-center">{error}</p>;
    }

    if (!coin) {
        return <p className="text-center">Coin not found</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">{coin.name}</h1>
                    <img src={coin.iconUrl} alt={`${coin.name} icon`} className="mx-auto mb-4" style={{ maxWidth: '100px' }} />
                    <div className="text-lg text-gray-700 mb-6">
                        <p>Symbol: {coin.symbol}</p>
                        <p>Price: {Number(coin.price).toFixed(6)} $</p>
                        <p>Market Cap: {Number(coin.marketCap).toLocaleString()} $</p>
                        <p>Change: {coin.change}%</p>
                        <p>Rank: {coin.rank}</p>
                        <p>24h Vol: {Number(coin['24hVolume']).toLocaleString()} $</p>
                    </div>
                </div>
                <div className="flex justify-center mb-6">
                    <div>
                        <label className="font-bold">Compare with:</label>
                        <select onChange={handleCompare} className="ml-2 p-2 border rounded">
                            <option value="">Select a coin</option>
                            {coins.map(coin => (
                                <option key={coin.uuid} value={coin.uuid}>{coin.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mb-6 items-center">
                    <label className="font-bold mr-2">Amount:</label>
                    <input
                        type="number"
                        value={exchangeAmount}
                        onChange={handleExchangeAmountChange}
                        className="p-2 border rounded"
                        placeholder="Enter amount"
                    />
                </div>
                {equivalentAmount !== null && selectedCoin && (
                    <div className="bg-gray-200 rounded-lg p-4 mb-4">
                        <p className='text-xl font-bold text-center mb-2'>Exchange Rate</p>
                        <div className='flex justify-center items-center'>
                            <div className="flex items-center">
                                <img src={coin.iconUrl} alt={`${coin.symbol} icon`} className='w-8 h-8 mr-2' />
                                <p className='text-xl font-bold'>{exchangeAmount} {coin.symbol}&nbsp;=&nbsp;</p>
                                <p className='text-xl font-bold'>{equivalentAmount.toFixed(6)}</p>
                                <img src={selectedCoin.iconUrl} alt={`${selectedCoin.symbol} icon`} className='w-8 h-8 ml-2' />
                                <p className='text-xl font-bold'>&nbsp;{selectedCoin.symbol}</p>
                            </div>
                        </div>
                    </div>
                )}
                <Link
                    to='/'
                    className='block bg-transparent rounded-lg border-solid border-black border-2 font-semibold w-full text-center py-2 hover:scale-105 mt-4'
                >
                    Back
                </Link>
            </div>
        </div>
    );
};

export default CrypFeedDetail;
