import { useEffect, useState } from "react";

const useFetch = (
  url = "https://practisetask-backend.vercel.app/",
  body = {},
  method = "GET"
) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      url,
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
        setResult(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [url, method, body]);
  return { result, loading };
};

export default useFetch;
