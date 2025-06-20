import { useEffect, useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const [fromCurrency, setFromCurrency] = useState('$');
  const [toCurrency, setToCurrency] = useState('RM');
  const [conversionRates, setConversionRates] = useState([]);

  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    const rates = localStorage.getItem('currencyRates');
    if (!rates) return;

    const parsedRates = JSON.parse(rates);
    setConversionRates(parsedRates);

    const co = Array.from(
      new Set(parsedRates.flatMap((rate) => [rate.from, rate.to]))
    );
    setCurrencyOptions(co);

    const fromCurr = localStorage.getItem('fromCurrency');
    const toCurr = localStorage.getItem('toCurrency');

    setFromCurrency(fromCurr);
    setToCurrency(toCurr);
  }, []);

  const handleConvert = () => {
    let rate = null;

    for (const cr of conversionRates) {
      if (cr.from === fromCurrency && cr.to === toCurrency) {
        rate = cr.rate;
        break;
      } else if (cr.from === toCurrency && cr.to === fromCurrency) {
        rate = 1 / cr.rate;
        break;
      }
    }    

    if (rate !== null) {
      const converted = parseFloat(amount || 0) * rate;
      setResult(converted);
    } else {
      setResult(0);
    }
  };

  const onFromChange = (e) => {
    setFromCurrency(e.target.value);
    localStorage.setItem('fromCurrency', e.target.value);
  };

  const onToChange = (e) => {
    setToCurrency(e.target.value);
    localStorage.setItem('toCurrency', e.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <select
          value={fromCurrency}
          onChange={onFromChange}
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
          value={toCurrency}
          onChange={onToChange}
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
          {toCurrency} {result.toFixed(2)}
        </div>
      )}
    </div>
  );
}
