import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './AddressField.css';

interface AddressProps {
  value: any;
  onChange: any;
}

const AddressField = (props: AddressProps) => {
  return (
    <div className="autocomplete">
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_API_KEY}
        autocompletionRequest={{
          componentRestrictions: {
            country: ['us'],
          },
        }}
        onLoadFailed={(error) => console.error(error)}
        selectProps={{
          value: props.value,
          onChange: props.onChange,
          isClearable: true,
          isSearchable: true,
          placeholder: 'Enter a US address...',
        }}
      />
    </div>
  );
};

export default AddressField;
