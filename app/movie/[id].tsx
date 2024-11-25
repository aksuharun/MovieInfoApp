import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { Stack } from 'expo-router';
import { HeartIcon as SolidHeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../../components/cast';
import MovieList from '../../components/movieList';
import { IMovie } from '../../types/IMovie';

interface Movie {
  title: string;
  year: number;
  description: string;
}

const { width, height } = Dimensions.get("window");

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
const movieDetails: { [key: number]: Movie } = {
  1: { title: 'The Matrix', year: 1999, description: 'A hacker learns the truth about the reality he lives in.' },
  2: { title: 'Inception', year: 2010, description: 'A thief who steals corporate secrets using dream-sharing technology is given the inverse task of planting an idea.' },
  3: { title: 'The Dark Knight', year: 2008, description: 'Batman faces the Joker, a criminal mastermind.' },
  4: { title: 'Interstellar', year: 2014, description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.' },
};

const sampleCast = [
  {
    id: 1,
    name: "Actor 1",
    profileImage: "https://api.magicfm.ro/resized/articole/2022/03/26/black_widow_marvel.0.jpeg?w=1280&h=&c=",
    characterName: "Character 1",
  },
  {
    id: 2,
    name: "Actor 2",
    profileImage: "https://api.magicfm.ro/resized/articole/2022/03/26/black_widow_marvel.0.jpeg?w=1280&h=&c=",
    characterName: "Character 2",
  },
];

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movieId = id as string;
  const movie = SAMPLE_MOVIES.find(m => m.id === movieId);
  const movieDetail = movieDetails[Number(movieId)];

  if (!movie || !movieDetail) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-white text-lg">Movie not found</Text>
      </View>
    );
  }

  const router = useRouter();
  const [isFavourite, toggleFavourite] = useState(false);

  const handleMoviePress = (movieId: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movieId },
    });
  };

  const handlePersonPress = (personId: number) => {
    router.push({
      pathname: '/person/[id]',
      params: { id: personId },
    });
  };

  const handleSeeAllPress = () => {
    router.push('/');
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
        <View className='w-full'>
          <SafeAreaView className='absolute z-20 w-full flex-row flex-row justify-between items-center px-4 pt-3 z-10'>
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
              {isFavourite ? (
                <SolidHeartIcon size={35} color="white" />
              ) : (
                <HeartIcon size={35} color="white" />
              )}
            </TouchableOpacity>
          </SafeAreaView>

          <View>
            <Image
              source={{ uri: movie.poster }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.40 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        </View>


        {/* Movie details */}
        <View style={{ marginTop: -(height * 0.09) }} className='space-y-6'>
          <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            {movieDetail.title}
          </Text>
          <Text className='text-neutral-400 font-semibold text-base text-center'>
            {movieDetail.year}
          </Text>

          <View className='flex-row justify-center mx-4 space-x-6 mb-5'>
            <Text className='text-neutral-400 font-semibold text-base'>
              Action *
            </Text>
            <Text className='text-neutral-400 font-semibold text-base'>
              Action *
            </Text>
            <Text className='text-neutral-400 font-semibold text-base'>
              Action *
            </Text>
          </View>

          <Text className='text-neutral-400 mx-4 mb-4 tracking-wide leading-6'>
            {movieDetail.description}
          </Text>

          <View className='mb-4'>
            <Cast cast={sampleCast} onPress={handlePersonPress} />
          </View>

          <MovieList
            movies={SAMPLE_MOVIES}
            title='Similar movies'
            onMoviePress={handleMoviePress}
            onSeeAllPress={handleSeeAllPress}
          />

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
