import React, { useState, useRef, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { IMovie } from "../types/IMovie";
import MovieCard from "./movieCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ITEM_WIDTH = SCREEN_WIDTH * 0.6;
const SPACING = 16;

interface TrendingMoviesProps {
  title?: string;
  movies: IMovie[];
  isLoading?: boolean;
  onSeeAllPress?: () => void;
  onMoviePress?: (movieId: number) => void;
}

interface MovieItemProps {
  item: IMovie;
  index: number;
  movies: IMovie[];
  activeIndex: number;
  onMoviePress?: (movieId: number) => void;
}

const MovieItem = memo<MovieItemProps>(({ 
  item, 
  index, 
  movies,
  activeIndex, 
  onMoviePress 
}) => {
  const isActive = index === activeIndex;
  
  return (
    <View
      style={[
        styles.posterContainer,
        {
          marginLeft: index === 0 ? (SCREEN_WIDTH - ITEM_WIDTH) / 2 : SPACING / 2,
          marginRight: index === movies.length - 1 
            ? (SCREEN_WIDTH - ITEM_WIDTH) / 2 
            : SPACING / 2,
        },
      ]}
    >
      <Animatable.View
        animation={isActive ? "pulse" : undefined}
        key={`${item.id}-${isActive}`}
        style={{ opacity: isActive ? 1 : 0.5 }}
      >
        <MovieCard
          movie={item}
          onPress={onMoviePress}
          styles={{
            posterWidth: ITEM_WIDTH,
            posterHeight: ITEM_WIDTH * 1.5,
            spacing: SPACING,
          }}
          showTitle={false}
        />
      </Animatable.View>
    </View>
  );
});

const TrendingMovies: React.FC<TrendingMoviesProps> = ({
  movies = [],
  isLoading = false,
  onMoviePress,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const flatListRef = useRef<FlatList>(null);

  const handleMomentumScrollEnd = useCallback((event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
    );
    setActiveIndex(index);
  }, []);

  const renderItem = useCallback(({ item, index }: { item: IMovie; index: number }) => (
    <MovieItem 
      item={item} 
      index={index} 
      movies={movies}
      activeIndex={activeIndex}
      onMoviePress={onMoviePress}
    />
  ), [activeIndex, movies, onMoviePress]);

  const scrollToIndex = useCallback((index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * (ITEM_WIDTH + SPACING),
      animated: true,
    });
  }, []);

  if (isLoading || movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {isLoading ? "Loading movies..." : "No trending movies"}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.titleText}>Trending</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + SPACING,
          offset: (ITEM_WIDTH + SPACING) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  posterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
  },
});

export default React.memo(TrendingMovies);