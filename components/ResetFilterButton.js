import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const ResetButtonFilter = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                backgroundColor: '#c0c0c0',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
                width: 24,
                marginTop: 2,
            }}
        >
            <Ionicons name={'refresh-outline'} size={20} color="white" />
        </TouchableOpacity>
    );
};

export default ResetButtonFilter;

const styles = StyleSheet.create({});
