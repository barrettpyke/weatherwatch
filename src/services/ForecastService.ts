import { Address, Coords, Forecast, Location } from '../types';
import api from '../api';

class ForecastService {
  async getWeeklyForecast(address: Address): Promise<Forecast[]> {
    const coords: Coords = await api.getCoords(address);

    const location: Location = await api.getLocation(coords);

    const weeklyForecast: Forecast[] = await api.getWeeklyForecast(location);

    return weeklyForecast;
  }

  formatAddress(result: string): Address {
    let street;
    let city;
    let state;

    const resultArr = result.split(', ');

    if (resultArr.length === 4) {
      street = resultArr[0];
      city = resultArr[1];
      state = resultArr[2];
    }

    return { street, city, state };
  }
}

const forecastService = new ForecastService();

export default forecastService;
