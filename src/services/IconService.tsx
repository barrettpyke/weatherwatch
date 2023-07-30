import { Cloud, Thunderstorm, WaterDrop, WbSunny } from '@mui/icons-material';

class IconService {
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
    }
  }
}

const iconService = new IconService();

export default iconService;
