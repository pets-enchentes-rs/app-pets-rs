import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../const/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import pets from '../const/pets';

const { height } = Dimensions.get('window');

interface PetCategory {
    name: string;
    icon: string;
}

interface Pet {
    id: number;
    name: string;
    type: string;
    age: string;
    pet: string;
    gender: string;
    image: string;
}

interface CardProps {
    pet: Pet;
    navigation: any;
}

const petCategories = [
    { name: 'GATOS', icon: 'cat' },
    { name: 'CACHORROS', icon: 'dog' },
    { name: 'AVES', icon: 'bird' },
    { name: 'COELHOS', icon: 'rabbit' },
    { name: 'OUTROS', icon: 'paw' },
];

interface HomeScreenProps {
    navigation: any;
}

const Card: React.FC<CardProps> = ({ pet, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', pet)}>
            <View style={styles.cardContainer}>
                <View style={styles.cardImageContainer}>
                    <Image source={pet.image} style={styles.cardImage} />
                </View>
                <View style={styles.cardDetailsContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>{pet?.name}</Text>
                        <MaterialCommunityIcons name={`gender-${pet?.gender}`} size={25} color={COLORS.grey} />
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="map-marker" size={18} color='#306060' />
                        <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.grey }}>{pet?.location}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredPets, setFilteredPets] = React.useState([]);

    const filterPet = index => {
        const currentPets = pets.filter(
            item => item?.pet?.toUpperCase() == petCategories[index].name,
        )[0]?.pets;
        setFilteredPets(currentPets);
    };

    React.useEffect(() => {
        filterPet(0);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="reorder-four" size={24} style={{ marginTop: 20 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={24} color={COLORS.grey} style={{ marginTop: 12 }} />
                    <TextInput
                        placeholder="Procurar pet"
                        style={{ flex: 1, marginLeft: 5 }}
                        placeholderTextColor={COLORS.grey}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    {petCategories.map((item, index) => (
                        <View key={'pet' + index} style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setSeletedCategoryIndex(index);
                                    filterPet(index);
                                }}
                                style={[styles.categoryButton, {
                                    backgroundColor: selectedCategoryIndex == index ? COLORS.primary : COLORS.white,
                                }]}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={30}
                                    color={selectedCategoryIndex == index ? COLORS.white : COLORS.primary}
                                />
                            </TouchableOpacity>
                            <Text style={styles.categoryButtonName}>{item.name}</Text>
                        </View>
                    ))}
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredPets}
                    renderItem={({ item }) => <Card pet={item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
                />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.background,
        borderRadius: 20,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    categoryButton: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    categoryButtonName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    }
});
