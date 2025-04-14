import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<unknown>;
  signUp: (email: string, password: string) => Promise<unknown>;
  logOut: () => Promise<void>;
}

const userAuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserAuthContextProviderProps {
  children: ReactNode;
}

export function UserAuthContextProvider({
  children,
}: UserAuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth :", currentUser ? currentUser : "No user logged in");
      setUser(currentUser);
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, loading, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
// This hook can be used in any component that is a child of the UserAuthContextProvider
// It throws an error if used outside of the provider
// eslint-disable-next-line react-refresh/only-export-components
export function useUserAuth(): AuthContextType {
  const context = useContext(userAuthContext);

  if (!context) {
    throw new Error(
      "useUserAuth must be used within a UserAuthContextProvider"
    );
  }

  return context;
}
