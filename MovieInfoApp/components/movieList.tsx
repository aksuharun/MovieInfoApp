import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

interface Movie {
  id: number;
  title: string;
  year: number;
}

const MovieList = () => {
  const router = useRouter();

  // Movie data
  const movies: Movie[] = [
    { id: 1, title: 'The Matrix', year: 1999 },
    { id: 2, title: 'Inception', year: 2010 },
    { id: 3, title: 'The Dark Knight', year: 2008 },
    { id: 4, title: 'Interstellar', year: 2014 },
  ];

  const navigateToDetail = (movieId: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movieId },
    });
  };

  let movieName = "Iron Man";

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">Movie List</Text>
        <TouchableOpacity>
          <Text className='text-lg'>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>


        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Text style={styles.movieTitle}>{item.title} ({item.year})</Text>
              <Button
                title="View Details"
                onPress={() => navigateToDetail(item.id)}
              />

            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MovieList;
