import React, { FC } from "react";

import { hasBluetooth, connect } from "./bluetooth";

const App: FC = () => {
  if (!hasBluetooth()) {
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
