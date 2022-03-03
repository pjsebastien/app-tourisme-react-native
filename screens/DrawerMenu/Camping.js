//Libraries
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../../constants/Colors';
import { MarkdownView } from 'react-native-markdown-view';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../../store/actions/App';

const Camping = () => {
    const camping = useSelector(state => state.camping);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getCamping());
    }, []);

    const openMail = () => {
        Linking.openURL(
            `mailto:pj.sebastien@gmail.com?subject=Rectification ou modification d'un spot &body=Votre message ici...`,
        );
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <MarkdownView style={markdown}>{camping.content}</MarkdownView>
                <View style={styles.contactButtons}>
                    <TouchableOpacity onPress={openMail} activeOpacity={0.7}>
                        <Text style={styles.buttonMail}>Envoyer un mail</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Camping;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backGroundColor,
        paddingHorizontal: 25,
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: 25,
    },
    buttonMail: {
        backgroundColor: Colors.primaryGreenDark,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 14,
        color: Colors.textColorLight,
        marginLeft: 10,
        marginBottom: 25,
        textAlign: 'center',
    },
});

const markdown = StyleSheet.create({
    marginVertical: 25,
});
