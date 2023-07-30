import React from 'react';
import { render, screen } from '@testing-library/react';
import { weeklyForecastMock } from '../../utils/testMocks';
import WeeklyForecast, { WeeklyForecastProps } from './WeeklyForecast';
import { verifyDailyForecast } from '../../utils/testUtils';

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
