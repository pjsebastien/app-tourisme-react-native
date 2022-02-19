import React from 'react';
import { AppModalsNavigator } from './Navigators';
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppModalsNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;
