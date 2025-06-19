import React, { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const [fromCurrency, setFromCurrency] = useState('$');
  const currencyOptions = ['$', '€', '£', 'RM', '¥'];

  const handleConvert = () => {
    const converted = parseFloat(amount || 0) * 130; // USD to BDT
    setResult(converted);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="bg-blue-100 text-black px-3 py-2 rounded"
        >
          {currencyOptions.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="flex-1 bg-gray-100 rounded px-4 py-2"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded w-full"
          onClick={handleConvert}
        >
          CONVERT
        </button>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="bg-blue-100 text-black px-3 py-2 rounded"
        >
          {currencyOptions.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      {result !== null && (
        <div className="border px-4 py-2 rounded text-center text-xl">
          ৳ {result.toFixed(2)}
        </div>
      )}
    </div>
  );
}
