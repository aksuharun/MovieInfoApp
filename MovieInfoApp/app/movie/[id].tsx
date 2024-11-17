import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface Movie {
  title: string;
  year: number;
  description: string;
}

const movieDetails: { [key: number]: Movie } = {
  1: { title: 'The Matrix', year: 1999, description: 'A hacker learns the truth about the reality he lives in.' },
  2: { title: 'Inception', year: 2010, description: 'A thief who steals corporate secrets using dream-sharing technology is given the inverse task of planting an idea.' },
  3: { title: 'The Dark Knight', year: 2008, description: 'Batman faces the Joker, a criminal mastermind.' },
  4: { title: 'Interstellar', year: 2014, description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.' },
};

const MovieScreen = () => {
  const { id } = useLocalSearchParams();

  const movieId = Number(id);

  if (![1, 2, 3, 4].includes(movieId)) {
    return (
      <View style={styles.container}>
        <Text>Movie not found.</Text>
      </View>
    );
  }

  const movie = movieDetails[movieId];

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text>Movie not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title} ({movie.year})</Text>
      <Text style={styles.description}>{movie.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default MovieScreen;
