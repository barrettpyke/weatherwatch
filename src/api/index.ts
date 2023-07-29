import { Address, Coords, Forecast, Location } from '../types';

const weatherConfig = {
  headers: {
    'User-Agent': 'weatherwatch',
  },
};

class api {
  async getCoords(address: Address): Promise<Coords> {
    const coordsResponse = await fetch(
      `/geocoder/locations/address?street=${address.street}&city=${address.city}&state=${address.state}&benchmark=Public_AR_Census2020&format=json`,
    );

    const json = await this.handleResponse(coordsResponse);

    const coords: Coords = json.result.addressMatches[0].coordinates;

    return coords;
  }

  async getLocation(coords: Coords): Promise<Location> {
    const locationResponse = await fetch(
      `https://api.weather.gov/points/${coords.y},${coords.x}`,
      weatherConfig,
    );

    const json = await this.handleResponse(locationResponse);

    const properties = json.properties;

    const location: Location = {
      cwa: properties.cwa,
      gridX: properties.gridX,
      gridY: properties.gridY,
    };

    return location;
  }

  async getWeeklyForecast(location: Location): Promise<Forecast[]> {
    const weeklyForecastResponse = await fetch(
      `https://api.weather.gov/gridpoints/${location.cwa}/${location.gridX},${location.gridY}/forecast`,
      weatherConfig,
    );

    const json = await this.handleResponse(weeklyForecastResponse);

    const weeklyForecast: Forecast[] = json.properties.periods
      .filter((period: any) => {
        return period.isDaytime === true;
      })
      .map((period: any) => {
        return {
          name: period.name,
          temp: period.temperature,
          tempUnit: period.temperatureUnit,
          humidity: period.relativeHumidity.value,
          description: period.shortForecast,
        };
      });

    return weeklyForecast;
  }

  async handleResponse(response: Response): Promise<any> {
    const result = await response.json();
    return result;
  }
}

export default new api();
