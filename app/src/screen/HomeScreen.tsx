import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import COLORS from '../const/colors'
import { PetType } from '../enums/PetType'
import { Pet } from '../models'
import { PetService } from '../services'
import { useIsFocused } from '@react-navigation/native'

interface CardProps {
  pet: Pet
  navigation: any
}

const petCategories = [
  { id: PetType.CAT, name: 'GATOS', icon: 'cat' },
  { id: PetType.DOG, name: 'CACHORROS', icon: 'dog' },
  { id: PetType.BIRD, name: 'AVES', icon: 'bird' },
  { id: PetType.BUNNY, name: 'COELHOS', icon: 'rabbit' },
  { id: PetType.OTHER, name: 'OUTROS', icon: 'paw' }
]

interface HomeScreenProps {
  navigation: any
}

const Card: React.FC<CardProps> = ({ pet, navigation }) => {
  const petGender = pet.gender === 'M' ? 'male' : 'female'

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailsScreen', pet)}>
      <View style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Image source={pet.image} style={styles.cardImage} />
        </View>
        <View style={styles.cardDetailsContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>{pet.name}</Text>
            <MaterialCommunityIcons name={`gender-${petGender}`} size={25} color={COLORS.grey} />
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#306060" />
            <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.grey }}>{pet.foundLocal}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategoryIndex, setSeletedCategoryIndex] = useState(PetType.CAT)
  const [pets, setPets] = useState<Pet[]>([])
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])

  const isFocused = useIsFocused()

  useEffect(() => {
    setAllPets()
  }, [isFocused])

  useEffect(() => {
    filterPet(PetType.CAT)
  }, [pets])

  const setAllPets = async () => {
    const data = await PetService.getAll()

    if (data) setPets(data)
  }

  const filterPet = (index: number) => {
    const currentPets: Pet[] = pets.filter((item) => item.type == index)

    setFilteredPets(currentPets)
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="reorder-four" size={24} style={{ marginTop: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={24} color={COLORS.grey} style={{ marginTop: 12 }} />
          <TextInput placeholder="Procurar pet" style={{ flex: 1, marginLeft: 5 }} placeholderTextColor={COLORS.grey} />
          <MaterialCommunityIcons name="sort-ascending" size={24} color={COLORS.grey} style={{ marginTop: 12 }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
          }}
        >
          {petCategories.map((category) => (
            <View key={'pet' + category.id} style={{ alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setSeletedCategoryIndex(category.id)
                  filterPet(category.id)
                }}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: selectedCategoryIndex == category.id ? COLORS.primary : COLORS.white
                  }
                ]}
              >
                <MaterialCommunityIcons name={category.icon} size={30} color={selectedCategoryIndex == category.id ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.categoryButtonName}>{category.name}</Text>
            </View>
          ))}
        </View>
        <FlatList showsVerticalScrollIndicator={false} data={filteredPets} renderItem={({ item }) => <Card pet={item} navigation={navigation} />} keyExtractor={(item) => item.id.toString()} contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }} />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center'
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  categoryButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  categoryButtonName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: 'bold'
  }
})
