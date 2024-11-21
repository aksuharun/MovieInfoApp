import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import { Stack } from 'expo-router';
import { HeartIcon as SolidHeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';


interface Movie {
  title: string;
  year: number;
  description: string;
}

const { width, height } = Dimensions.get("window");


const movieDetails: { [key: number]: Movie } = {
  1: { title: 'The Matrix', year: 1999, description: 'A hacker learns the truth about the reality he lives in.' },
  2: { title: 'Inception', year: 2010, description: 'A thief who steals corporate secrets using dream-sharing technology is given the inverse task of planting an idea.' },
  3: { title: 'The Dark Knight', year: 2008, description: 'Batman faces the Joker, a criminal mastermind.' },
  4: { title: 'Interstellar', year: 2014, description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.' },
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const movie = movieDetails[movieId];
  const router = useRouter();
  const [isFavourite, toggleFavourite] = useState(false);

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
        <View className='w-full'>
          <SafeAreaView className='absolute z-20 w-full flex-row flex-row justify-between items-center px-4 pt-3 z-10'>
            {/* The heart and the come back button */}
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
              source={{ uri: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg' }}
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
        <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
          <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            Texee
          </Text>
          <Text className='text-neutral-400 font-semibold text-base text-center'>
            Texee
          </Text>

          <View className='flex-row justify-center mx-4 space-x-6'>
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

          <Text className='text-neutral-400 mx-4 tracking-wide'>
            A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.
          </Text>
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
