//Libraries
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';

const About = props => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <GoBackButton onPress={() => props.navigation.goBack()} />
            </SafeAreaView>
        </View>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 25,
    },
});
