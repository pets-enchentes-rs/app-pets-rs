import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { NavigationProp } from '@react-navigation/native'
import { format } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message'
import COLORS from '../const/colors'
import { useUser } from '../contexts/UserContext'
import { PetType } from '../enums/PetType'
import { Pet } from '../models'
import { PetService } from '../services'

type Props = {
  navigation: NavigationProp<any>
}

const RegisterPetScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useUser()

  const [animalTypeLabel, setAnimalTypeLabel] = useState('')
  const [animalType, setAnimalType] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [foundLocal, setFoundLocal] = useState('')
  const [foundAddress, setFoundAddress] = useState('')
  const [foundDate, setFoundDate] = useState<Date | null>(null)
  const [currentLocation, setCurrentLocation] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [contact, setContact] = useState('')
  const [genderLabel, setGenderLabel] = useState('')
  const [gender, setGender] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [animalModalVisible, setAnimalModalVisible] = useState(false)
  const [genderModalVisible, setGenderModalVisible] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false)

  const [animalTypeError, setAnimalTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [foundLocalError, setFoundLocalError] = useState(false)
  const [foundDateError, setFoundDateError] = useState(false)
  const [currentLocationError, setCurrentLocationError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const petTypeOptions = [
    { id: PetType.DOG, label: 'Cachorro' },
    { id: PetType.CAT, label: 'Gato' },
    { id: PetType.BUNNY, label: 'Coelho' },
    { id: PetType.BIRD, label: 'Ave' },
    { id: PetType.OTHER, label: 'Outro' }
  ]

  const genderOptions = [
    { id: 0, label: 'Macho', char: 'M' },
    { id: 1, label: 'Fêmea', char: 'F' },
    { id: 2, label: 'Não sei', char: 'N' },
  ]

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || foundDate
    setShowDatePicker(false)
    setFoundDate(currentDate)
  }

  const handleChangeAnimalType = (option: string) => {
    setAnimalTypeLabel(option)
    
    const animalTypeOption = petTypeOptions.find(opt => opt.label === option);
    const animalType = animalTypeOption ? animalTypeOption.id : PetType.OTHER;
  
    setAnimalType(animalType);
  }

  const getLocation = async (setCoords: Function, setAddress: Function) => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Permissão para acessar localização é necessária!')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })

    setCoords(`${location.coords.latitude}, ${location.coords.longitude}` )
    setAddress(`${address[0].street}, ${address[0].city ?? address[0].district}`)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImagePickerModalVisible(false)
    }
  }

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImagePickerModalVisible(false)
    }
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy')
  }

  const validateFields = () => {
    const fields = [
      { value: animalType, setter: setAnimalTypeError },
      { value: name, setter: setNameError },
      { value: description, setter: setDescriptionError },
      { value: foundLocal, setter: setFoundLocalError },
      { value: foundDate, setter: setFoundDateError },
      { value: currentLocation, setter: setCurrentLocationError },
      { value: gender, setter: setGenderError },
      { value: image, setter: setImageError }
    ]

    let valid = true

    fields.forEach((field) => {
      if (!field.value) {
        field.setter(true)
        valid = false
      } else {
        field.setter(false)
      }
    })

    if (!valid) {
      Toast.show({ type: 'error', text1: 'Campos incompletos 🙀', text2: 'Há campos obrigatórios que não foram preenchidos' })
    }

    return valid
  }

  const handleRegister = async () => {
    if (validateFields() && (user && user.id)) {
      const payload: Pet = {
        name,
        gender,
        type: animalType,
        image,
        foundDate,
        foundLocal,
        description,
        contact,
        idUser: user?.id
      }

      const data = await PetService.create(payload)

      if (data) {
        Toast.show({ type: 'success', text1: 'Sucesso 😸', text2: 'Pet cadastrado com sucesso' })
        navigation.navigate('HomeScreen')
      }
    }
  }

  const resetForm = () => {
    setAnimalTypeLabel('')
    setName('')
    setDescription('')
    setFoundLocal('')
    setFoundDate(null)
    setCurrentLocation('')
    setContact('')
    setGenderLabel('')
    setImage(null)

    setAnimalTypeError(false)
    setNameError(false)
    setDescriptionError(false)
    setFoundLocalError(false)
    setFoundDateError(false)
    setCurrentLocationError(false)
    setGenderError(false)
    setImageError(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', resetForm)
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.light} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={[styles.imageContainer, imageError && styles.errorInput]} onPress={() => setImagePickerModalVisible(true)}>
          {!image && <Ionicons name="image-outline" size={50} color={COLORS.dark} />}
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={imagePickerModalVisible} onRequestClose={() => setImagePickerModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
              <Text style={styles.modalButtonText}>Usar Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.modalButtonText}>Escolher da Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setImagePickerModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity style={[styles.inputContainer, animalTypeError && styles.errorInput]} onPress={() => setAnimalModalVisible(true)}>
          <Ionicons name="paw" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{animalTypeLabel || 'Selecionar tipo de animal'}</Text>
        </TouchableOpacity>

        <View style={[styles.inputContainer, nameError && styles.errorInput]}>
          <Ionicons name="text" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Nome" value={name} onChangeText={setName} />
        </View>

        <Modal animationType="slide" transparent={true} visible={animalModalVisible} onRequestClose={() => setAnimalModalVisible(!animalModalVisible)}>
          <View style={styles.modalView}>
            {petTypeOptions.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={styles.modalButton}
                onPress={() => {
                  handleChangeAnimalType(type.label)
                  setAnimalModalVisible(false)
                }}
              >
                <Text style={styles.modalButtonText}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <View style={[styles.inputContainer, descriptionError && styles.errorInput]}>
          <Ionicons name="clipboard" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput style={[styles.textInput]} placeholder="Descrição" value={description} onChangeText={setDescription} multiline />
        </View>

        <TouchableOpacity style={[styles.inputContainer, foundDateError && styles.errorInput]} onPress={openDatePicker}>
          <Ionicons name="calendar" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{foundDate ? formatDate(foundDate) : 'Data encontrada'}</Text>
        </TouchableOpacity>
        {showDatePicker && <DateTimePicker value={foundDate || new Date()} mode="date" display="default" onChange={handleDateChange} />}

        <TouchableOpacity style={[styles.inputContainer, currentLocationError && styles.errorInput]} onPress={() => getLocation(setCurrentLocation, setCurrentAddress)}>
          <Ionicons name="location-sharp" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{currentAddress || 'Endereço Atual do Pet'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.inputContainer, foundLocalError && styles.errorInput]} onPress={() => getLocation(setFoundLocal, setFoundAddress)}>
          <Ionicons name="location" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{foundAddress || 'Endereço Encontrado'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.inputContainer, genderError && styles.errorInput]} onPress={() => setGenderModalVisible(true)}>
          <Ionicons name="male-female" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{genderLabel || 'Selecionar gênero'}</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            style={styles.textInput}
            placeholder="Contato"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        <Modal animationType="slide" transparent={true} visible={genderModalVisible} onRequestClose={() => setGenderModalVisible(!genderModalVisible)}>
          <View style={styles.modalView}>
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender.id}
                style={styles.modalButton}
                onPress={() => {
                  setGender(gender.char)
                  setGenderLabel(gender.label)
                  setGenderModalVisible(false)
                }}
              >
                <Text style={styles.modalButtonText}>{gender.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
          <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    marginTop: 40
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    color: COLORS.lightGrey,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start'
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 30,
    elevation: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 50,
    width: '85%'
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalButton: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: 18
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 20,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.grey
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 40,
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
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1
  }
})

export default RegisterPetScreen
