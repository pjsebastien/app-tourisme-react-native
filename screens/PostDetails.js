//Libraries
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';

const PostsDetails = props => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <GoBackButton onPress={() => props.navigation.goBack()} />
            </SafeAreaView>
        </View>
    );
};

export default PostsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 25,
    },
});
