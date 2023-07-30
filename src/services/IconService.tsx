import React from 'react';
import { Cloud, Error, Thunderstorm, WaterDrop, WbSunny } from '@mui/icons-material';

export class IconService {
  getIcon(description: string) {
    const descriptionLower = description.toLowerCase();

    if (descriptionLower.includes('sunny')) {
      return <WbSunny fontSize="large" style={{ color: '#FFB900' }} />;
    } else if (descriptionLower.includes('thunderstorm')) {
      return <Thunderstorm fontSize="large" style={{ color: 'grey' }} />;
    } else if (descriptionLower.includes('rain')) {
      return <WaterDrop fontSize="large" style={{ color: 'blue' }} />;
    } else if (descriptionLower.includes('cloudy')) {
      return <Cloud fontSize="large" style={{ color: 'grey' }} />;
    } else {
      return <Error fontSize="large" style={{ color: 'red' }} />;
    }
  }
}

export const iconService = new IconService();
