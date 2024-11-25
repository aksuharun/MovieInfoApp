import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

type CastProps = {
    cast: {
        id: number;
        name: string;
        profileImage: string;
        characterName: string;
    }[];
    onPress?: (personId: number) => void; 
};

const Cast: React.FC<CastProps> = ({ cast, onPress }) => {
    const router = useRouter();

    const handlePersonPress = (personId: number) => {
        if (onPress) {
            onPress(personId);
        } else {
            router.push({
                pathname: '/person/[id]',
                params: { id: personId },
            });
        }
    };

    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ 
                    paddingHorizontal: 15,
                    gap: 16
                }}
            >
                {cast &&
                    cast.map((person) => (
                        <TouchableOpacity
                            key={person.id}
                            className="mr-4 items-center"
                            onPress={() => handlePersonPress(person.id)}
                            style={{ 
                                width: 100,
                                marginRight: 0
                            }}
                        >
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
};

export default Cast;
