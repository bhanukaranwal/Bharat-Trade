import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple PAN validation (Indian PAN format)
const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    pan: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidPAN(form.pan.toUpperCase())) {
      return setError("Invalid PAN format. Example: ABCDE1234F");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    // Mock registration success (in reality you'd check duplicates etc.)
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && (
        <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-600 border border-green-600 p-2 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleRegister} className="space-y-4">
        <label className="block">
          <span>Name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span>Email</span>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span>Password</span>
          <input
            type="password"
            name="password"
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block">
          <span>PAN Card Number</span>
          <input
            type="text"
            name="pan"
            maxLength={10}
            className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700 uppercase"
            value={form.pan}
            onChange={(e) =>
              setForm({ ...form, pan: e.target.value.toUpperCase() })
            }
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
