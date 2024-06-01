import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native'
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
    { name: 'PÁSSAROS', icon: 'ladybug' },
    { name: 'COELHOS', icon: 'rabbit' },
];

interface HomeScreenProps {
    navigation: any;
}

//TODO: corrigir erro VirtualizedLists should never be nested inside plain ScrollViews

const Card: React.FC<CardProps> = ({ pet, navigation }) => {
    return <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.cardContainer}>
            <View style={styles.cardImageContainer}>
                <Image source={pet.image} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
            </View>
            <View style={styles.cardDetailsContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold', color: COLORS.dark, fontSize: 20}}>{pet?.name}
                    </Text>
                    <MaterialCommunityIcons name={`gender-${pet?.gender}`} size={25} color={COLORS.grey}/>
                </View>
            </View>
        </View>

    </TouchableOpacity>
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [selectedCategoryIndex, setSeletedCategoryIndex] = React.useState(0);
    const [filteredPets, setFilteredPets] = React.useState([]);

    const fliterPet = index => {
        const currentPets = pets.filter(
            item => item?.pet?.toUpperCase() == petCategories[index].name,
        )[0]?.pets;
        setFilteredPets(currentPets);
    };

    React.useEffect(() => {
        fliterPet(0);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="reorder-four" size={24} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={24} color={COLORS.grey} style={{ marginTop: 12 }} />
                        <TextInput placeholder="Procurar pet" style={{ flex: 1, marginLeft: 5 }}
                            placeholderTextColor={COLORS.grey} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20
                    }}>
                        {petCategories.map((item, index) => (
                            <View key={'pet' + index} style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSeletedCategoryIndex(index);
                                    }}
                                    style={[styles.categoryButton,
                                    {
                                        backgroundColor: selectedCategoryIndex == index
                                            ? COLORS.primary
                                            : COLORS.white,
                                    },
                                    ]}>
                                    <MaterialCommunityIcons name={item.icon} size={30} color={selectedCategoryIndex == index ? COLORS.white : COLORS.primary} />
                                </TouchableOpacity>
                                <Text style={styles.categoryButtonName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filteredPets}
                            renderItem={({ item }) => (
                                <Card pet={item} navigation={navigation} />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
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
        minHeight: height,
        backgroundColor: COLORS.light,
        marginTop: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
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
        backgroundColor: COLORS.primary
    },
    categoryButtonName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold'
    }
})