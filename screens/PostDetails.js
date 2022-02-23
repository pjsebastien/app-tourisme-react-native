//Libraries
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import { useEffect } from 'react';

const PostsDetails = ({ navigation, route }) => {
    const [post, setPost] = useState({});
    const [services, setServices] = useState([]);
    useEffect(() => {
        let { selectedPost } = route.params;
        setPost(selectedPost);
        setServices(selectedPost.services);
    }, []);

    console.log(services);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <GoBackButton onPress={() => navigation.goBack()} />
                    <Text>{post.title}</Text>
                    <Text>{post.region}</Text>
                    <Text>{post.category}</Text>
                    <Text>{post.id}</Text>
                    <Text>{post.content}</Text>
                    <Text>{post.itinerary}</Text>
                    <Text>{post.lat}</Text>
                    <Text>{post.lon}</Text>
                    <Text>{post.price}</Text>
                    <Text>{post.link}</Text>
                    {services.map((service, index) => {
                        return <Text key={index}>{service.attributes.name}</Text>;
                    })}
                </ScrollView>
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
