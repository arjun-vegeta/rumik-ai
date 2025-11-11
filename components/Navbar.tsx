"use client";

import { useEffect, useState } from "react";
import NavbarClient from "./NavbarClient";

interface User {
  name?: string | null;
  email?: string | null;
  role?: string | null;
}

// Cache session data globally to prevent refetch on every navigation
let globalUserCache: User | null = null;
let isFetching = false;

export default function Navbar() {
  // Always start with null to match SSR
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Batch all state updates in a microtask to avoid cascading renders
    Promise.resolve().then(() => {
      setIsHydrated(true);
      
      // Load from cache
      if (globalUserCache) {
        setUser(globalUserCache);
        return;
      }
      
      try {
        const cached = sessionStorage.getItem("navbar_user");
        if (cached) {
          const cachedUser = JSON.parse(cached);
          globalUserCache = cachedUser;
          setUser(cachedUser);
          return;
        }
      } catch {
        // Invalid cache
      }
      
      // If already fetching, skip
      if (isFetching) return;
      
      isFetching = true;

      // Fetch session data
      fetch("/api/auth/session", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          const userData = data.user || null;
          setUser(userData);
          globalUserCache = userData;
          
          // Update sessionStorage cache
          if (userData) {
            sessionStorage.setItem("navbar_user", JSON.stringify(userData));
          } else {
            sessionStorage.removeItem("navbar_user");
          }
        })
        .catch(() => {
          setUser(null);
          globalUserCache = null;
          sessionStorage.removeItem("navbar_user");
        })
        .finally(() => {
          isFetching = false;
        });
    });
  }, []);

  // Pass both user and hydration state to prevent hydration mismatch
  return <NavbarClient user={user} isHydrated={isHydrated} />;
}
