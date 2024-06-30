import { MaterialCommunityIcons } from '@expo/vector-icons'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../const/colors'
import { useUser } from '../contexts/UserContext'
import { Pet, User } from '../models'
import { UserService } from '../services'

const DetailsPetScreen = ({ navigation, route }) => {
  const { user } = useUser()
  const pet = route.params as Pet

  const [genderIcon, setGenderIcon] = useState('')
  const [foundAddress, setFoundAddress] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [userFound, setUserFound] = useState<User>()
  const [isActualUser, setIsActualUser] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const foundAddress = await handleFoundAddress(pet.foundLocal)
      const currentAddress = await handleCurrentAddress(pet.currentLocal)
      const data = await UserService.getById(pet.idUser)

      setFoundAddress(foundAddress)
      setCurrentAddress(currentAddress)

      if (data && data.id) {
        setUserFound(data)
        setIsActualUser(user ? data.id == user.id : false)
      }
    }

    handleGenderIcon(pet.gender)

    fetchData()
  }, [pet])

  const handleGenderIcon = (gender: string) => {
    switch (gender) {
      case 'M':
        setGenderIcon('gender-male')
        break

      case 'F':
        setGenderIcon('gender-female')
        break

      case 'N':
      default:
        setGenderIcon('help')
        break
    }
  }

  const handleFoundAddress = async (foundLocal: string): Promise<string> => {
    const coords = foundLocal.split(', ')

    let path = ''

    if (coords) {
      const address = await Location.reverseGeocodeAsync({
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1])
      })

      path = `${address[0].street}, ${address[0].city ?? address[0].district}`
    }

    return path
  }

  const handleCurrentAddress = async (currentLocal: string): Promise<string> => {
    const coords = currentLocal.split(', ')

    let path = ''

    if (coords) {
      const address = await Location.reverseGeocodeAsync({
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1])
      })

      path = `${address[0].formattedAddress}`
    }

    return path
  }

  const handleButtonPress = () => {
    if (isActualUser) {
      navigation.navigate('RegisterPetScreen', { isEditing: true, pet })
    } else {
      const phone = pet.contact ?? userFound?.phone
      const cleaned = phone.replace(/\D/g, '')

      Linking.openURL(`tel:+55${cleaned}`)
    }
  }

  return (
    <>
      {pet ? (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" style="light" />
          <View style={styles.background}>
            <ImageBackground source={{ uri: pet.image }} resizeMode="cover" style={styles.imageBackground}>
              <View style={styles.header}>
                <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.white} onPress={navigation.goBack} />
              </View>
            </ImageBackground>

            <View style={styles.detailsContainer}>
              <View style={styles.detailsHeader}>
                <Text style={styles.petName}>{pet.name}</Text>
                <MaterialCommunityIcons name={genderIcon} size={25} color={COLORS.grey} />
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MapScreen', { currentLocal: pet.currentLocal })}>
                <View style={styles.addressContainer}>
                  <MaterialCommunityIcons name="map-marker" size={18} color="#306060" />
                  <Text style={styles.currentAddress}>{currentAddress}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <View>
              <View style={styles.userInfoContainer}>
                {userFound ? (
                  <>
                    <Image
                      source={userFound.image ? { uri: userFound.image } : require('../assets/default-user.png')}
                      style={styles.userImage}
                    />
                    <View style={styles.userInfoText}>
                      <Text style={styles.userName}>{userFound.name}</Text>
                      <View style={styles.userPhoneContainer}>
                        <MaterialCommunityIcons name="phone" size={16} color="#306060" />
                        <Text style={styles.phoneLabel}>{userFound.phone}</Text>
                      </View>
                    </View>
                  </>
                ) : null}
                <Text style={styles.foundDate}>
                  {pet.foundDate ? format(pet.foundDate, 'dd/MM/yyyy') : ''}
                </Text>
              </View>
              <Text style={styles.description}>{pet.description}</Text>
              <View style={styles.foundAddressContainer}>
                <MaterialCommunityIcons name="map-marker" size={18} color="#306060" />
                <Text style={styles.foundAddress}>Encontrado em: {foundAddress}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
              <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
                <Text style={styles.buttonText}>{isActualUser ? 'Editar' : 'Contatar'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  background: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  imageBackground: {
    height: 400
  },
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
    justifyContent: 'center'
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  petName: {
    fontSize: 20,
    color: COLORS.dark,
    fontWeight: 'bold'
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  currentAddress: {
    fontSize: 12,
    marginLeft: 5,
    color: COLORS.grey
  },
  footer: {
    marginTop: 80,
    justifyContent: 'space-between',
    flex: 1
  },
  userInfoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 30
  },
  userInfoText: {
    flex: 1,
    paddingLeft: 10
  },
  userName: {
    color: COLORS.dark,
    fontSize: 13,
    fontWeight: 'bold'
  },
  userPhoneContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  phoneLabel: {
    color: COLORS.grey,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    marginLeft: 5
  },
  foundDate: {
    color: COLORS.grey,
    fontSize: 12
  },
  description: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20
  },
  foundAddressContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20
  },
  foundAddress: {
    fontSize: 12,
    marginLeft: 5,
    color: COLORS.dark
  },
  buttonContainer: {
    marginBottom: 30,
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 20,
    elevation: 10,
    width: '85%'
  },
  button: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default DetailsPetScreen
