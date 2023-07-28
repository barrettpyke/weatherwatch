import React, { useEffect, useState } from 'react';
import forecastService from './services/ForecastService';
import AddressField from './components/AddressField/AddressField';

const App = () => {
  const [address, setAddress] = useState({});
  const testAddress = {
    street: '2202 N Kedzie',
    city: 'Chicago',
    state: 'IL',
    zip: '60647',
  };
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    forecastService.getWeeklyForecast(testAddress);
  };
  return (
    <div>
      <AddressField />
    </div>
  );
};

export default App;
