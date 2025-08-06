import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Market from "./components/Market";
import Trade from "./components/Trade";
import Portfolio from "./components/Portfolio";
import Watchlist from "./components/Watchlist";
import Education from "./components/Education";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <nav className="w-64 bg-blue-600 text-white p-4 hidden md:block">
          <h1 className="text-2xl font-bold mb-4">Bharat Trade</h1>
          <ul>
            <li>
              <a href="/dashboard" className="flex items-center py-2">
                <span className="mr-2">₹</span>Dashboard
              </a>
            </li>
            <li>
              <a href="/market" className="py-2 block">Market</a>
            </li>
            <li>
              <a href="/trade" className="py-2 block">Trade</a>
            </li>
            <li>
              <a href="/portfolio" className="py-2 block">Portfolio</a>
            </li>
            <li>
              <a href="/watchlist" className="py-2 block">Watchlist</a>
            </li>
            <li>
              <a href="/education" className="py-2 block">Education</a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/education" element={<Education />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
