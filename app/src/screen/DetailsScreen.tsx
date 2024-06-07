import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../const/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailsScreen = ({ navigation, route }) => {
    const pet = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor="transparent" style="light" />
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <ImageBackground
                    source={pet?.image}
                    resizeMode="cover"
                    style={{ height: 400 }}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} onPress={navigation.goBack} />
                    </View>
                </ImageBackground>

                <View style={styles.detailsContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20, color: COLORS.dark, fontWeight: 'bold' }}>{pet?.name}</Text>
                        <MaterialCommunityIcons name={`gender-${pet?.gender}`} size={25} color={COLORS.grey} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <MaterialCommunityIcons name="map-marker" size={18} color='#306060' />
                        <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.grey }}>{pet?.location}</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 80, justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <Image source={require('../assets/user.jpg')} style={{ height: 50, width: 50, borderRadius: 30 }} />
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={{ color: COLORS.dark, fontSize: 13, fontWeight: 'bold' }}>
                                ANA LUÍSA
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <MaterialCommunityIcons name="phone" size={16} color='#306060' />
                                <Text style={{ color: COLORS.grey, fontSize: 12, fontWeight: 'bold', marginTop: 2 }}>
                                    (51)9659-3820
                                </Text>
                            </View>
                        </View>
                        <Text style={{ color: COLORS.grey, fontSize: 12 }}>25 de Maio de 2024</Text>
                    </View>
                    <Text style={styles.description}>
                        {pet?.description}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginTop: 20
    },
    detailsContainer: {
        position: 'absolute',
        top: 320,
        left: 20,
        right: 20,
        height: 120,
        backgroundColor: COLORS.white,
        borderRadius: 18,
        elevation: 10,
        padding: 20,
        justifyContent: 'center',
    },
    description: {
        marginTop: 10,
        fontSize: 13,
        color: COLORS.dark,
        lineHeight: 20,
        marginHorizontal: 20,
    },
});
