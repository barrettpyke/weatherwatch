import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const setup = () => {
  render(<App />);
};

describe('App tests', () => {
  beforeEach(() => {
    setup();
  });
  it('should render the address field', () => {
    const addressField = getAddressField();
    expect(addressField).toBeInTheDocument();
  });
});

const getAddressField = () => screen.getByText('Enter a US address...');
