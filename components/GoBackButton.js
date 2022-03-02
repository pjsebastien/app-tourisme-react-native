import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const GoBackButton = ({
    onPress,
    title,
    customContainerStyle,
    customButtonStyle,
    rightButton,
}) => {
    return (
        <View style={styles.containerBackButton}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                    ...customContainerStyle,
                    ...styles.buttonBack,
                }}
            >
                <Ionicons name={'arrow-back'} size={23} color="white" />
            </TouchableOpacity>
            <Text style={styles.textBackButton}>{title}</Text>
            <View style={{ ...customButtonStyle, ...styles.invisible }}>
                {rightButton}
            </View>
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
    buttonBack: {
        backgroundColor: Colors.primaryGreen,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
    textBackButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textColorDark,
    },
    invisible: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
});
