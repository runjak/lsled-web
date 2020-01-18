import React, { FC, useState, useEffect, useCallback } from "react";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import TextMessageEditor from "./TextMessageEditor";

import { getAvailability, uploadMessages } from "./bluetooth";
import { emptyTextMessage, toMessage } from "./text";

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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);

  const doUpload = useCallback(async () => {
    setUploading(true);
    const uploadError = await uploadMessages([toMessage(textMessage)]);
    setUploading(false);
    setUploadError(uploadError);
  }, [textMessage, setUploading, setUploadError]);

  if (!gotBluetooth) {
    return <Alert severity="error">Bluetooth is not supported</Alert>;
  }

  return (
    <Container>
      {uploadError && <Alert severity="warning">{uploadError}</Alert>}
      <TextMessageEditor message={textMessage} setMessage={setTextMessage} />
      <Button
        variant="contained"
        color="primary"
        disabled={uploading}
        onClick={doUpload}
      >
        <span role="img" aria-label="rocket">
          🚀
        </span>
        Upload!
      </Button>
    </Container>
  );
};

export default App;
