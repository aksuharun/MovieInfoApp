import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../../components/trendingMovies';

const android = Platform.OS === 'android';


const movieData = [
  {
    image: "https://static.displate.com/280x392/displate/2021-01-28/dc1c9755686a49e6b6d5d8862c3d3b28_a1bca47c459b1b31f0361c9c916e0192.jpg", // Replace with actual image URLs
  },
  {
    image: "https://cdn.marvel.com/content/1x/thorloveandthunder_lob_crd_04.jpg", // Replace with actual image URLs
  },
  {
    image: "https://static.displate.com/280x392/displate/2021-01-28/dc1c9755686a49e6b6d5d8862c3d3b28_a1bca47c459b1b31f0361c9c916e0192.jpg", // Replace with actual image URLs
  },
];

const HomeScreen = () => {

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={android ? '-mb-2' : 'mb-3'}>
        <StatusBar barStyle="light-content" backgroundColor="#2d2d2d" />

        {/* Top Bar with Logo and Search Icon */}
        <View className="flex-row items-center justify-between mx-4 py-2 ">
          <Text className="text-white text-3xl mb-7">Logo</Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Horizontal ScrollView for the carousel */}
      <TrendingMovies data={movieData} />

    </View>
  );
}

export default HomeScreen;  
