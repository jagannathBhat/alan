import React, { useEffect, useRef, useState } from "react";

import Routes from "./Routes";
import "./App.css";

const App = () => {
  const [hash, setHash] = useState(window.location.hash);
  const hashChangeListener = useRef(null);

  useEffect(() => {
    hashChangeListener.current = window.addEventListener("hashchange", () =>
      setHash(window.location.hash),
    );
    return () =>
      window.removeEventListener("hashchange", hashChangeListener.current);
  }, []);

  return <Routes hash={hash} />;
};

export default App;
