class api {
  async getCoords(address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }) {
    const results = await fetch(
      `/geocoder/locations/address?street=${address.street}&city=${address.city}&state=${address.state}&zip=${address.zip}&benchmark=Public_AR_Census2020&format=json`,
    );

    return results.json();
  }

  async getForecast(coords: { y: string; x: string }) {
    const results = await fetch(
      `https://api.weather.gov/points/${coords.y},${coords.x}`,
    );

    const json = await results.json();

    const forecast = await fetch(json.properties.forecast);

    return forecast.json();
  }
}

export default new api();
