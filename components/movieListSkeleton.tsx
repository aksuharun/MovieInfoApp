import React from 'react';
import { View, Animated } from 'react-native';
import { useMovieListStyles } from '../hooks/useMovieListStyles';

const MovieListSkeleton = () => {
  const styles = useMovieListStyles();

  return (
    <View className="flex-row px-4">
      {[1, 2, 3].map((key) => (
        <View
          key={key}
          style={{
            width: styles.posterWidth,
            height: styles.posterHeight,
            marginRight: styles.spacing,
            backgroundColor: '#404040',
            borderRadius: 10,
          }}
        />
      ))}
    </View>
  );
};

export default MovieListSkeleton;

