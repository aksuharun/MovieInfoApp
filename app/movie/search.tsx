import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

const SAMPLE_MOVIES = [
  {
    id: 1,
    title: 'The Matrix',
    poster: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg',
  },
  {
    id: 3,
    title: 'Thor',
    poster: 'https://cdn.marvel.com/content/1x/thorloveandthunder_lob_crd_04.jpg',
  },
  {
    id: 4,
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/I/81ctHWrzeSL._AC_SL1500_.jpg',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(SAMPLE_MOVIES);
  const [iconScale] = useState(new Animated.Value(1));

  const handleSearch = () => {
    const filteredMovies = SAMPLE_MOVIES.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredMovies);
  };

  const handleIconPressIn = () => {
    Animated.spring(iconScale, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handleIconPressOut = () => {
    Animated.spring(iconScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="flex-row items-center justify-center p-4 mt-4 space-x-2 bg-neutral-700 rounded-xl">
        <View className="relative flex-1">
          <TextInput
            placeholder="Search for movies..."
            placeholderTextColor="#A1A1AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-white py-3 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: 'transparent', 
              borderRadius: 20,
              paddingRight: 50,  
            }}
          />
          
          <TouchableOpacity
            onPress={handleSearch}
            onPressIn={handleIconPressIn}
            onPressOut={handleIconPressOut}
            style={{
              position: 'absolute',
              right: 12, 
              top: '50%',
              transform: [{ translateY: -12 }], 
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Animated.View style={{ transform: [{ scale: iconScale }] }}>
              <MagnifyingGlassIcon size={20} color="white" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Text className="text-white text-xl font-semibold">Results</Text>
      </View>

      <View className="mt-4 px-4">
        {results.length === 0 ? (
          <Text className="text-white text-lg">No results found.</Text>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {results.map((movie, index) => (
              <View key={movie.id} className={`mb-6 w-1/2 p-2 ${index % 2 === 0 ? 'pl-0' : 'pr-0'}`}>
                <Image
                  source={{ uri: movie.poster }}
                  style={{
                    width: width * 0.45, 
                    height: width * 0.65, 
                    borderRadius: 10,    
                    resizeMode: 'cover',
                  }}
                />
                <Text className="text-white text-center mt-2 font-semibold">{movie.title}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
