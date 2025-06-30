import { useEffect, useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const [logs, setLogs] = useState([]);
  const [description, setDescription] = useState("");

  const [fromCurrency, setFromCurrency] = useState("$");
  const [toCurrency, setToCurrency] = useState("RM");
  const [conversionRates, setConversionRates] = useState([]);

  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    const rates = localStorage.getItem("currencyRates");
    if (!rates) return;

    const parsedRates = JSON.parse(rates);
    setConversionRates(parsedRates);

    const co = Array.from(new Set(parsedRates.flatMap((rate) => [rate.from, rate.to])));
    setCurrencyOptions(co);

    const fromCurr = localStorage.getItem("fromCurrency");
    const toCurr = localStorage.getItem("toCurrency");
    const _logs = localStorage.getItem("logs");

    setFromCurrency(fromCurr || "");
    setToCurrency(toCurr || "");
    _logs && setLogs(JSON.parse(_logs) || []);
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

      if (converted !== 0) {
        const logEntry = `${description || "Unnamed transaction"} | ${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;

        setLogs((prevLogs) => {
          const _logs = [logEntry, ...prevLogs];
          localStorage.setItem("logs", JSON.stringify(_logs));
          return _logs;
        });
      }
    } else {
      setResult(-1);
    }
  };

  const onFromChange = (e) => {
    setFromCurrency(e.target.value);
    localStorage.setItem("fromCurrency", e.target.value);
  };

  const onToChange = (e) => {
    setToCurrency(e.target.value);
    localStorage.setItem("toCurrency", e.target.value);
  };

  const onReverseClick = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const onClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("logs");
  };

  if (currencyOptions.length === 0) {
    return <div className="p-4">No currency rates available. Please add one from the settings tab to convert!</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <select value={fromCurrency || currencyOptions[0]} onChange={onFromChange} className="bg-blue-100 text-black px-3 py-2 rounded">
          {currencyOptions.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <input type="number" className="flex-1 bg-gray-100 rounded px-4 py-2" placeholder="Enter Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <input type="text" className="bg-gray-100 rounded px-4 py-2 w-full" placeholder="Enter description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex items-center space-x-2 mb-4 mt-3">
        <button className="bg-blue-500 text-white px-6 py-2 rounded w-full" onClick={handleConvert}>
          CONVERT
        </button>
        <select value={toCurrency || currencyOptions[0]} onChange={onToChange} className="bg-blue-100 text-black px-3 py-2 rounded">
          {currencyOptions.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <button className="bg-gray-200 px-3 py-2 rounded text-gray-800 hover:bg-gray-300 flex items-center space-x-2" onClick={onReverseClick}>
          🔄
        </button>
      </div>
      {result !== null && (
        <div className="border px-4 py-2 rounded text-center text-xl">
          {toCurrency} {result.toFixed(2)}
        </div>
      )}
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="font-semibold mt-3">Conversion History</h2>
        <div className="flex-1" />
        <button onClick={onClearLogs}>🗑️</button>
      </div>
      <div className="overflow-y-auto border rounded px-3 py-2 mt-2 bg-white shadow-sm" style={{ height: 300 }}>
        {logs.length === 0 ? (
          <p className="text-sm text-gray-500">No conversions yet.</p>
        ) : (
          <ul className="text-sm space-y-1">
            {logs.map((log, index) => (
              <li key={index} className="text-gray-700">
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
