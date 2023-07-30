import React from 'react';
import api, { Api, weatherConfig } from '.';
import { Address, Coords, Location } from '../types';
import {
  todayForecast,
  mondayForecast,
  weeklyForecastMock,
  tuesdayForecast,
} from '../utils/testMocks';
import constants from '../utils/globalConstants.json';

const address: Address = {
  street: '123 Main St',
  city: 'Miami',
  state: 'FL',
};

const addressMatchResponse = {
  result: {
    addressMatches: [
      {
        coordinates: {
          x: '-87.70715106620871',
          y: '41.92237887313281',
        },
      },
    ],
  },
};

const expectedLocation: Location = {
  cwa: 'LWA',
  gridX: '12.33',
  gridY: '44.22',
};

const locationResponse = {
  properties: {
    cwa: expectedLocation.cwa,
    gridX: expectedLocation.gridX,
    gridY: expectedLocation.gridY,
  },
};

const expectedCoords: Coords = {
  x: addressMatchResponse.result.addressMatches[0].coordinates.x,
  y: addressMatchResponse.result.addressMatches[0].coordinates.y,
};

const expectedWeeklyForecast = weeklyForecastMock;

const weeklyForecastResponse = {
  properties: {
    periods: [
      {
        name: todayForecast.date,
        isDaytime: true,
        temperature: todayForecast.temp,
        temperatureUnit: todayForecast.tempUnit,
        relativeHumidity: {
          value: todayForecast.humidity,
        },

        shortForecast: todayForecast.description,
      },
      {
        name: mondayForecast.date,
        isDaytime: true,
        temperature: mondayForecast.temp,
        temperatureUnit: mondayForecast.tempUnit,
        relativeHumidity: {
          value: mondayForecast.humidity,
        },

        shortForecast: mondayForecast.description,
      },
      {
        name: tuesdayForecast.date,
        isDaytime: true,
        temperature: tuesdayForecast.temp,
        temperatureUnit: tuesdayForecast.tempUnit,
        relativeHumidity: {
          value: tuesdayForecast.humidity,
        },

        shortForecast: tuesdayForecast.description,
      },
    ],
  },
};

const createResolveResponse = (result: any) => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => result,
  } as Response);
};

describe('api tests', () => {
  let api: Api;

  beforeEach(() => {
    api = new Api();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('getCoords should return coords if there are address matches', async () => {
    fetchMock.mockResolvedValue(createResolveResponse(addressMatchResponse));
    const result = await api.getCoords(address);

    expect(fetchMock).toHaveBeenCalledWith(
      `/geocoder/locations/address?street=${address.street}&city=${address.city}&state=${address.state}&benchmark=Public_AR_Census2020&format=json`,
      undefined,
    );

    expect(result).toStrictEqual(expectedCoords);
  });

  test('getLocation should call correct url', async () => {
    fetchMock.mockResolvedValue(createResolveResponse(locationResponse));
    await api.getLocation(expectedCoords);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.weather.gov/points/${expectedCoords.y},${expectedCoords.x}`,
      weatherConfig,
    );
  });

  test('getWeeklyForecast should return weekly forecast array', async () => {
    fetchMock.mockResolvedValue(createResolveResponse(weeklyForecastResponse));
    const result = await api.getWeeklyForecast(expectedLocation);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.weather.gov/gridpoints/${expectedLocation.cwa}/${expectedLocation.gridX},${expectedLocation.gridY}/forecast`,
      weatherConfig,
    );

    expect(result).toStrictEqual(expectedWeeklyForecast);
  });
});
