import { useEffect, useState } from "react";
import { baseURL } from "../functions/fetchURL";

const useData = (endpoint = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}${endpoint}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [endpoint]);
  return { data, loading, error };
};

export default useData;
