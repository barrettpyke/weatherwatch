import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AddressField = () => (
  <>
    <GooglePlacesAutocomplete apiKey={process.env.REACT_APP_API_KEY} />
  </>
);

export default AddressField;
