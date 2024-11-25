import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { IMovie } from '@/types/IMovie';
import { useRouter } from 'expo-router';
import MovieList from '../../components/movieList';
import TrendingMovies from '../../components/trendingMovies';
import { fetchUpcomingMovies } from '../../api/moviedb';

const android = Platform.OS === 'android';

// Add this interface before the HomeScreen component
interface MovieGroup {
  group: string;
  entries: any[]; // You might want to replace 'any' with a more specific type if possible
}

const SAMPLE_MOVIES: IMovie[] = [
  {
    id: "1",
    title: 'The Matrix',
    poster: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg'
  },
  {
    id: "2",
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg'
  },
  {
    id: "3",
    title: 'Thor',
    poster: 'https://cdn.marvel.com/content/1x/thorloveandthunder_lob_crd_04.jpg'
  },
  {
    id: "4",
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/I/81ctHWrzeSL._AC_SL1500_.jpg'
  },
];

const HomeScreen = () => {

  const router = useRouter();
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        
        // Now the type of 'group' is explicitly defined
        const flattenedMovies = data.message.flatMap((group: MovieGroup) => 
          group.entries.map(entry => ({
            ...entry,
            releaseDate: group.group // Add the release date group
          }))
        );

        console.log('Flattened Movies:', flattenedMovies);
        setUpcomingMovies(flattenedMovies);
      } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
      }
    };

    loadUpcomingMovies();
  }, []);

  const handleMoviePress = (movieId: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: String(movieId) },   
    });
  };

  const handleSeeAllPress = (title: string) => {
    router.push({
      pathname: '/movie/seeAll',
      params: { title: title }
    });
  };

  const handleSearchPress = () => {
    router.push('/movie/search');
  };


  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={android ? '-mb-2' : 'mb-3'}>
        <StatusBar barStyle="light-content" backgroundColor="#2d2d2d" />

        {/* Top Bar with Logo and Search Icon */}
        <View className="flex-row items-center justify-between mx-4 py-2 ">
          <Text className="text-white text-3xl mb-7">Logo</Text>
          <TouchableOpacity onPress={handleSearchPress} >
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Horizontal ScrollView for the carousel */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}>

        <TrendingMovies
          movies={SAMPLE_MOVIES}
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAllPress('Trending Movies')}
        />

        <MovieList
          movies={upcomingMovies}
          title='Upcoming'
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAllPress('Upcoming Movies')}
        />

        <MovieList
          movies={SAMPLE_MOVIES}
          title='Top Rated'
          onMoviePress={handleMoviePress}
          onSeeAllPress={() => handleSeeAllPress('Top Rated Movies')}
        />

      </ScrollView>

    </View>
  );
}

export default HomeScreen;  
