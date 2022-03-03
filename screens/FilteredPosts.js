//Libraries
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

const FilteredPosts = props => {
    const posts = useSelector(state => state.filteredPosts);
    const dispatch = useDispatch();

    let query = props.route.params.customQuery;

    useEffect(() => {
        dispatch(appActions.getFilteredPosts(query));
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
                    title={
                        posts.length > 0
                            ? posts.length > 1
                                ? `${posts.length} Résultats`
                                : `${posts.length} Résultat`
                            : 'Recherche avancée'
                    }
                    customContainerStyle={{
                        marginBottom: 5,
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {!posts.length ? (
                        <Text style={styles.notFound}>Aucun résultat</Text>
                    ) : (
                        posts.map(post => {
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
                        })
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default FilteredPosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 20,
    },
    notFound: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'rgba(0, 0,0 , 0.3)',
        marginTop: 30,
        textAlign: 'center',
    },
});
