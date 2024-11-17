import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface Movie {
  image: string;
}

export interface TrendingMoviesProps {
  data: Movie[];
}

export interface MovieCardProps {
  movie: Movie; 
  index: number;
  handleClick: () => void; 
}
 
const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
  };
  const handleClick = (index: number) => {
    console.log(`Movie at index ${index} clicked!`);
  };

  return (
    <View>
      <Text className="text-white text-2xl mx-4 mt-6 mb-6">Trending</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        decelerationRate="fast"
        snapToInterval={width * 0.6 + 16}
        snapToAlignment="start"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data?.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            index={index}
            handleClick={() => handleClick(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, index, handleClick }) => {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      style={styles.movieCard}
      onPress={handleClick} // Tıklama olayını burada yönetiyoruz
    >
      <Image
        source={{ uri: movie.image }}
        style={styles.movieImage}
        resizeMode="cover"
        className="rounded-3xl"
      />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  titleText: {
    color: 'white',
    fontSize: 18, 
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 8, 
    paddingBottom: 10,
  },
  movieCard: {
    marginRight: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  movieImage: {
    width: width * 0.6,  
    height: height * 0.4,
    borderRadius: 24,
    backgroundColor: '#1F2937',
  },
});

export default TrendingMovies;
