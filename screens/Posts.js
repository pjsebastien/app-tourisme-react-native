//Libraries
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import { useState } from 'react';

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
    // const fetchMorePosts = () => {
    //     start += 1;
    //     dispatch(appActions.getPosts(start, limit));
    //     setLatestPosts([...latestPosts, ...posts]);
    // };

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
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={({ item }) => {
                        return (
                            <PostCard
                                key={item.id}
                                urlImage={item.image.attributes.formats.thumbnail.url}
                                title={item.title}
                                category={item.category}
                                region={item.region}
                                onPress={() => fetchSinglePost(item)}
                            />
                        );
                    }}
                    // onEndReached={fetchMorePosts}
                    // onEndReachedThreshold={0}
                    ListFooterComponent={() => {
                        return <Text style={styles.reachToEnd}>Fin des spots</Text>;
                    }}
                />
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
    reachToEnd: {
        fontWeight: 'bold',
        color: '#383838',
        textAlign: 'center',
        paddingVertical: 20,
    },
});
