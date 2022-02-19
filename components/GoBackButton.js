import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const GoBackButton = ({ onPress, title, customContainerStyle }) => {
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
                    ...customContainerStyle,
                }}
            >
                <Ionicons name={'arrow-back'} size={23} color="white" />
            </TouchableOpacity>
            <Text style={styles.textBackButton}>{title}</Text>
            <TouchableOpacity style={styles.invisible}></TouchableOpacity>
        </View>
    );
};

export default GoBackButton;

const styles = StyleSheet.create({
    containerBackButton: {
        marginTop: Platform.OS === 'android' ? 50 : 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textBackButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textColorDark,
    },
    invisible: {
        height: 40,
        width: 40,
    },
});
