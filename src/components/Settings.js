import React, { useState } from 'react';

export default function Settings() {
  const [currencies, setCurrencies] = useState([
    { from: '$', rate: 130 },
    { from: 'RM', rate: 50 },
  ]);
  const [from, setFrom] = useState('$');
  const [rate, setRate] = useState(130);

  const addCurrency = () => {
    if (!from || !rate) return;
    setCurrencies([...currencies, { from, rate: parseFloat(rate) }]);
    setFrom('');
    setRate('');
  };

  const removeCurrency = (index) => {
    setCurrencies(currencies.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Currencies</h2>
      <div className="flex items-center space-x-2 mb-4">
        <input
          className="w-12 bg-gray-100 p-2 rounded text-center"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <span>1 = ৳</span>
        <input
          className="w-16 bg-gray-100 p-2 rounded text-center"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white w-full py-2 rounded mb-4"
        onClick={addCurrency}
      >
        ADD
      </button>
      {currencies.map((c, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
        >
          <span>
            {c.from} 1 = ৳ {c.rate}
          </span>
          <button onClick={() => removeCurrency(i)} className="text-red-500">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
