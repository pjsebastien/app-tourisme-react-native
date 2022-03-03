//Libraries
import {
    FlatList,
    ImageBackground,
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import { useEffect } from 'react';
import { MarkdownView } from 'react-native-markdown-view';

//redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

//Components
import PostCard from '../components/PostCard';
import HomeButton from '../components/HomeButton';

const PostsDetails = ({ navigation, route }) => {
    //State
    const [post, setPost] = useState({});
    const [services, setServices] = useState([]);
    console.log(post);

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
    const openWebSite = () => {
        let url = post.link;
        Linking.openURL(url);
    };
    const openMail = () => {
        Linking.openURL(
            `mailto:pj.sebastien@gmail.com?subject=Rectification ou modification du spot : ${post.title} &body=Votre message ici...`,
        );
    };
    const openFormSpot = () => {
        Linking.openURL(`https://forms.gle/a2fuD1uYBvtggeKa7`);
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
                            <Text style={styles.buttonCat}>{post.price}</Text>
                        </View>
                        <MarkdownView style={{ marginVertical: 25 }}>
                            {post.content}
                        </MarkdownView>
                        <View style={styles.itineraryContainer}>
                            <Text style={styles.itineraryText}>itinéraire : </Text>

                            <Text style={{ fontStyle: 'italic' }}>
                                {post.itinerary
                                    ? post.itinerary
                                    : `Aucune information disponible pour le moment. Cliquez
                                    sur l'un des boutons ci dessous pour obtenir les
                                    coordonnées GPS.`}
                            </Text>

                            <View style={styles.itineraryButtons}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('map', {
                                            selectedPost: post,
                                        })
                                    }
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.buttonMap}>
                                        Voir sur la carte
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={openGps} activeOpacity={0.7}>
                                    <Text style={styles.buttonMap}>Google maps</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {post.adress ? (
                            <View style={styles.itineraryContainer}>
                                <Text style={styles.itineraryText}>contact : </Text>
                                <Text>{post.adress}</Text>
                                <View style={styles.itineraryButtons}>
                                    {post.phone ? (
                                        <Text style={styles.buttonPhone}>
                                            {post.phone}
                                        </Text>
                                    ) : null}
                                    {post.link ? (
                                        <TouchableOpacity
                                            onPress={openWebSite}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.buttonMap}>Site web</Text>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.itineraryContainer}>
                            <Text style={{ fontStyle: 'italic' }}>
                                ( Les informations fournies dans cette fiche sont à titre
                                indicatives, elles peuvent différer de la réalité et ne
                                pas être à jour, si vous souhaitez apporter une
                                rectification ou une modification, vous pouvez me
                                contacter par mail en cliquant ci dessous. Si vous
                                souhaitez contribuer en proposant un nouveau spot, cliquez
                                sur "proposer un spot" ){' '}
                            </Text>
                            <View style={styles.itineraryButtons}>
                                <TouchableOpacity
                                    onPress={openFormSpot}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.buttonMap}>Proposer un spot</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={openMail} activeOpacity={0.7}>
                                    <Text style={styles.buttonMap}>Envoyer un mail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {post.author ? (
                            <Text style={{ fontStyle: 'italic' }}>
                                * Contributeur du spot : {post.author}.
                            </Text>
                        ) : null}
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
        marginBottom: 25,
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
    buttonPhone: {
        backgroundColor: Colors.primaryGreen,
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
