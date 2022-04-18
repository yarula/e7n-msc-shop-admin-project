// useFetch.js
import { useState } from "react";

export default function useFetch() {
  const [loader, setLoader] = useState(true);

  function get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoader(false);
            reject(data);
          }
          setLoader(false);
          resolve(data);
        })
        .catch((error) => {
          setLoader(false);
          reject(error);
        });
    });
  }
  function post(url, body) {
    const requestOptions = {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "post"
    };
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoader(false);
            reject(data);
          }
          setLoader(false);
          resolve(data);
        })
        .catch((error) => {
          setLoader(false);
          reject(error);
        });
    });
  }
  return { get, post, loader };
}
