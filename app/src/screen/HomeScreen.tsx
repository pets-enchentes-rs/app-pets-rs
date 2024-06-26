import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import COLORS from '../const/colors'
import { PetType } from '../enums/PetType'
import { Pet } from '../models'
import { PetService } from '../services'
import FilterModal from './FilterModal'

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
  const [genderIcon, setGenderIcon] = useState('')
  const [foundAddress, setFoundAddress] = useState('')

  const imageSource = typeof pet.image === 'string' ? { uri: pet.image } : pet.image;

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleFoundAddress(pet.foundLocal);
      setFoundAddress(result)
    };

    handleGenderIcon(pet.gender)

    fetchData()
  }, [pet])

  const handleGenderIcon = (gender: string) => {
    switch (gender) {
      case 'M':
        setGenderIcon('gender-male')
        break;
    
      case 'F':
        setGenderIcon('gender-female')
        break;

      case 'N':
      default:
        setGenderIcon('help')
        break;
    }
  };

  const handleFoundAddress = async (foundLocal: string): Promise<string> => {
    const coords = foundLocal.split(', ')
  
    const address = await Location.reverseGeocodeAsync({
      latitude: parseFloat(coords[0]),
      longitude: parseFloat(coords[1])
    })
  
    return `${address[0].street}, ${address[0].city ?? address[0].district}`
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DetailsPetScreen', pet)}>
      <View style={styles.cardContainer}>
        <View style={styles.cardImageContainer}>
          <Image source={imageSource} style={styles.cardImage} />
        </View>
        <View style={styles.cardDetailsContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 20 }}>{pet.name}</Text>
            <MaterialCommunityIcons name={genderIcon} size={25} color={COLORS.grey} />
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#306060" />
            <Text style={{ fontSize: 12, marginLeft: 5, color: COLORS.grey }}>{foundAddress}</Text>
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
  const [isModalVisible, setModalVisible] = useState(false)
  const [gender, setGender] = useState('')
  const [showRadioOptions, setShowRadioOptions] = useState('Todos')
  const [searchText, setSearchText] = useState('')

  const isFocused = useIsFocused()

  useEffect(() => {
    setAllPets()
  }, [isFocused])

  useEffect(() => {
    filterPet(PetType.CAT)
  }, [pets])

  useEffect(() => {
    filterPetsBySearchText(searchText)
  }, [searchText, selectedCategoryIndex, pets])

  const setAllPets = async () => {
    const data = await PetService.getAll()
    if (data) setPets(data)
  }

  const filterPet = (index: number) => {
    const currentPets: Pet[] = pets.filter((item) => item.type == index)
    setFilteredPets(currentPets)
  }

  const filterPetsBySearchText = (text: string) => {
    const currentPets: Pet[] = pets.filter((item) =>
      item.type == selectedCategoryIndex && item.name?.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredPets(currentPets)
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
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
          <TextInput
            placeholder="Procurar pet"
            style={{ flex: 1, marginLeft: 5 }}
            placeholderTextColor={COLORS.grey}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={toggleModal}>
            <MaterialCommunityIcons name="sort-ascending" size={24} color={COLORS.grey} style={{ marginTop: 12 }} />
          </TouchableOpacity>
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
                <MaterialCommunityIcons name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={30} color={selectedCategoryIndex == category.id ? COLORS.white : COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.categoryButtonName}>{category.name}</Text>
            </View>
          ))}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredPets}
          renderItem={({ item }) => <Card pet={item} navigation={navigation} />}
          keyExtractor={(item) => item.id ? item.id.toString() : ''}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
        />
      </View>

      <FilterModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        gender={gender}
        setGender={setGender}
        showRadioOptions={showRadioOptions}
        setShowRadioOptions={setShowRadioOptions}
      />
    </View>
  )
}

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

export default HomeScreen
