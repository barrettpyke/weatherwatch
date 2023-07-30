import React from 'react';
import { render, screen } from '@testing-library/react';
import { Forecast } from '../../types';
import DailyForecast, { DailyForecastProps } from './DailyForecast';
import { verifyDailyForecast } from '../../utils/testUtils';

const forecastMock: Forecast = {
  date: 'Today',
  temp: '97',
  tempUnit: 'F',
  humidity: '10',
  description: 'Sunny',
};

const setup = () => {
  const props: DailyForecastProps = {
    forecast: forecastMock,
  };

  render(<DailyForecast {...props} />);
};

describe('DailyForecast tests', () => {
  beforeEach(() => {
    setup();
  });
  it('should render the daily forecast details', () => {
    verifyDailyForecast(forecastMock);
  });
  it('should render the correct icon', () => {
    const sunnyIcon = screen.getByTestId('WbSunnyIcon');
    expect(sunnyIcon).toBeInTheDocument();
  });
});
