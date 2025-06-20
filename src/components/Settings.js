import { useEffect, useState } from 'react';

export default function Settings() {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    const rates = localStorage.getItem('currencyRates');
    if (rates) {
      setCurrencyRates(JSON.parse(rates));
    }
  }, []);

  const addCurrency = () => {
    if (!from || !to || !rate) return;

    const newRates = [...currencyRates, { from, to, rate: parseFloat(rate) }];

    localStorage.setItem('currencyRates', JSON.stringify(newRates));
    setCurrencyRates(newRates);

    setFrom('');
    setTo('');
    setRate('');
  };

  const removeCurrency = (index) => {
    const newRates = currencyRates.filter((_, i) => i !== index);
    setCurrencyRates(newRates);
    localStorage.setItem('currencyRates', JSON.stringify(newRates));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Currencies</h2>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <input
          className="w-12 bg-gray-100 p-2 rounded text-center"
          value={from}
          onChange={(e) => {
            const value = e.target.value.replace(/[0-9]/g, '');
            setFrom(value);
          }}
          placeholder="$"
        />
        <span>1 = </span>
        <input
          className="w-12 bg-gray-100 p-2 rounded text-center"
          value={to}
          onChange={(e) => {
            const value = e.target.value.replace(/[0-9]/g, '');
            setTo(value);
          }}
          placeholder="৳"
        />
        <input
          className="w-16 bg-gray-100 p-2 rounded text-center"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="130"
        />
      </div>
      <button
        className="bg-blue-500 text-white w-full py-2 rounded mb-4"
        onClick={addCurrency}
      >
        ADD
      </button>
      {currencyRates.map((c, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
        >
          <span>
            {c.from} 1 = {c.to} {c.rate}
          </span>
          <button onClick={() => removeCurrency(i)} className="text-red-500">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
