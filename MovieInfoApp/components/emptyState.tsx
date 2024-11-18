import React from 'react';
import { View, Text } from 'react-native';

const EmptyState = () => (
  <View className="flex items-center justify-center py-8">
    <Text className="text-white text-base">No movies available</Text>
  </View>
);

export default EmptyState;