import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import auth from "../firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  const authInfo = { user };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
