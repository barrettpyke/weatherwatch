import React from 'react';
import { render, screen } from '@testing-library/react';
import { Forecast } from '../../types';
import WeeklyForecast, { WeeklyForecastProps } from './WeeklyForecast';
import { verifyDailyForecast } from '../../utils/testUtils';

const todayForecast: Forecast = {
  date: 'Today',
  temp: '97',
  tempUnit: 'F',
  humidity: '10',
  description: 'Sunny',
};

const mondayForecast: Forecast = {
  date: 'Monday',
  temp: '84',
  tempUnit: 'F',
  humidity: '20',
  description: 'Thunderstorm',
};

const tuesdayForecast: Forecast = {
  date: 'Tuesday',
  temp: '45',
  tempUnit: 'F',
  humidity: '60',
  description: 'Rainy',
};

const weeklyForecastMock: Forecast[] = [todayForecast, mondayForecast, tuesdayForecast];

const setup = () => {
  const props: WeeklyForecastProps = {
    weeklyForecast: weeklyForecastMock,
    city: 'Miami',
    state: 'FL',
    onRemoveClick: () => {},
  };

  render(<WeeklyForecast {...props} />);
};

describe('WeeklyForecast tests', () => {
  beforeEach(() => {
    setup();
  });
  it('should render city and state header', () => {
    const cityState = screen.getByText('Miami, FL');
    expect(cityState).toBeInTheDocument();
  });
  it('should render remove button', () => {
    const removeBtn = screen.getByText('Remove');
    expect(removeBtn).toBeInTheDocument();
  });
  it('should render the daily forecast for each weeklyForecast item', () => {
    weeklyForecastMock.forEach((forecast) => {
      verifyDailyForecast(forecast);
    });
  });
});
