import React, { FC, useCallback } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

import { TextMessage, emptyTextMessage } from "./text";

type Props = {
  message: TextMessage;
  setMessage: (message: TextMessage) => void;
};

const TextMessageEditor: FC<Props> = ({ message, setMessage }) => {
  const doReset = useCallback(() => {
    setMessage(emptyTextMessage());
  }, [setMessage]);

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          TextMessageEditor
        </Typography>
        <TextField
          value={message.text}
          onChange={event => {
            setMessage({ ...message, text: event.target.value });
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={doReset}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
};

export default TextMessageEditor;
