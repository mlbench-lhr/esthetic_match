"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type User = { id: string; email: string; name?: string; image?: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (partial: Partial<NonNullable<User>>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify({ user, token }));
  }, [user, token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      // If response is not JSON (e.g., HTML error page), throw a generic error
      throw new Error(
        "Server error - please ensure the development server is running"
      );
    }

    if (!res.ok) throw new Error(data.error || "Login failed");

    setUser({
      id: String(data.user.id),
      email: data.user.email,
      name: data.user.name,
      image: data.user.image,
    });
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  const updateUser = (partial: Partial<NonNullable<User>>) => {
    setUser((prev) => {
      if (prev) return { ...prev, ...partial };
      // If no previous user, initialize minimal shape when possible
      return {
        id: (partial.id as string) || "",
        email: (partial.email as string) || "",
        name: partial.name,
        image: partial.image,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
