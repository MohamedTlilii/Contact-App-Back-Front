import { useState, useEffect } from "react";
import axios from "axios";
export const useFetch = (url, token) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(url, { headers: { token } })
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [data, url, token]);
  return { data, error };
};
