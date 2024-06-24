import { useEffect, useState } from "react";
import { baseURL } from "../functions/fetchURL";

const useFetch = (endpoint = "", body = {}, method = "GET") => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `${baseURL}/${endpoint}`,
      method != "GET" && {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResults(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [method, body, endpoint]);
  return { results, loading };
};

export default useFetch;
