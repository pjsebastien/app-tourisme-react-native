//Libraries
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

const Posts = props => {
    let posts = useSelector(state => state.posts);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getPosts());
    }, []);
    const fetchSinglePost = post => {
        props.navigation.navigate('postDetails', {
            selectedPost: post,
        });
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <GoBackButton
                    onPress={() => props.navigation.goBack()}
                    title="Explorer La Réunion"
                    customContainerStyle={{
                        marginBottom: 5,
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {posts.map(post => {
                        return (
                            <PostCard
                                key={post.id}
                                urlImage={post.image.attributes.formats.thumbnail.url}
                                title={post.title}
                                category={post.category}
                                region={post.region}
                                onPress={() => fetchSinglePost(post)}
                            />
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Posts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 20,
    },
});
