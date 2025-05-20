import { useEffect, useState } from "react";

export function useElectronReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.electron) {
        clearInterval(timer);
        setIsReady(true);
      }
    }, 500);
  }, []);

  return isReady;
}
