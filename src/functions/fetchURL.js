import { useState } from "react";

const fetchURL = (
  body = {},
  method = "GET",
  url = "https://practisetask-backend.vercel.app/"
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [result, setResult] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
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
  return { result, loading };
};

export default fetchURL;
