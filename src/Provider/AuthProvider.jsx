import { message } from "antd";
import axios from "axios";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const FBprovider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    console.log("🚀 ~ login ~ email, password:", email, password);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("access-token", token);
      setUser(user);
      message.success("Login successful");
    } catch (error) {
      message.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  const signinWithGoogle = async() => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() => setLoading(false));
  };
  const facebookSignIn = async() => {
    setLoading(true);
    return signInWithPopup(auth, FBprovider).finally(() => setLoading(false));
  };
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      })
      .catch((error) => console.error("Sign out error:", error))
      .finally(() => setLoading(false));
  };
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (token) {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/verifyToken", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setUser(response.data);
        }
      }
    } catch (error) {
      if (error.response.data.message == "Unauthorize access") {
        localStorage.removeItem("access-token");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  const authInfo = {
    user,
    setUser,
    login,
    loading,
    error,
    logOut,
    signinWithGoogle,
    facebookSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
