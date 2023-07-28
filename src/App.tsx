import React, { useEffect, useState } from 'react';
import api from './api';

const App = () => {
  const [address, setAddress] = useState('');
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
    const result = await api.getCoords(testAddress);
    console.log(result.result.addressMatches[0].coordinates);
    const forecast = await api.getForecast(
      result.result.addressMatches[0].coordinates,
    );
    setAddress(result);
    console.log({ forecast });
  };
  return <div>test</div>;
};

export default App;
