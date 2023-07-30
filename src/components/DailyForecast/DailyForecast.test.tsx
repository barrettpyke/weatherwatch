import React from 'react';
import { render, screen } from '@testing-library/react';
import { todayForecast } from '../../utils/testMocks';
import DailyForecast, { DailyForecastProps } from './DailyForecast';
import { verifyDailyForecast } from '../../utils/testUtils';

const setup = (description: string = 'sunny') => {
  todayForecast.description = description;

  const props: DailyForecastProps = {
    forecast: todayForecast,
  };

  render(<DailyForecast {...props} />);
};

describe('DailyForecast tests', () => {
  it('should render the daily forecast details', () => {
    setup();
    verifyDailyForecast(todayForecast);
  });

  describe('icon tests', () => {
    it('should render WbSunny if description contains sunny', () => {
      setup();
      verifyIcon('WbSunnyIcon');
    });

    it('should render the Thunderstorm if description contains thunderstorm', () => {
      setup('thunderstorm');
      verifyIcon('ThunderstormIcon');
    });

    it('should render the WaterDrop if description contains rain', () => {
      setup('rain');
      verifyIcon('WaterDropIcon');
    });

    it('should render the Cloud if description contains clody', () => {
      setup('cloudy');
      verifyIcon('CloudIcon');
    });

    it('should render the error if description contains no key words', () => {
      setup('test');
      verifyIcon('ErrorIcon');
    });
  });

  const verifyIcon = (testId: string) => {
    const icon = screen.getByTestId(testId);
    expect(icon).toBeInTheDocument();
  };
});
