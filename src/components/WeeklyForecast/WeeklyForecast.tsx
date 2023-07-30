import React from 'react';
import DailyForecast from '../DailyForecast';
import { Button, Card, Typography } from '@mui/material';
import { Forecast } from '../../types';
import './WeeklyForecast.css';

export interface WeeklyForecastProps {
  weeklyForecast: Forecast[];
  city: string;
  state: string;
  onRemoveClick: any;
}

const WeeklyForecast = ({
  weeklyForecast,
  city,
  state,
  onRemoveClick,
}: WeeklyForecastProps) => {
  if (weeklyForecast.length > 0) {
    return (
      <div>
        <div className="weekly-forecast-header">
          <Typography variant="h5" gutterBottom>
            {city}, {state}
          </Typography>
          <Button onClick={onRemoveClick}>Remove</Button>
        </div>
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
    return null;
  }
};

export default WeeklyForecast;
