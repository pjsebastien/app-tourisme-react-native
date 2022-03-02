//Libraries
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as appActions from '../store/actions/App';

//components
import ResetButtonFilter from './ResetFilterButton';

const FilterButton = ({ props, destination, customContainerStyle }) => {
    //States
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const categories = useSelector(state => state.categories);
    const regions = useSelector(state => state.regions);
    const services = useSelector(state => state.services);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appActions.getCategories());
        dispatch(appActions.getRegions());
        dispatch(appActions.getServices());
    }, []);

    const handleButtonCategory = category => {
        if (!selectedCategories.includes(category.name)) {
            setSelectedCategories([...selectedCategories, category.name]);
        }
    };
    const handleButtonRegion = region => {
        if (!selectedRegions.includes(region.name)) {
            setSelectedRegions([...selectedRegions, region.name]);
        }
    };
    const handleButtonService = service => {
        if (!selectedServices.includes(service.name)) {
            setSelectedServices([...selectedServices, service.name]);
        }
    };

    const getQuery = () => {
        let query = '';
        if (selectedCategories.length > 0) {
            selectedCategories.forEach(
                selectedCategory =>
                    (query += `[filters][category][name][$containsi]=${selectedCategory}&`),
            );
        }
        if (selectedRegions.length > 0) {
            selectedRegions.forEach(
                selectedRegion =>
                    (query += `[filters][region][name][$eq]=${selectedRegion}&`),
            );
        }
        if (selectedServices.length > 0) {
            selectedServices.forEach(
                selectedService =>
                    (query += `[filters][$and][${selectedServices.indexOf(
                        selectedService,
                    )}][services][name][$eq]=${selectedService}&`),
            );
        }
        return query;
    };
    const handleOnSubmit = () => {
        let query = getQuery();
        props.navigation.navigate(destination, { customQuery: query });
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
                style={{ ...customContainerStyle, ...styles.container }}
            >
                <Ionicons name="options-outline" size={23} color="white" />
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        paddingHorizontal: 25,
                        paddingTop: 50,
                    }}
                >
                    <View style={styles.titleContainer}>
                        <Text style={styles.label}>Catégorie : </Text>
                        <ResetButtonFilter onPress={() => setSelectedCategories([])} />
                    </View>
                    <View style={styles.buttonContainer}>
                        {categories.map(category => {
                            return (
                                <Pressable
                                    style={[
                                        {
                                            backgroundColor: selectedCategories.includes(
                                                category.name,
                                            )
                                                ? Colors.primaryGreenDark
                                                : Colors.primaryGreen,
                                        },
                                        styles.buttonDetails,
                                    ]}
                                    onPress={() => {
                                        handleButtonCategory(category);
                                    }}
                                    key={category.id}
                                >
                                    <Text style={styles.buttonTextDetails}>
                                        {category.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.label}>Region : </Text>
                        <ResetButtonFilter onPress={() => setSelectedRegions([])} />
                    </View>

                    <View style={styles.buttonContainer}>
                        {regions.map(region => {
                            return (
                                <Pressable
                                    style={[
                                        {
                                            backgroundColor: selectedRegions.includes(
                                                region.name,
                                            )
                                                ? Colors.primaryGreenDark
                                                : Colors.primaryGreen,
                                        },
                                        styles.buttonDetails,
                                    ]}
                                    onPress={() => {
                                        handleButtonRegion(region);
                                    }}
                                    key={region.id}
                                >
                                    <Text style={styles.buttonTextDetails}>
                                        {region.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.label}>Services : </Text>
                        <ResetButtonFilter onPress={() => setSelectedServices([])} />
                    </View>

                    <View style={styles.buttonContainer}>
                        {services.map(service => {
                            return (
                                <Pressable
                                    style={[
                                        {
                                            backgroundColor: selectedServices.includes(
                                                service.name,
                                            )
                                                ? Colors.primaryGreenDark
                                                : Colors.primaryGreen,
                                        },
                                        styles.buttonDetails,
                                    ]}
                                    onPress={() => {
                                        handleButtonService(service);
                                    }}
                                    key={service.id}
                                >
                                    <Text style={styles.buttonTextDetails}>
                                        {service.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    <View style={styles.buttonsModal}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.submit}>Retour</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleOnSubmit()}
                        >
                            <Text style={styles.submit}>Rechercher</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

export default FilterButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryGreen,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonsModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 70,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    submit: {
        backgroundColor: Colors.primaryGreenDark,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        fontSize: 16,
        color: Colors.textColorLight,
        marginTop: 50,

        textAlign: 'center',
    },
    label: {
        color: Colors.textColorDark,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    buttonDetails: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginRight: 8,
        marginBottom: 10,
    },
    buttonTextDetails: {
        fontSize: 14,
        color: Colors.textColorLight,
    },
});
