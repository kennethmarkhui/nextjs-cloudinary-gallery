import { useState, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (request, setterFn, loader = true) => {
    if (loader) setIsLoading(true);
    try {
      const res = await fetch(request);
      if (!res.ok) {
        throw new Error("Fetching failed!");
      }
      const data = await res.json();
      setterFn(data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, fetchData };
};

export default useFetch;
