import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // TODO: fix these tests
  describe.skip('when a location is selected', () => {
    beforeEach(() => {
      searchAddress();
    });
    it('should display a progress indicator', () => {
      verifyProgressIndicator();
    });
    it('should display a weekly forecast when loading data succeeds', () => {});
    it('should display an error when loading data fails', () => {});
  });
});

const getAddressField = () => screen.getByText('Enter a US address...');

const getProgressIndicator = () => screen.getByRole('progressbar');

const verifyProgressIndicator = () => {
  const progressIndicator = getProgressIndicator();
  expect(progressIndicator).toBeInTheDocument();
};

const searchAddress = async () => {
  const addressField = getAddressField();
  userEvent.click(addressField);
  userEvent.type(addressField, '123 N Main St');
};
