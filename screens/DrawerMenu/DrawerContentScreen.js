import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';

function DrawerContentScreen(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View style={{ marginTop: 50 }}>
                    <DrawerItemList {...props} />
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 50,
                    }}
                >
                    <Text style={{ fontSize: 12 }}>
                        {' '}
                        Version{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                            {Platform.OS === 'ios' ? 'Iphone' : 'Android'}
                        </Text>
                    </Text>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export default DrawerContentScreen;

const styles = StyleSheet.create({
    logo: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        marginVertical: 15,
    },
});
