import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo'nun ikonları
 
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // iOS için pozisyonu düzenler
          },
          default: {}, // Diğer platformlar için varsayılan stil
        }),
      }}
    >
      {/* Home Screen Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} /> // İkon kullanımı
          ),
        }}
      />
    </Tabs>
  );
}
