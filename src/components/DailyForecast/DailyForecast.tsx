import React from 'react';
import Typography from '@mui/material/Typography';
import { iconService } from '../../services';
import { Forecast } from '../../types';
import './DailyForecast.css';

export interface DailyForecastProps {
  forecast: Forecast;
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  const forecastName = forecast.date === 'This Afternoon' ? 'Today' : forecast.date;
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
