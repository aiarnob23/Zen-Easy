// authcontext.tsx
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import Cookies from "js-cookie";
import { GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import auth from "../config/firebase.config";
import { serverBaseUrl } from "../utils/baseUrl";

//Type for the context
interface AuthContextType {
  EmailPassSignUp: (email: string, password: string) => Promise<UserCredential>;
  EmailPassLogIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  user: any;
  loading: boolean;
}

//Context
export const AuthContext = createContext<AuthContextType | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  //Email-Password SignUp
  const EmailPassSignUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //Email-Password LogIn
  const EmailPassLogIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  //Sign-Out
  const logOut = async () => {
    return await signOut(auth);
  };


  //onAuth state change handler
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        console.log("Firebase User:", currentUser);
        const email : string = currentUser?.email || '';
        // try {
        //     const res = await serverBaseUrl.post("auth/login", { email }); // Assuming this endpoint returns _id
        //     if (res?.data?.data?._id) {
        //         setSelfId(res.data.data._id);
        //         Cookies.set("accessToken", res.data.data.token, { expires: 7 }); // Example for token
        //         Cookies.set("email", email, { expires: 7 });
        //     }
        // } catch (error) {
        //     console.error("Error fetching selfId or token on auth state change:", error);
        // }

      }
      if (!currentUser) {
        setLoading(false);
        setUser(null); 
      }
    });
    return () => unSubscribe();
  }, []); 



  // auth info
  const authInfo: AuthContextType = {
    EmailPassSignUp,
    EmailPassLogIn,
    logOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;