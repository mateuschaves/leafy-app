import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { PlantsListScreen } from '../../features/plants/screens/PlantsListScreen';
import { PlantDetailScreen } from '../../features/plants/screens/PlantDetailScreen';
import { AddPlantScreen } from '../../features/plants/screens/AddPlantScreen';
import { PlantFormScreen } from '../../features/plants/screens/PlantFormScreen';
import { CatalogScreen } from '../../features/catalog/screens/CatalogScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlantsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPlants" component={PlantsListScreen} />
      <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
      <Stack.Screen name="AddPlant" component={AddPlantScreen} />
      <Stack.Screen name="PlantForm" component={PlantFormScreen} />
    </Stack.Navigator>
  );
};

const CatalogStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CatalogHome" component={CatalogScreen} />
      <Stack.Screen name="PlantForm" component={PlantFormScreen} />
    </Stack.Navigator>
  );
};

const TabIcon = ({ emoji }: { emoji: string }) => (
  <Text style={{ fontSize: 22 }}>{emoji}</Text>
);

export const AppNavigator = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingTop: 4,
            height: 60,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.muted,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="Plants"
          component={PlantsStack}
          options={{
            title: t('tabs.myPlants'),
            tabBarIcon: () => <TabIcon emoji="🪴" />,
          }}
        />
        <Tab.Screen
          name="Catalog"
          component={CatalogStack}
          options={{
            title: t('tabs.catalog'),
            tabBarIcon: () => <TabIcon emoji="📚" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
