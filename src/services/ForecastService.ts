import { Address, Coords, Forecast, Location } from '../types';
import api from '../api';

class ForecastService {
  async getWeeklyForecast(address: Address): Promise<Forecast[]> {
    const coords: Coords = await api.getCoords(address);

    console.log({ coords });

    const location: Location = await api.getLocation(coords);

    console.log({ location });

    const weeklyForecast: Forecast[] = await api.getWeeklyForecast(location);

    console.log({ weeklyForecast });

    return weeklyForecast;
  }

  formatAddress(result: string): Address {
    const resultArr = result.split(', ');

    const street = resultArr[0];
    const city = resultArr[1];
    const state = resultArr[2];

    return { street, city, state };
  }
}

const forecastService = new ForecastService();

export default forecastService;
