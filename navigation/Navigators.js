//Libraries
import { StyleSheet } from 'react-native';
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
import AboutScreen from '../screens/DrawerMenu/About';
import CategoryPosts from '../screens/CategoryPosts';
import FilteredPosts from '../screens/FilteredPosts';
import FilteredMap from '../screens/FilteredMap';
import DrawerContentScreen from '../screens/DrawerMenu/DrawerContentScreen';
import AddPostScreen from '../screens/DrawerMenu/AddPosts';
import BivouacScreen from '../screens/DrawerMenu/Bivouac';
import CampingScreen from '../screens/DrawerMenu/Camping';
import PrivacyScreen from '../screens/DrawerMenu/Privacy';

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
                        iconName = focused ? 'star-half' : 'star-half-outline';
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
        <DrawerNavigator.Navigator
            screenOptions={() => ({
                drawerActiveTintColor: Colors.secondary,
                drawerInactiveTintColor: Colors.primaryGreenDark,
                drawerActiveBackgroundColor: Colors.primaryGreenFaded,
                headerShown: false,
                drawerType: 'slide',
            })}
            drawerContent={props => <DrawerContentScreen {...props} />}
        >
            <DrawerNavigator.Screen
                name="DrawerHome"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    title: 'Accueil',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'star-half' : 'star-half-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <DrawerNavigator.Screen
                name="DrawerBivouac"
                component={BivouacScreen}
                options={{
                    headerShown: true,
                    title: 'Le Bivouac à la Réunion',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'leaf' : 'leaf-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <DrawerNavigator.Screen
                name="DrawerCamping"
                component={CampingScreen}
                options={{
                    headerShown: true,
                    title: 'Le Camping à la Réunion',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'leaf' : 'leaf-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <DrawerNavigator.Screen
                name="DrawerAdd"
                component={AddPostScreen}
                options={{
                    headerShown: true,
                    title: 'Proposer un spot',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? 'add-circle' : 'add-circle-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <DrawerNavigator.Screen
                name="DrawerAbout"
                component={AboutScreen}
                options={{
                    headerShown: true,
                    title: `A propos de l'application`,
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={
                                focused
                                    ? 'information-circle'
                                    : 'information-circle-outline'
                            }
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <DrawerNavigator.Screen
                name="DrawerPrivacy"
                component={PrivacyScreen}
                options={{
                    headerShown: true,
                    title: 'Politique de confidentialité',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={
                                focused
                                    ? 'shield-checkmark-outline'
                                    : 'shield-checkmark-outline'
                            }
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </DrawerNavigator.Navigator>
    );
};

const styles = StyleSheet.create({});
