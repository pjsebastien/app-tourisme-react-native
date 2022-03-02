//Libraries
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

const CategoryPosts = props => {
    const posts = useSelector(state => state.categoryPosts);
    let { selectedCategory } = props.route.params;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getCategoryPosts(selectedCategory));
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
                    title={selectedCategory}
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

export default CategoryPosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 20,
    },
});
