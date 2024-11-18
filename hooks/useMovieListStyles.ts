import { Dimensions } from 'react-native';

export const useMovieListStyles = () => {
  const { width: screenWidth } = Dimensions.get('window');
  
  return {
    posterWidth: screenWidth * 0.4,
    posterHeight: screenWidth * 0.4 * 1.5,
    spacing: 12
  };
};