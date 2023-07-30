import { Address, Coords, Forecast, Location } from '../types';
import { ForecastService } from './ForecastService';
import api from '../api';

const address: Address = {
  street: '123 Main St',
  city: 'Miami',
  state: 'FL',
};
const coords: Coords = {
  x: '-86.1234567',
  y: '40.1234567',
};

const location: Location = {
  cwa: 'LOT',
  gridX: '70',
  gridY: '56',
};

const weeklyForecast: Forecast[] = [
  {
    date: 'This Afternoon',
    temp: '77',
    tempUnit: 'F',
    humidity: '64',
    description: 'Mostly Sunny',
  },
  {
    date: 'Monday',
    temp: '77',
    tempUnit: 'F',
    humidity: '81',
    description: 'Sunny',
  },
];

const undefinedAddress = { street: undefined, city: undefined, state: undefined };

jest.mock('../api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('ForecastService tests', () => {
  let forecastService: ForecastService;
  beforeEach(() => {
    forecastService = new ForecastService();
  });

  test('getWeeklyForecast should call the api correctly', async () => {
    mockedApi.getCoords.mockResolvedValue(coords);
    mockedApi.getLocation.mockResolvedValue(location);
    mockedApi.getWeeklyForecast.mockResolvedValue(weeklyForecast);

    await forecastService.getWeeklyForecast(address);

    expect(mockedApi.getCoords).toHaveBeenCalledWith(address);
    expect(mockedApi.getLocation).toHaveBeenCalledWith(coords);
    expect(mockedApi.getWeeklyForecast).toHaveBeenCalledWith(location);
  });
  describe('formatAddress', () => {
    const { street, city, state } = address;
    it('should return address if all parts are present', () => {
      const result = forecastService.formatAddress(`${street}, ${city}, ${state}, USA`);

      expect(result).toStrictEqual(address);
    });
    it('should return undefined if all parts are not present', () => {
      const result = forecastService.formatAddress(`${street}, ${city}, ${state}`);

      expect(result).toStrictEqual(undefinedAddress);
    });
  });
});
