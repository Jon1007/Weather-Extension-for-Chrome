import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";

//Material UI components
import { Paper } from "@mui/material";
import { InputBase } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { Grid } from "@mui/material/Grid";
import PictureInPictureIcon from "@mui/icons-material/PictureInPictureIcon";

// Utils
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";
import {Message} from "@mui/icons-material";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityClick = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updateOptions).then(() => setOptions(updateOptions))
  };

  const handleOverlayButtonClick = () => {
  chrome.tabs.query({
    active:true
  },(tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id,Message.TOGGLE_OVERLAY)
    }
  })
  }
}

  if (!options) {
    return null;
  }

  // @ts-ignore
  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
              />
              <IconButton onClick={handleCityClick}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box px="4px">
              <IconButton onClick={handleTempScaleClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box px="6px">
              <IconButton onClick={handleOverlayButtonClick}>
<PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != "" && <WeatherCard city={options.homeCity} tempScale={options.tempScale} onDelete={() =>{}}
      {cities.map((city, idx) =>
        (
          <WeatherCard
              tempScale={options.tempScale}
            city={city}
            onDelete={() => handleCityDeleteClick(idx)}
            key={idx}
          />
        ).reverse()
      )}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
