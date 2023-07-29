import React, { useEffect, useState } from 'react';
import forecastService from './services/ForecastService';
import AddressField from './components/AddressField/AddressField';
import { Address, Forecast } from './types';
import './App.css';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';

const App = () => {
  const [value, setValue] = useState<Address>();
  const [weeklyForecast, setWeeklyForecast] = useState<Forecast[]>([]);

  useEffect(() => {
    getResult();
  }, [value]);

  const onValueChange = (value: any) => {
    if (value) {
      const address = forecastService.formatAddress(value.label);
      setValue(address);
    }
  };

  console.log({ value });
  const getResult = async () => {
    if (value) {
      const weeklyForecastResult = await forecastService.getWeeklyForecast(value);
      setWeeklyForecast(weeklyForecastResult);
      setValue(undefined);
    }
  };

  return (
    <div className="container">
      <AddressField value={value} onChange={onValueChange} />
      <WeeklyForecast weeklyForecast={weeklyForecast} />
    </div>
  );
};

export default App;
