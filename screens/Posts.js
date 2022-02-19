//Libraries
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import GoBackButton from '../components/GoBackButton';
import PostCard from '../components/PostCard';

const Posts = props => {
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
                    <PostCard
                        urlImage={require('../assets/Pique-nique_creole.jpg')}
                        title="Béthléem à côté de Saint Benoit et sa baignade fraiche"
                        category="Camping en gîte"
                        region="Ouest"
                    />
                    <PostCard
                        urlImage={require('../assets/camping-ile-de-la-reunion-mafate.jpg')}
                        title="Le camping du bois jolie à Cilaos entre bras sec et moulin
                                papon"
                        category="Camping"
                        region="est"
                    />
                    <PostCard
                        urlImage={require('../assets/Pique-nique_creole.jpg')}
                        title="Béthléem à côté de Saint Benoit et sa baignade fraiche"
                        category="Camping en gîte"
                        region="Ouest"
                    />
                    <PostCard
                        urlImage={require('../assets/camping-ile-de-la-reunion-mafate.jpg')}
                        title="Le camping du bois jolie à Cilaos entre bras sec et moulin
                                papon"
                        category="Camping"
                        region="est"
                    />
                    <PostCard
                        urlImage={require('../assets/Pique-nique_creole.jpg')}
                        title="Béthléem à côté de Saint Benoit et sa baignade fraiche"
                        category="Camping en gîte"
                        region="Ouest"
                    />
                    <PostCard
                        urlImage={require('../assets/camping-ile-de-la-reunion-mafate.jpg')}
                        title="Le camping du bois jolie à Cilaos entre bras sec et moulin
                                papon"
                        category="Camping"
                        region="est"
                    />
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
    cardContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        height: 120,
        borderRadius: 15,
        flexDirection: 'row',
    },
    cardImage: {
        height: '100%',
        width: 110,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cardTextContainer: {
        width: Dimensions.get('window').width - 150,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonDetails: {
        backgroundColor: Colors.primaryGreen,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        fontSize: 12,
        color: Colors.textColorLight,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.textColorDark,
    },
});
