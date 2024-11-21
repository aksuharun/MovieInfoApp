import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

type CastProps = {
    cast: {
        id: number;
        name: string;
        profileImage: string;
        characterName: string;
    }[];
};

const Cast: React.FC<CastProps> = ({ cast }) => (
    <View className="my-6">
        <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
        >
            {cast &&
                cast.map((person) => (
                    <TouchableOpacity key={person.id} className="mr-4 items-center">
                        <Image
                            source={{ uri: person.profileImage }}
                            style={{ width: 70, height: 70, borderRadius: 35 }}
                        />
                        <Text className="text-white text-center mt-2">{person.name}</Text>
                        <Text className="text-gray-400 text-center">{person.characterName}</Text>
                    </TouchableOpacity>
                ))}
        </ScrollView>
    </View>
);

export default Cast;
