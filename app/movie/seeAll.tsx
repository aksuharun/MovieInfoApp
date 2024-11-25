import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { IMovie } from '@/types/IMovie';

// Import your sample movies or fetch from an actual API
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
const { width } = Dimensions.get('window');

export default function SeeAllMoviesScreen() {
    const router = useRouter();
    const { title } = useLocalSearchParams();

    const handleMoviePress = (movieId: string) => {
        router.push({
            pathname: '/movie/[id]',
            params: { id: movieId }, 
        });
    };

    const renderMovieItem = ({ item }: { item: IMovie }) => (
        <TouchableOpacity
            onPress={() => handleMoviePress(item.id)}
            className="mb-4 items-center"
        >
            <Image
                source={{ uri: item.poster }}
                style={{
                    width: width * 0.45,
                    height: width * 0.65,
                    borderRadius: 10,
                    resizeMode: 'cover'
                }}
            />
            <Text className="text-white text-center mt-2 font-semibold">{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-neutral-900">
            <SafeAreaView>
                <View className="flex-row items-center px-4 py-3">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4"
                    >
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold">{title}</Text>
                </View>
            </SafeAreaView>

            <FlatList
                data={SAMPLE_MOVIES}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 16
                }}
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: 20
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}