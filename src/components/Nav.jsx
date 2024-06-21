import { useContext } from "react";
import AuthProvider from "../Providers/AuthProvider";

const Nav = () => {
  const { user } = useContext(AuthProvider);
  console.log(user);
  return <div>Nav</div>;
};

export default Nav;
