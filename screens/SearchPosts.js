//Libraries
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

//Components
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';
import FilterButton from '../components/FilterButton';

const SearchPosts = props => {
    const [query, setQuery] = useState('');
    const searchedPosts = useSelector(state => state.searchedPosts);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getPosts());
    }, []);

    const handleOnSubmit = () => {
        dispatch(appActions.getSearchedPosts(query));
    };

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
                    title="Recherche avancée"
                    rightButton={
                        <FilterButton props={props} destination={'filteredPosts'} />
                    }
                />
                <TextInput
                    value={query}
                    onChangeText={text => setQuery(text)}
                    placeholder="Entrez votre recherche..."
                    style={styles.searchInput}
                    onSubmitEditing={() => handleOnSubmit()}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {!searchedPosts.length ? (
                        <>
                            <Text style={styles.notFound}>Aucun résultat</Text>
                            <Text style={styles.notFound}>
                                Pour affiner votre recherche cliquez sur le bouton en haut
                                à droite.
                            </Text>
                        </>
                    ) : (
                        searchedPosts.map(post => {
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

export default SearchPosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 20,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: Colors.primaryGreenFaded,
        borderRadius: 5,
        padding: 5,
        fontSize: 16,
        marginTop: 15,
    },
    notFound: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'rgba(0, 0,0 , 0.3)',
        marginTop: 30,
        textAlign: 'center',
    },
});
