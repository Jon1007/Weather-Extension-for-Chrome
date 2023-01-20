import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import "WeatherCard.css";

// Api
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button onClick={onDelete}>
              <Typography className="weatherCard-body">Delete</Typography>
            </Button>
          )}
          {onDelete && <Button onClick={onDelete}>Delete</Button>}
        </CardActions>
      </Card>
    </Box>
  );
};

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete: () => void;
}> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .then((data) => {
        setWeatherData(data);
      })

      .catch((err) => setCardState(err));
  }, [city, tempScale]);

  if (cardState === "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState == "loading"
            ? "Loading..."
            : "Error: Could not take information fo this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weatherCard-title">{weatherData.name}</Typography>
      <Typography className="weatherCard-body">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography className="weatherCard-body">
        Feels like:{Math.round(weatherData.main.feels_like)}{" "}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
