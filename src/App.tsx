import React, { FC, useState, useEffect } from "react";

import { getAvailability } from "./bluetooth";

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

  return <div>Dragons</div>;
};

export default App;
