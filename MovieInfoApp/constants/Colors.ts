const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};


export const MOVIE_LIST_STYLES = {
  POSTER_RATIO: 1.5,
  POSTER_WIDTH_PERCENTAGE: '40%',  
  SPACING: 12,
  MEDIA_QUERIES: {
    SMALL_SCREEN: '(max-width: 600px)', 
    MEDIUM_SCREEN: '(max-width: 900px)', 
  },
  coverStyle: {
    width: 150,  // Default width for other movie cards
    height: 225, // Default height for other movie cards
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
