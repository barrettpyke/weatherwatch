import React, { useEffect, useState } from 'react';
import AddressField from './components/AddressField';
import WeeklyForecast from './components/WeeklyForecast';
import { Alert, CircularProgress } from '@mui/material';
import { forecastService } from './services';
import { Address, ForecastLocation } from './types';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const [value, setValue] = useState<Address>();
  const [forecastLocations, setForecastLocations] = useState<ForecastLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getResult();
  }, [value]);

  const onValueChange = (value: any) => {
    if (value) {
      setLoading(true);
      const address = forecastService.formatAddress(value.label);
      setValue(address);
      setError('');
    }
  };

  const onComplete = () => {
    setLoading(false);
    setValue(undefined);
  };

  const removeForecast = (index: number) => {
    const forecastLocationsCopy = forecastLocations.slice(0);
    forecastLocationsCopy.splice(index, 1);
    setForecastLocations(forecastLocationsCopy);
  };

  const getResult = async () => {
    if (value) {
      try {
        const weeklyForecastResult = await forecastService.getWeeklyForecast(value);

        const isCurrentLocation =
          forecastLocations.length > 0
            ? forecastLocations.some((location: ForecastLocation) => {
                return location.city === value.city && location.state === value.state;
              })
            : false;

        if (value.city && value.state && !isCurrentLocation) {
          const newLocation: ForecastLocation = {
            city: value.city,
            state: value.state,
            weeklyForecast: weeklyForecastResult,
          };
          setForecastLocations((prevValues) => [...prevValues, newLocation]);
        }
      } catch (error) {
        let message = 'Something went wrong, please try again.';
        if (error instanceof Error) message = error.message;
        setError(message);
      }
      onComplete();
    }
  };

  return (
    <div className="container">
      {loading && !error && (
        <CircularProgress size="4rem" style={{ marginTop: '2rem' }} />
      )}
      {!loading && (
        <>
          {error && <Alert severity="error">{error}</Alert>}
          <AddressField value={value} onChange={onValueChange} />
          {forecastLocations.map((forecastLocation: ForecastLocation, index: number) => {
            return (
              <WeeklyForecast
                weeklyForecast={forecastLocation.weeklyForecast}
                city={forecastLocation.city}
                state={forecastLocation.state}
                onRemoveClick={() => removeForecast(index)}
                key={index}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default App;
