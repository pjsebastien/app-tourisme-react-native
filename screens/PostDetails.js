//Libraries
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import { useEffect } from 'react';
// import Markdown from 'react-native-markdown-display';

//redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';
import PostCard from '../components/PostCard';
import HomeButton from '../components/HomeButton';

const PostsDetails = ({ navigation, route }) => {
    //State
    const [post, setPost] = useState({});
    const [services, setServices] = useState([]);

    //Variables
    const dispatch = useDispatch();
    const similarPosts = useSelector(state => state.similarPosts);
    const newSimilarPosts = similarPosts.filter(
        similarPost => similarPost.id !== post.id,
    );

    useEffect(() => {
        let { selectedPost } = route?.params;
        setPost(selectedPost);
        setServices(selectedPost.services);
        dispatch(appActions.getSimilarPosts(selectedPost.category, selectedPost.region));
    }, []);

    const openGps = () => {
        // let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        let url = `https://www.google.com/maps/search/?api=1&query=${post.lat},${post.lon}`;
        // let url = scheme + `${post.lat},${post.lon}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.headerButtons}>
                        <GoBackButton onPress={() => navigation.goBack()} />
                        <HomeButton onPress={() => navigation.push('app')} />
                    </View>

                    <ImageBackground
                        style={styles.mainImage}
                        source={{
                            uri: post.postImage,
                        }}
                    >
                        <Text style={styles.buttonCat}>{post.category}</Text>
                        <Text style={styles.buttonCat}>{post.region}</Text>
                    </ImageBackground>
                    <View style={styles.containerContent}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {post.title}
                        </Text>
                        <View style={styles.servicesContainer}>
                            {services.map((service, index) => {
                                return (
                                    <Text style={styles.buttonServices} key={index}>
                                        {service.attributes.name}
                                    </Text>
                                );
                            })}
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.buttonCat}>gratuit</Text>
                        </View>
                        <Text style={{ marginVertical: 25 }}>{post.content}</Text>
                        <View style={styles.itineraryContainer}>
                            <Text style={styles.itineraryText}>itinéraire : </Text>
                            <Text>{post.itinerary}</Text>
                            <View style={styles.itineraryButtons}>
                                <Text style={styles.buttonMap}>Voir sur la carte</Text>
                                <TouchableOpacity onPress={openGps} activeOpacity={0.7}>
                                    <Text style={styles.buttonMap}>Google maps</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {newSimilarPosts.length > 0 ? (
                        <View>
                            <Text style={styles.similarText}>Spots similaires : </Text>
                            <FlatList
                                nestedScrollEnabled
                                horizontal
                                data={newSimilarPosts}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            marginHorizontal: 25,
                                            marginVertical: 15,
                                        }}
                                    >
                                        <PostCard
                                            key={item.key}
                                            urlImage={
                                                item.image.attributes.formats.thumbnail
                                                    .url
                                            }
                                            title={item.title}
                                            category={item.category}
                                            region={item.region}
                                            onPress={() =>
                                                navigation.push('postDetails', {
                                                    selectedPost: item,
                                                })
                                            }
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    ) : null}
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
    },
    headerButtons: {
        position: 'absolute',
        zIndex: 2,
        paddingHorizontal: 10,
        top: -20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    mainImage: {
        height: 300,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 25,
    },
    itineraryContainer: {
        padding: 15,
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
    },
    itineraryText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 10,
        marginBottom: 20,
    },
    itineraryButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 25,
    },
    similarText: {
        marginHorizontal: 25,
        marginTop: 25,
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerContent: {
        paddingHorizontal: 25,
        marginVertical: 20,
    },
    buttonCat: {
        backgroundColor: Colors.primaryGreen,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 14,
        color: Colors.textColorLight,
        marginRight: 10,
        marginBottom: 10,
    },
    buttonServices: {
        backgroundColor: Colors.primaryGreenDark,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 12,
        color: Colors.textColorLight,
        marginRight: 4,
        marginBottom: 5,
    },
    buttonMap: {
        backgroundColor: Colors.primaryGreenDark,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 14,
        color: Colors.textColorLight,
        marginLeft: 10,
        marginBottom: 5,
        textAlign: 'center',
    },
});
