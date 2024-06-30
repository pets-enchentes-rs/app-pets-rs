import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';
import COLORS from '../const/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MapScreen = ({ navigation, route }) => {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const { currentLocal } = route.params;

    const initialRegion = currentLocal ? {
        latitude: parseFloat(currentLocal.split(',')[0]),
        longitude: parseFloat(currentLocal.split(',')[1]),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    } : null;

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={28}
                    color={COLORS.grey}
                    onPress={() => navigation.goBack()}
                />
            </View>
            {
                initialRegion &&
                <MapView style={styles.map}
                    initialRegion={initialRegion}
                >
                    <Marker
                        coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude
                        }} />
                </MapView>
            }
        </View>
    );
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        borderRadius: 18,
        backgroundColor: COLORS.background,
    },
    map: {
        flex: 1,
        width: '100%'
    }
});
