import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { HeartIcon as SolidHeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MovieList from '../../components/movieList';
import { IMovie } from '../../types/IMovie';
import PersonInfoItem from '../../components/PersonInfoItem';

const { width } = Dimensions.get('window');

export interface IPerson {
  id: number;
  name: string;
  location: string;
  image: string;
  gender: string;
  birthday: string;
  knownFor: string;
  popularity: string;
  biography: string;
}

const personDetails: { [key: number]: IPerson } = {
  1: {
    id: 1,
    name: "Scarlett Johansson",
    location: "Manhattan, New York, United States",
    image: "https://cdn.britannica.com/59/182359-050-C6F38CA3/Scarlett-Johansson-Natasha-Romanoff-Avengers-Age-of.jpg",
    gender: "Female",
    birthday: "November 22, 1984",
    knownFor: "Actor",
    popularity: "9.8/10",
    biography: "Scarlett Johansson is an American actress and singer. She is one of the highest-paid actresses in the world and has received numerous accolades, including a Tony Award, a BAFTA Award, and nominations for two Academy Awards. She is known for her roles in films such as 'Lost in Translation', 'The Avengers', and 'Marriage Story'.",
  }
};

const SAMPLE_MOVIES: IMovie[] = [
  {
    id: 1,
    title: 'The Matrix',
    poster: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg'
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg'
  },
  {
    id: 3,
    title: 'Thor',
    poster: 'https://cdn.marvel.com/content/1x/thorloveandthunder_lob_crd_04.jpg'
  },
  {
    id: 4,
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/I/81ctHWrzeSL._AC_SL1500_.jpg'
  },
];

export default function PersonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [isFavourite, toggleFavourite] = useState(false);

  const personId = Number(id);
  const person = personDetails[personId];
  
  const handleMoviePress = (movieId: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id: movieId },
    });
  };

  if (!person) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-gray-400 text-lg">Person not found.</Text>
      </View>
    );
  }

  const imageSize = width * 0.6;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 pt-3">
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

      <View className="mt-20 items-center">
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            shadowColor: 'white',
            shadowOpacity: 0.4,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 10 },
          }}
          className="overflow-hidden shadow-2xl border-8 border-neutral-700"
        >
          <Image source={{ uri: person.image }} className="w-full h-full" />
        </View>

        <Text className="text-white text-3xl font-bold mt-6 text-center">{person.name}</Text>
        <Text className="text-gray-400 text-base mt-2 text-center">{person.location}</Text>

        <View className="mt-8 bg-neutral-800 px-6 py-4 rounded-xl shadow-lg mx-4 space-y-4 w-11/12">
          <PersonInfoItem label="Gender" value={person.gender} />
          <PersonInfoItem label="Birthday" value={person.birthday} />
          <PersonInfoItem label="Known For" value={person.knownFor} />
          <PersonInfoItem label="Popularity" value={person.popularity} />

          <View className="bg-neutral-700 p-4 rounded-lg mb-3">
            <Text className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
              Biography
            </Text>
            <Text className="text-white text-base font-medium mt-2">
              {person.biography}
            </Text>
          </View>

          <MovieList
            movies={SAMPLE_MOVIES}
            title='Person Movies'
            onMoviePress={handleMoviePress}
          />
        </View>
      </View>
    </ScrollView>
  );
}
