//Libraries
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

const Home = props => {
    const featuredPosts = useSelector(state => state.featuredPosts);
    const categories = useSelector(state => state.categories);
    const posts = useSelector(state => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getCategories());
        dispatch(appActions.getFeaturedPosts());
        dispatch(appActions.getPosts());
    }, []);

    const fetchSingleFeaturedPost = featuredPost => {
        props.navigation.navigate('postDetails', {
            selectedPost: featuredPost,
        });
    };
    const fetchCategoryPosts = category => {
        props.navigation.navigate('categoryPosts', {
            selectedCategory: category,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground
                        source={require('../assets/camp-g6fdf47ac1_1280.jpg')}
                        style={styles.imageHero}
                    >
                        <TouchableOpacity activeOpacity={0.8} style={styles.menuIcon}>
                            <Ionicons
                                name="menu"
                                size={30}
                                color={Colors.textColorLight}
                                onPress={() => props.navigation.toggleDrawer()}
                            />
                        </TouchableOpacity>
                        <View style={styles.heroTexts}>
                            <View style={{ flexDirection: 'row' }}>
                                <Ionicons
                                    name="star-half-outline"
                                    size={26}
                                    color={Colors.primaryGreenDark}
                                />
                                <Text style={styles.heroProjectName}>
                                    Sous les étoiles
                                </Text>
                                <Ionicons
                                    name="star-half-outline"
                                    size={26}
                                    color={Colors.primaryGreenDark}
                                />
                            </View>

                            <Text style={styles.heroText}>
                                Découvrez les spots pour dormir en pleine nature à La
                                Réunion et ou les trouver sur une carte
                            </Text>
                        </View>
                    </ImageBackground>

                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('tabMap')}
                        activeOpacity={0.8}
                        style={styles.mapButton}
                    >
                        <Text style={styles.mapButtonText}>Voir la carte</Text>
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 25 }}>
                        <View>
                            <Text style={styles.featured}>Catégories </Text>
                            <View style={styles.cards}>
                                {categories.map(category => {
                                    return (
                                        <TouchableOpacity
                                            key={category.id}
                                            activeOpacity={0.8}
                                            style={styles.card}
                                            onPress={() =>
                                                fetchCategoryPosts(category.name)
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: category.image.attributes.formats
                                                        .thumbnail.url,
                                                }}
                                                style={styles.imageCard}
                                            />
                                            <Text style={styles.cardTextCategory}>
                                                {category.name}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.featured}>Les coups de </Text>
                                <Ionicons
                                    style={{ paddingTop: 15 }}
                                    name="heart"
                                    size={34}
                                    color={Colors.primaryGreen}
                                />
                            </View>
                            <View style={styles.cards}>
                                {featuredPosts.map(featuredPost => {
                                    return (
                                        <TouchableOpacity
                                            key={featuredPost.id}
                                            activeOpacity={0.8}
                                            style={styles.card}
                                            onPress={() =>
                                                fetchSingleFeaturedPost(featuredPost)
                                            }
                                        >
                                            <Image
                                                source={{
                                                    uri: featuredPost.image.attributes
                                                        .formats.thumbnail.url,
                                                }}
                                                style={styles.imageCard}
                                            />
                                            <Text
                                                style={styles.cardText}
                                                numberOfLines={3}
                                            >
                                                {featuredPost.title}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => props.navigation.navigate('tabPosts')}
                                style={styles.footerButton}
                            >
                                <Text style={styles.footerButtonText}>
                                    Tous les spots
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.footerTextContainer}>
                                <Text style={styles.footerTitle}>
                                    Explorez La Réunion
                                </Text>
                                <Text style={styles.footerText}>
                                    Trouvez le meilleur endroit où dormir en pleine nature
                                    pamis nos {posts.length} spots !
                                </Text>
                            </View>
                            <Image
                                style={styles.footerImage}
                                source={require('../assets/Pique-nique_creole.jpg')}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
    },
    menuIcon: {
        marginTop: Platform.OS === 'android' ? 35 : 30,
        marginLeft: 25,
        backgroundColor: Colors.primaryGreen,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
    imageHero: {
        width: '100%',
        height: 300,
        borderRadius: 15,
        resizeMode: 'cover',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    heroTexts: {
        marginHorizontal: 15,
        marginBottom: 50,
    },
    heroProjectName: {
        fontSize: 32,
        textTransform: 'capitalize',
        color: Colors.textColorLight,
        marginHorizontal: 8,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    heroText: {
        fontSize: 16,
        color: Colors.textColorLight,
    },
    mapButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
        marginHorizontal: 25,
        backgroundColor: Colors.primaryGreenDark,
        borderRadius: 10,
        width: 170,
    },
    mapButtonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: Colors.textColorLight,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    featured: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textColorDark,
        marginBottom: 10,
        marginTop: 25,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        height: 180,
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageCard: {
        width: '100%',
        height: 140,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    cardText: {
        color: Colors.textColorDark,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    cardTextCategory: {
        color: Colors.textColorDark,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
        letterSpacing: 0.7,
    },
    footerContainer: {
        flexDirection: 'column',
        backgroundColor: Colors.primaryGreen,
        borderRadius: 25,
        marginBottom: 50,
        marginTop: 40,
    },
    footerTextContainer: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerTitle: {
        marginHorizontal: 25,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.textColorLight,
    },
    footerText: {
        marginHorizontal: 25,
        marginTop: 5,
        fontSize: 16,
        color: Colors.textColorLight,
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginTop: 132,
        marginHorizontal: (Dimensions.get('window').width - 250) / 2,
        zIndex: 1,
        backgroundColor: Colors.primaryGreenDark,
        borderRadius: 10,
        width: 200,
    },
    footerButtonText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: Colors.textColorLight,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    footerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
});

export default Home;
