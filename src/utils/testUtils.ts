import { screen } from '@testing-library/react';
import { Forecast } from '../types';

export const verifyDailyForecast = (forecast: Forecast) => {
  const date = screen.getByText(forecast.date);
  expect(date).toBeInTheDocument();
  const temp = screen.getByText(`${forecast.temp}\u00b0${forecast.tempUnit}`);
  expect(temp).toBeInTheDocument();
  const humidity = screen.getByText(`Humidity: ${forecast.humidity}%`);
  expect(humidity).toBeInTheDocument();
};
