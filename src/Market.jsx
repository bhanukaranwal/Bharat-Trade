import React, { useContext, useEffect, useState } from "react";
import { MarketContext } from "../context/MarketContext";

const Market = () => {
  const { marketData, loading, error } = useContext(MarketContext);
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [instrumentFilter, setInstrumentFilter] = useState("All");
  const [exchangeFilter, setExchangeFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (marketData) {
      // Flatten market data types into one array with 'type' property
      const allInstruments = [];
      Object.entries(marketData).forEach(([key, arr]) => {
        const type = key === "etfs" ? "ETF" : key === "cryptos" ? "Crypto" : key === "indices" ? "Index" : "Stock";
        arr.forEach((item) => allInstruments.push({ ...item, type }));
      });
      setInstruments(allInstruments);
    }
  }, [marketData]);

  useEffect(() => {
    let data = instruments;

    if (instrumentFilter !== "All") {
      data = data.filter((item) => item.type === instrumentFilter);
    }

    if (exchangeFilter !== "All") {
      data = data.filter((item) => item.exchange === exchangeFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      data = data.filter(
        (item) =>
          item.symbol.toLowerCase().includes(term) ||
          item.name.toLowerCase().includes(term)
      );
    }

    setFilteredData(data);
  }, [searchTerm, instrumentFilter, exchangeFilter, instruments]);

  if (loading) return <p>Loading market data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  // (Table UI same as before, displaying filteredData...)

  return (
    <div>
      {/* Filters, Search Bar and Instruments table here as before */}
      {/* ... */}
    </div>
  );
};

export default Market;
