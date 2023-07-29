import React from 'react';
import { Forecast } from '../../types';

interface DailyForecastProps {
  forecast: Forecast;
}

const DailyForecast = (props: DailyForecastProps) => {
  const { forecast } = props;
  return (
    <div className="daily-forecast">
      <div>{forecast.name}</div>
      <div>{forecast.temp}</div>
      <div>{forecast.tempUnit}</div>
      <div>{forecast.humidity}</div>
      <div>{forecast.description}</div>
    </div>
  );
};

export default DailyForecast;
