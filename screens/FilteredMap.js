import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import { useEffect } from 'react';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import HomeButton from '../components/HomeButton';

const Map = props => {
    const [postModal, setPostModal] = useState();
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

    const onPressMarkerHandle = post => {
        setPostModal(post);
    };
    const getImage = category => {
        //flatIcon 60*60
        if (category == 'Bivouac') return require(`../assets/Bivouac.png`);
        if (category == 'Camping') return require(`../assets/Camping.png`);
        if (category == 'Gîtes') return require(`../assets/Gîtes.png`);
        if (category == 'Insolite') return require(`../assets/Insolite.png`);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerButtons}>
                    <GoBackButton
                        onPress={() => props.navigation.goBack()}
                        title={`${posts.length}  ${
                            posts.length > 1 ? ' Résultats' : 'Résultat'
                        }`}
                        rightButton={
                            <View
                                style={{
                                    marginTop: Platform.OS === 'android' ? -50 : -30,
                                }}
                            >
                                <HomeButton
                                    onPress={() => props.navigation.push('app')}
                                />
                            </View>
                        }
                    />
                </View>
                <MapView
                    initialRegion={{
                        latitude: -21.158141,
                        longitude: 55.536384,
                        latitudeDelta: 0.58,
                        longitudeDelta: 0.58,
                    }}
                    loadingEnabled={true}
                    provider="google"
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    style={styles.map}
                >
                    {posts.map(post => {
                        return post.lat !== null ? (
                            <Marker
                                key={post.id}
                                coordinate={{
                                    latitude: Number(post.lat),
                                    longitude: Number(post.lon),
                                }}
                                onPress={() => onPressMarkerHandle(post)}
                                image={getImage(post.category)}
                            ></Marker>
                        ) : null;
                    })}
                </MapView>
                {postModal ? (
                    <View
                        style={{
                            marginHorizontal: 20,
                        }}
                    >
                        <View style={styles.containerPostCard}>
                            <PostCard
                                urlImage={
                                    postModal.image.attributes.formats.thumbnail.url
                                }
                                title={postModal.title}
                                category={postModal.category}
                                region={postModal.region}
                                onPress={() => fetchSinglePost(postModal)}
                            />
                        </View>
                    </View>
                ) : null}
            </SafeAreaView>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 50,
    },
    headerButtons: {
        position: 'absolute',
        zIndex: 2,
        paddingHorizontal: 10,
        top: -20,
        width: '100%',
    },
    containerPostCard: {
        position: 'absolute',
        bottom: 80,
    },
});
