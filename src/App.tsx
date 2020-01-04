import React from "react";

import { hasBluetooth } from "./bluetooth";

const App: React.FC = () => {
  if (!hasBluetooth()) {
    return <div>Bluetooth is not supported :(</div>;
  }

  return (
    <div className="App">
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
