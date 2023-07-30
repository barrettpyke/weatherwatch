import { Address, Coords, Forecast, Location } from '../types';
import constants from '../globalConstants.json';

const weatherConfig: RequestInit = {
  headers: {
    'User-Agent': 'weatherwatch',
  },
};

class api {
  async getCoords(address: Address): Promise<Coords> {
    const anyAddressPartUndefined =
      address.city === undefined ||
      address.state === undefined ||
      address.street === undefined;

    if (!anyAddressPartUndefined) {
      const coordsResponse = await this.getRequest(
        `/geocoder/locations/address?street=${address.street}&city=${address.city}&state=${address.state}&benchmark=Public_AR_Census2020&format=json`,
      );

      const json = await this.handleResponse(coordsResponse);

      const addressMatches = json.result.addressMatches;

      if (addressMatches.length > 0) {
        return addressMatches[0].coordinates;
      } else {
        throw Error(constants.errors.noCoordsFound);
      }
    } else {
      throw Error(constants.errors.enterFullAddress);
    }
  }

  async getLocation(coords: Coords): Promise<Location> {
    const locationResponse = await this.getRequest(
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
    const weeklyForecastResponse = await this.getRequest(
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

  async getRequest(url: string, config?: RequestInit): Promise<Response> {
    try {
      const response = await fetch(url, config);
      if (response.ok) {
        return response;
      } else {
        throw Error(constants.errors.fetch);
      }
    } catch (error) {
      throw Error(constants.errors.fetch);
    }
  }
}

export default new api();
