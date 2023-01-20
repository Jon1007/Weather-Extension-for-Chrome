import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../components/WeatherCard";
import "contentScript.css";
import Card from "@mui/material/Card";
import { getStoredOptions, LocalStorageOptions } from "../utils/storage";
import {Message} from "@mui/icons-material";


// @ts-ignore
const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options)
      setIsActive(options.hasAutoOverlay)
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Message.TOGGLE_OVERLAY) {
        setIsActive(!isActive)
      }
    })
  },[])

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => {}}
          />
        </Card>
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
