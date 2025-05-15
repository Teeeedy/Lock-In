import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 1. Define the types
interface User {
  id: string;
  name: string;
  email: string;
  // Add more user fields as needed
}

type AuthContextType = {
  user: User | false | null;
  setUser: React.Dispatch<React.SetStateAction<User | false | null>>;
  loading: boolean;
};

// 2. Create the context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Create and export the provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | false | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user as User);
        } else {
          setUser(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Session fetch failed:", err);
        setUser(false);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Custom hook for easy access to AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
