import React from 'react';
import { View, Text } from 'react-native';

const PersonInfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="flex-row items-center justify-between bg-neutral-700 p-4 rounded-lg mb-3">
      <Text className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-white text-base font-medium text-right">
        {value}
      </Text>
    </View>
  );
};

export default PersonInfoItem;