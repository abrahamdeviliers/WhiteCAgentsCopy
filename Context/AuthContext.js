import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved login on app start
  useEffect(() => {
    async function loadAuth() {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("sessionToken");

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setSessionToken(storedToken);
        }
      } catch (e) {
        console.log("Auth load error", e);
      } finally {
        setLoading(false);
      }
    }

    loadAuth();
  }, []);

  // Logout helper
  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setSessionToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        sessionToken,
        setSessionToken,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
