import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./options.css";

// Material UI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

// Utils
import {
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityOptions = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    // @ts-ignore
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 1000);
    });
  };

  if (!options) {
    return null;
  }

  const isFilesDisabled = formState === "saving";

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City Name</Typography>
              <TextField
                fullWidth
                variant="standard"
                placeholder="Enter a home City"
                value={options.homeCity}
                onChange={(e) => handleHomeCityOptions(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Auto toggle overlay on webpage load</Typography>
              <Switch color="primary"
                        checked={options.hasAutoOverlay}
              onChange{(e,checked) => handleAutoOverlayChange(checked)}
              disabled={isFilesDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFilesDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
