import React, { FC, useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";

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
    return <Alert severity="error">Bluetooth is not supported</Alert>;
  }

  return <div>Dragons</div>;
};

export default App;
