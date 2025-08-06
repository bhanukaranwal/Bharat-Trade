import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  {
    email: "user@example.com",
    password: "password123",
    pan: "ABCDE1234F",
    name: "John Doe",
    accountBalance: 100000,
  },
];

// Simple PAN validation (Indian PAN format)
const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return setError("Invalid email or password");
    }

    // Store mocked JWT token in localStorage
    const token = btoa(JSON.stringify({ email: user.email, pan: user.pan }));
    localStorage.setItem("token", token);
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && (
        <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span>Email</span>
          <input
            type="email"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span>Password</span>
          <input
            type="password"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
