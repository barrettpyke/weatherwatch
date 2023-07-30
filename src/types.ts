export interface Address {
  street?: string;
  city?: string;
  state?: string;
}

export interface Coords {
  y: string;
  x: string;
}

export interface Location {
  cwa: string;
  gridX: string;
  gridY: string;
}

export interface Forecast {
  date: string;
  temp: string;
  tempUnit: string;
  humidity: string;
  description: string;
}

export interface ForecastLocation {
  city: string;
  state: string;
  weeklyForecast: Forecast[];
}
