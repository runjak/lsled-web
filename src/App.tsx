import React, { FC, useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";

import TextMessageEditor from "./TextMessageEditor";

import { getAvailability } from "./bluetooth";
import { emptyTextMessage } from "./text";

const useHasBluetooth = (): boolean => {
  const [has, setHas] = useState(false);

  useEffect(() => {
    getAvailability().then(hasBt => setHas(hasBt));
  }, [setHas]);

  return has;
};

const App: FC = () => {
  const gotBluetooth = useHasBluetooth();
  const [textMessage, setTextMessage] = useState(emptyTextMessage());

  if (!gotBluetooth) {
    return <Alert severity="error">Bluetooth is not supported</Alert>;
  }

  return (
    <div>
      <TextMessageEditor message={textMessage} setMessage={setTextMessage} />
    </div>
  );
};

export default App;
