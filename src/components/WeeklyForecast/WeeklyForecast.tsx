import React from 'react';
import { Forecast } from '../../types';
import DailyForecast from '../DailyForecast/DailyForecast';
import { Card, Typography } from '@mui/material';
import './WeeklyForecast.css';

interface WeeklyForecastProps {
  weeklyForecast: Forecast[];
  city: string;
  state: string;
}

const WeeklyForecast = (props: WeeklyForecastProps) => {
  const { weeklyForecast, city, state } = props;
  if (weeklyForecast.length > 0) {
    return (
      <div>
        <Typography className="weekly-forecast-header" variant="h5" gutterBottom>
          {city}, {state}
        </Typography>
        <Card variant="outlined">
          <div className="weekly-forecast">
            {weeklyForecast.map((forecast, index) => {
              return <DailyForecast forecast={forecast} key={index} />;
            })}
          </div>
        </Card>
      </div>
    );
  } else {
    return <></>;
  }
};

export default WeeklyForecast;
