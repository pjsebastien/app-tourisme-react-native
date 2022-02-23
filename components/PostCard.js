import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const PostCard = ({ urlImage, title, category, region, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
            onPress={onPress}
        >
            <Image style={styles.cardImage} source={{ uri: urlImage }} />
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={styles.buttonDetails}>{category}</Text>
                    <Text style={styles.buttonDetails}>{region}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 10,
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
