import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("https://practisetask-backend.vercel.app/").then((res) =>
      console.log(res)
    );
    // .then((data) => console.log(data));
  }, []);
  return <></>;
}

export default App;
