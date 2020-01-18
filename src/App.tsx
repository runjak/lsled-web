import React, { FC, useState, useEffect } from "react";

import { getAvailability, connect } from "./bluetooth";

const useHasBluetooth = (): boolean => {
  const [has, setHas] = useState(false);

  useEffect(() => {
    getAvailability().then(hasBt => setHas(hasBt));
  }, [setHas]);

  return has;
};

const App: FC = () => {
  const gotBluetooth = useHasBluetooth();

  if (!gotBluetooth) {
    return <div>Bluetooth is not supported :(</div>;
  }

  return (
    <div className="App">
      <button onClick={connect}>Do the thing!</button>
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
