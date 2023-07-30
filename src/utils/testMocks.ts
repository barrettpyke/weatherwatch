import { Forecast } from '../types';

export const todayForecast: Forecast = {
  date: 'Today',
  temp: '97',
  tempUnit: 'F',
  humidity: '10',
  description: 'Sunny',
};

export const mondayForecast: Forecast = {
  date: 'Monday',
  temp: '84',
  tempUnit: 'F',
  humidity: '20',
  description: 'Thunderstorm',
};

export const tuesdayForecast: Forecast = {
  date: 'Tuesday',
  temp: '45',
  tempUnit: 'F',
  humidity: '60',
  description: 'Rainy',
};

export let weeklyForecastMock: Forecast[] = [
  todayForecast,
  mondayForecast,
  tuesdayForecast,
];
