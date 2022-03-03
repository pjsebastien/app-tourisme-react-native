//Libraries
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

//Screens
import HomeScreen from '../screens/Home';
import MapScreen from '../screens/Map';
import PostDetailsScreen from '../screens/PostDetails';
import PostsScreen from '../screens/Posts';
import SearchPostsScreen from '../screens/SearchPosts';
import AboutScreen from '../screens/About.js';
import CategoryPosts from '../screens/CategoryPosts';
import FilteredPosts from '../screens/FilteredPosts';
import FilteredMap from '../screens/FilteredMap';

//AppModalsNavigator
const ModalsNavigator = createStackNavigator();

export const AppModalsNavigator = () => {
    return (
        <ModalsNavigator.Navigator screenOptions={() => ({ presentation: 'modal' })}>
            <ModalsNavigator.Screen
                name="app"
                component={AppTabNavigator}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="map"
                component={MapScreen}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="postDetails"
                component={PostDetailsScreen}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="categoryPosts"
                component={CategoryPosts}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="filteredPosts"
                component={FilteredPosts}
                options={{ headerShown: false }}
            />
            <ModalsNavigator.Screen
                name="filteredMap"
                component={FilteredMap}
                options={{ headerShown: false }}
            />
        </ModalsNavigator.Navigator>
    );
};

//AppTabNavigator
const TabNavigator = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    size = 24;
                    if (route.name == 'tabHome') {
                        iconName = focused ? 'star-half-outline' : 'star-half-outline';
                    } else if (route.name == 'tabPosts') {
                        iconName = focused ? 'leaf' : 'leaf-outline';
                    } else if (route.name == 'tabMap') {
                        iconName = focused ? 'navigate' : 'navigate-outline';
                    } else if (route.name == 'tabSearch') {
                        iconName = focused ? 'search' : 'search-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primaryGreenDark,
                tabBarInactiveTintColor: Colors.primaryGreen,
            })}
        >
            <TabNavigator.Screen
                name="tabHome"
                component={AppDrawerNavigator}
                options={{ title: 'Accueil', headerShown: false }}
            />
            <TabNavigator.Screen
                name="tabPosts"
                component={PostsStackNavigator}
                options={{ title: 'Tous les spots', headerShown: false }}
            />
            <TabNavigator.Screen
                name="tabMap"
                component={MapScreen}
                options={{ title: 'Carte', headerShown: false }}
            />
            <TabNavigator.Screen
                name="tabSearch"
                component={SearchPostsScreen}
                options={{ title: 'Recherche avancée', headerShown: false }}
            />
        </TabNavigator.Navigator>
    );
};

//PostsStackNavigator
const PostsNavigator = createStackNavigator();

const PostsStackNavigator = () => {
    return (
        <PostsNavigator.Navigator>
            <PostsNavigator.Screen
                name="Posts"
                component={PostsScreen}
                options={{ headerShown: false }}
            />
            <PostsNavigator.Screen
                name="PostDetails"
                component={PostDetailsScreen}
                options={{ headerShown: false }}
            />
        </PostsNavigator.Navigator>
    );
};

const DrawerNavigator = createDrawerNavigator();

const AppDrawerNavigator = () => {
    return (
        <DrawerNavigator.Navigator>
            <DrawerNavigator.Screen
                name="DrawerHome"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <DrawerNavigator.Screen
                name="DrawerAbout"
                component={AboutScreen}
                options={{ headerShown: false }}
            />
        </DrawerNavigator.Navigator>
    );
};

const styles = StyleSheet.create({});
