import React from 'react';
import { Link } from 'react-router-dom';

const CrypFeedDropDown = ({ onSortChange, onNameFilterChange }) => {
    return (
        <div className='w-8/12 mx-auto mt-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-lg'>
                <div className='relative'>
                    <label htmlFor="sortByName" className='block font-semibold mb-1'>Sort by Name:</label>
                    <select id="sortByName" onChange={(input) => onSortChange(input.target.value)} className='rounded-full border p-2 w-full'>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                    </select>
                </div>
                <div className='relative'>
                    <label htmlFor="sortByPrice" className='block font-semibold mb-1'>Sort by Price:</label>
                    <select id="sortByPrice" onChange={(input) => onSortChange(input.target.value)} className='rounded-full border p-2 w-full'>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
                <div className='relative'>
                    <label htmlFor="sortByMarketCap" className='block font-semibold mb-1'>Sort by Market Cap:</label>
                    <select id="sortByMarketCap" onChange={(input) => onSortChange(input.target.value)} className='rounded-full border p-2 w-full'>
                        <option value="marketCap-asc">Market Cap (Low to High)</option>
                        <option value="marketCap-desc">Market Cap (High to Low)</option>
                    </select>
                </div>
                <div className='relative'>
                    <label htmlFor="filterByName" className='block font-semibold mb-1'>Filter by Name:</label>
                    <input
                        id="filterByName"
                        type="text"
                        placeholder="Enter coin name"
                        onChange={(input) => onNameFilterChange(input.target.value)}
                        className='rounded-full border p-2 w-full'
                    />
                </div>
            </div>
            <div className='flex justify-center mt-4'>
                <Link to='/fav' className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md'>Favorites</Link>
            </div>
        </div>
    );
};

export default CrypFeedDropDown;
