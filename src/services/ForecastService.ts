import { Address, Coords, Location, WeeklyForecast } from '../types';
import api from '../api';

class ForecastService {
  async getWeeklyForecast(address: Address): Promise<WeeklyForecast> {
    const coords: Coords = await api.getCoords(address);

    const location: Location = await api.getLocation(coords);

    const weeklyForecast: WeeklyForecast = await api.getWeeklyForecast(location);

    return weeklyForecast;
  }
}

const forecastService = new ForecastService();

export default forecastService;
