//Libraries
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import { useEffect } from 'react';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import FilterButton from '../components/FilterButton';

const Map = props => {
    let postsFetched = useSelector(state => state.posts);
    const [postModal, setPostModal] = useState();
    const [postSingle, setPostSingle] = useState(null);
    const [posts, setPosts] = useState([]);
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            setLocation(location);
        })();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            if (props.route.params) {
                let { selectedPost } = props.route.params;
                setPostSingle(selectedPost);
            }

            dispatch(appActions.getPosts());
            setPosts(postsFetched);

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setPostModal(null);
                setPostSingle(null);
                setPosts([]);
            };
        }, []),
    );

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
                        customContainerStyle={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        onPress={() => props.navigation.goBack()}
                        rightButton={
                            <FilterButton destination={'filteredMap'} props={props} />
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
                    {postSingle !== null ? (
                        <Marker
                            coordinate={{
                                latitude: Number(postSingle.lat),
                                longitude: Number(postSingle.lon),
                            }}
                            onPress={() => onPressMarkerHandle(postSingle)}
                            image={getImage(postSingle.category)}
                        ></Marker>
                    ) : (
                        posts.map(post => {
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
                        })
                    )}
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
