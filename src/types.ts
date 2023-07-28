export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
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
  name: string;
  temp: string;
  tempUnit: string;
  humidity: string;
  description: string;
}

export type WeeklyForecast = Forecast[];