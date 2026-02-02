import { useEffect, useState } from "react";

const useLocaleStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    let localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : initialValue;
  });
  console.log(value);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocaleStorage;
