import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const HomeButton = ({ onPress }) => {
    return (
        <View style={styles.containerBackButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                    backgroundColor: Colors.primaryGreen,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                }}
            >
                <Ionicons name={'home-outline'} size={23} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default HomeButton;

const styles = StyleSheet.create({
    containerBackButton: {
        marginTop: Platform.OS === 'android' ? 50 : 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
