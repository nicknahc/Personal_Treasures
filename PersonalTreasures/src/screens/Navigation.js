import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import AddProductScreen from './AddProductScreen';
import MessagingScreen from './MessagingScreen';
import ProfileScreen from './ProfileScreen';
import ProductScreen from './ProductScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Add Product') {
              iconName = 'add-circle';
            } else if (route.name === 'Messaging') {
              iconName = 'chatbubbles';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Add Product" component={AddProductScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Messaging" component={MessagingScreen} options={{ headerShown: false }}  />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
