import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../const/colors';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

type Pet = {
    id: string;
    name: string;
    description: string;
    foundLocation: string;
    image: any;
};

type Props = {
    navigation: NavigationProp<any>;
};

const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

const pets: Pet[] = [
    {
        id: '1',
        name: 'Bobby',
        description: 'Cachorro encontrado na rua principal.',
        foundLocation: 'Rua Principal, 123',
        image: require('../assets/dog1.jpg'),
    },
    {
        id: '2',
        name: 'Mimi',
        description: 'Gata encontrada perto do parque.',
        foundLocation: 'Avenida do Parque, 456',
        image: require('../assets/cat1.jpg'),
    },
];

const PetListScreen: React.FC<Props> = ({ navigation }) => {
    const renderItem = ({ item }: { item: Pet }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.locationContainer}>
                    <Ionicons name="location" size={16} color={COLORS.primary} />
                    <Text style={styles.location}>{item.foundLocation}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color={COLORS.dark} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={pets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity style={styles.buttonContainer}
                onPress={() => navigation.navigate('RegisterPetScreen')}>
                <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
                    <Text style={styles.buttonText}>Novo</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 50,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.dark,
        textAlign: 'center',
        flex: 1,
    },
    list: {
        flexGrow: 1,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    location: {
        fontSize: 12,
        color: COLORS.primary,
        marginLeft: 5,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 30,
        marginHorizontal: 40,
        borderRadius: 20,
        elevation: 10,
        width: '85%'
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default PetListScreen;
