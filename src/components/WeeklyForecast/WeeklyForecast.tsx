import React from 'react';
import { Forecast } from '../../types';
import DailyForecast from '../DailyForecast.tsx/DailyForecast';

interface WeeklyForecastProps {
  weeklyForecast: Forecast[];
}

const WeeklyForecast = (props: WeeklyForecastProps) => {
  const { weeklyForecast } = props;
  return (
    <div className="weekly-forecast">
      {weeklyForecast.map((forecast, index) => {
        return <DailyForecast forecast={forecast} key={index} />;
      })}
    </div>
  );
};

export default WeeklyForecast;
