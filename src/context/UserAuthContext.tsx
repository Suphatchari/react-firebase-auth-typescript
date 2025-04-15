import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import { db, auth } from "../firebase";

interface SignUpWithUserInformationPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithUserInformation: (
    payload: SignUpWithUserInformationPayload
  ) => Promise<User>;
  getUserDetailsFromFirestore: (uid: string) => Promise<DocumentData | null>;
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

  function signUpWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithUserInformation({
    email,
    password,
    firstName,
    lastName,
    phone,
  }: SignUpWithUserInformationPayload) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Update displayName
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // ✅ Save to Firestore database
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        firstName,
        lastName,
        phone,
        createdAt: new Date(),
      });
      return user;
    } catch (error) {
      console.error("❌ Error in signUpWithUserInformation :", error);
      throw error;
    }
  }

  async function getUserDetailsFromFirestore(uid: string) {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        console.warn(`User with UID ${uid} not found in Firestore`);
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching user details from Firestore :", error);
      throw error;
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser ? currentUser : "❌ No user logged in");
      setUser(currentUser);
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        loading,
        logIn,
        signUpWithEmail,
        signUpWithUserInformation,
        getUserDetailsFromFirestore,
        logOut,
      }}
    >
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
