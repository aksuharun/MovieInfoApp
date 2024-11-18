import React, { memo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { IMovieListProps } from '../types/IMovieListProps';
import { useMovieListStyles } from '../hooks/useMovieListStyles';
import MovieCard from './movieCard';
import MovieListSkeleton from './movieListSkeleton';
import EmptyState from './emptyState';

const MovieList: React.FC<IMovieListProps> = ({
  title = "Movies",
  movies = [],
  isLoading = false,
  onSeeAllPress,
  onMoviePress,
}) => {
  const styles = useMovieListStyles();

  if (isLoading) return <MovieListSkeleton />;
  if (!movies.length) return <EmptyState />;

  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center mx-4 mb-5">
        <Text className="text-white text-xl font-bold mb-3">{title}</Text>
        {onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text className="text-blue-400 text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: styles.spacing,
          gap: styles.spacing
        }}
        
        renderItem={({ item }) => (
          <MovieCard 
            movie={item} 
            onPress={onMoviePress}
            styles={styles}
          />
        )}
      />
    </View>
  );
};

export default memo(MovieList);