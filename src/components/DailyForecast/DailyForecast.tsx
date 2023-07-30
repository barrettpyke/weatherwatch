import React from 'react';
import { Forecast } from '../../types';
import iconService from '../../services/IconService';
import Typography from '@mui/material/Typography';
import './DailyForecast.css';

interface DailyForecastProps {
  forecast: Forecast;
}

const DailyForecast = (props: DailyForecastProps) => {
  const { forecast } = props;

  const forecastName = forecast.name === 'This Afternoon' ? 'Today' : forecast.name;
  const icon = iconService.getIcon(forecast.description);

  return (
    <div className="daily-forecast">
      <Typography variant="h5">{forecastName}</Typography>
      <div className="forecast-details">
        <div>{icon}</div>
        <Typography variant="subtitle1">
          <strong>
            {forecast.temp}&deg;{forecast.tempUnit}
          </strong>
        </Typography>
        <Typography variant="subtitle1">Humidity: {forecast.humidity}%</Typography>
      </div>
    </div>
  );
};

export default DailyForecast;
