import React, { useState } from "react";

// Mock instrument list for trade selection; in real setup, fetch from API
const mockInstruments = [
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE" },
  { symbol: "TCS", name: "Tata Consultancy Services", exchange: "BSE" },
  { symbol: "NIFTY", name: "NIFTY 50", exchange: "NSE" },
  { symbol: "INFY", name: "Infosys Ltd", exchange: "NSE" },
  { symbol: "BTC/INR", name: "Bitcoin INR", exchange: "WazirX" },
];

const orderTypes = ["Market", "Limit", "Stop-Loss", "Intraday (MIS)"];

// Mock fee constants
const BROKERAGE_RATE = 0.0005; // 0.05%
const SEBI_STT_CHARGE = 0.0001; // 0.01%

const Trade = () => {
  const [form, setForm] = useState({
    instrument: mockInstruments[0].symbol,
    action: "Buy",
    orderType: "Market",
    quantity: 1,
    price: "",
  });
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  // Mock price for selected instrument
  const getPrice = (symbol) => {
    const instrument = mockInstruments.find((i) => i.symbol === symbol);
    // Hardcoded prices (in real app, would be dynamic)
    switch (symbol) {
      case "RELIANCE":
        return 2900.5;
      case "TCS":
        return 4200.75;
      case "NIFTY":
        return 17600;
      case "INFY":
        return 1400;
      case "BTC/INR":
        return 4800000;
      default:
        return 100;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For quantity and price, ensure numeric values
    if ((name === "quantity" || name === "price") && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return;
      }
    }

    setForm({ ...form, [name]: value });
    setError("");
    setConfirmation(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const qty = parseFloat(form.quantity);
    if (isNaN(qty) || qty <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    if (form.orderType !== "Market") {
      const priceVal = parseFloat(form.price);
      if (isNaN(priceVal) || priceVal <= 0) {
        setError("Valid price is required for this order type.");
        return;
      }
    }

    const price = form.orderType === "Market" ? getPrice(form.instrument) : parseFloat(form.price);

    const orderValue = price * qty;
    const brokerage = orderValue * BROKERAGE_RATE;
    const sebiStt = orderValue * SEBI_STT_CHARGE;
    const totalCharges = brokerage + sebiStt;
    const netAmount = form.action === "Buy" ? orderValue + totalCharges : orderValue - totalCharges;

    setConfirmation({
      instrument: form.instrument,
      action: form.action,
      orderType: form.orderType,
      quantity: qty,
      price,
      brokerage: brokerage.toFixed(2),
      sebiStt: sebiStt.toFixed(2),
      totalCharges: totalCharges.toFixed(2),
      netAmount: netAmount.toFixed(2),
      status: "Executed (mock)",
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Trade</h2>
      {error && (
        <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span>Instrument</span>
          <select
            name="instrument"
            value={form.instrument}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
          >
            {mockInstruments.map(({ symbol, name }) => (
              <option key={symbol} value={symbol}>
                {symbol} - {name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span>Action</span>
          <select
            name="action"
            value={form.action}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
          >
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>

        <label className="block">
          <span>Order Type</span>
          <select
            name="orderType"
            value={form.orderType}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
          >
            {orderTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span>Quantity</span>
          <input
            type="number"
            min="1"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            required
          />
        </label>

        {form.orderType !== "Market" && (
          <label className="block">
            <span>Price (₹)</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
              required
            />
          </label>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Place Order
        </button>
      </form>

      {confirmation && (
        <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 border border-green-600 rounded">
          <h3 className="font-semibold mb-2">Order Confirmation</h3>
          <p>
            {confirmation.action} {confirmation.quantity} shares of{" "}
            {confirmation.instrument} at ₹{confirmation.price.toFixed(2)} (
            {confirmation.orderType})
          </p>
          <p>Brokerage: ₹{confirmation.brokerage}</p>
          <p>SEBI/STT Charges: ₹{confirmation.sebiStt}</p>
          <p>Total Charges: ₹{confirmation.totalCharges}</p>
          <p>
            Net {confirmation.action === "Buy" ? "Debit" : "Credit"}: ₹
            {confirmation.netAmount}
          </p>
          <p>Status: {confirmation.status}</p>
        </div>
      )}
    </div>
  );
};

export default Trade;
