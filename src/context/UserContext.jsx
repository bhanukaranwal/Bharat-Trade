import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { email, name, pan, accountBalance }
  const [token, setToken] = useState(null);

  useEffect(() => {
    // On mount, check localStorage for token and decode user info
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const userData = JSON.parse(atob(storedToken));
        // Mock user data lookup, expand as per real backend later
        setUser({
          email: userData.email,
          pan: userData.pan,
          name: "John Doe",
          accountBalance: 100000,
        });
        setToken(storedToken);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
