import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";
import auth from "../firebase.config";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUpWithEmailAndPassword = (email, passworrd) => {
    return createUserWithEmailAndPassword(auth, email, passworrd);
  };

  const logInWithEmailAndPassword = (email, passworrd) => {
    return signInWithEmailAndPassword(auth, email, passworrd);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const authInfo = {
    user,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    signInWithGoogle,
    signInWithGithub,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
