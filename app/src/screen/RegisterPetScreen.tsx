import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { NavigationProp } from '@react-navigation/native'
import { format } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Toast from 'react-native-toast-message'
import COLORS from '../const/colors'
import { useUser } from '../contexts/UserContext'
import { PetType } from '../enums/PetType'
import { Pet } from '../models'
import { PetService } from '../services'
import AddressModal from './AddressModal'

interface Props {
  navigation: NavigationProp<any>
  route: any
}

const RegisterPetScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useUser();
  const isEditing = route.params?.isEditing || false;
  const petToEdit: Pet = route.params?.pet || null;

  const [pet, setPet] = useState<Pet>({
    name: '',
    gender: '',
    type: 0,
    image: null,
    foundLocal: '',
    foundDate: null,
    currentLocal: '',
    description: '',
    contact: '',
    idUser: 0
  })

  const [animalTypeLabel, setAnimalTypeLabel] = useState('')
  const [foundDate, setFoundDate] = useState<Date | null>(null)

  const [currentLocalModalVisible, setCurrentLocalModalVisible] = useState(false);
  const [foundLocalModalVisible, setFoundLocalModalVisible] = useState(false);

  const [foundAddress, setFoundAddress] = useState({ street: '', neighborhood: '', number: '', postalCode: '', city: '' });
  const [currentAddress, setCurrentAddress] = useState({ street: '', neighborhood: '', number: '', postalCode: '', city: '' });
  const [genderLabel, setGenderLabel] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [animalModalVisible, setAnimalModalVisible] = useState(false)
  const [genderModalVisible, setGenderModalVisible] = useState(false)
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false)

  const [animalTypeError, setAnimalTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [foundLocalError, setFoundLocalError] = useState(false)
  const [foundDateError, setFoundDateError] = useState(false)
  const [currentLocalError, setCurrentLocalError] = useState(false)
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

  useEffect(() => {
    if (isEditing && petToEdit) {
      setPet(petToEdit);

      setAnimalTypeLabel(petTypeOptions.find(opt => opt.id === petToEdit.type)?.label || '')
      setGenderLabel(genderOptions.find(opt => opt.char === petToEdit.gender)?.label || '')

      fetchAddress(petToEdit.currentLocal, true);
      fetchAddress(petToEdit.foundLocal, false);
    }
  }, [isEditing, petToEdit]);

  const fetchAddress = async (coords: string, isCurrent: boolean) => {
    const [latitude, longitude] = coords.split(',').map(coord => parseFloat(coord.trim()));
    const address = await getAddress(latitude, longitude);
    if (isCurrent) {
      setCurrentAddress(address);
    } else {
      setFoundAddress(address);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const handleDateChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || pet.foundDate
    setShowDatePicker(false)

    setFoundDate(currentDate)
    setPet(prev => ({ ...prev, foundDate: currentDate }))
  }

  const handleSaveCurrentLocation = (addressInfo) => {
    setCurrentLocalModalVisible(false);
    const coordinates = `${addressInfo.latitude}, ${addressInfo.longitude}`;
    setPet(prev => ({ ...prev, currentLocal: coordinates }));
    setCurrentAddress(addressInfo);
  };

  const handleSaveFoundLocation = (addressInfo) => {
    setFoundLocalModalVisible(false);
    const coordinates = `${addressInfo.latitude}, ${addressInfo.longitude}`;
    setPet(prev => ({ ...prev, foundLocal: coordinates }));
    setFoundAddress(addressInfo);
  };

  const getAddress = async (latitude: number, longitude: number): Promise<{ street: string, neighborhood: string, number: string, postalCode: string, city: string }> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        return {
          street: data.address.road || '',
          neighborhood: data.address.suburb || '',
          number: data.address.house_number || '',
          postalCode: data.address.postcode || '',
          city: data.address.city || data.address.town || data.address.village || ''
        };
      } else {
        throw new Error('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter endereço:', error);
      throw error;
    }
  };

  const handleChangeAnimalType = (option: number) => {
    const animalType = petTypeOptions.find(opt => opt.id === option);
    const animalTypeLabel = animalType?.label ?? petTypeOptions.find(opt => opt.id === PetType.OTHER)!.label;

    setPet(prev => ({ ...prev, type: option }))
    setAnimalTypeLabel(animalTypeLabel)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      setPet(prev => ({ ...prev, image: result.assets[0].uri }))
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
      setPet(prev => ({ ...prev, image: result.assets[0].uri }))
      setImagePickerModalVisible(false)
    }
  }

  const formatDate = (date: Date) => {
    return format(date, 'dd/MM/yyyy')
  }

  const validateFields = () => {
    const fields = [
      { value: pet.type >= 0, setter: setAnimalTypeError },
      { value: pet.name, setter: setNameError },
      { value: pet.description, setter: setDescriptionError },
      { value: pet.foundDate, setter: setFoundDateError },
      { value: pet.foundLocal, setter: setFoundLocalError },
      { value: pet.currentLocal, setter: setCurrentLocalError },
      { value: pet.gender, setter: setGenderError },
      { value: pet.image, setter: setImageError }
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
      Toast.show({
        type: 'error',
        text1: 'Campos incompletos 🙀',
        text2: 'Há campos obrigatórios que não foram preenchidos',
      })
    }

    return valid;
  };

  const handleRegister = async () => {
    if (validateFields() && user?.id) {
      pet.idUser = user.id

      let data;

      if (isEditing && petToEdit && petToEdit.id) {
        data = await PetService.update(petToEdit.id, pet);
      } else {
        data = await PetService.create(pet);
      }

      if (data) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso 😸',
          text2: isEditing ? 'Pet atualizado com sucesso' : 'Pet cadastrado com sucesso',
        });

        if (!isEditing) {
          resetForm()
        }
        navigation.navigate('HomeScreen');
      }
    }
  }

  const handleDelete = async () => {
    if (isEditing && petToEdit && petToEdit.id) {
      const result = await PetService.delete(petToEdit.id);
      if (result) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso 😸',
          text2: 'Pet excluído com sucesso',
        })
        navigation.navigate('HomeScreen')
      }
    }
  }

  const resetForm = () => {
    setPet({
      name: '',
      description: '',
      foundLocal: '',
      foundDate: null,
      currentLocal: '',
      contact: '',
      gender: '',
      type: 0,
      image: null,
      idUser: 0
    })

    setAnimalTypeLabel('Selecionar tipo de animal')
    setCurrentAddress({ street: '', neighborhood: '', number: '', postalCode: '', city: '' })
    setFoundAddress({ street: '', neighborhood: '', number: '', postalCode: '', city: '' })
    setGenderLabel('')

    setAnimalTypeError(false)
    setNameError(false)
    setDescriptionError(false)
    setFoundLocalError(false)
    setFoundDateError(false)
    setCurrentLocalError(false)
    setGenderError(false)
    setImageError(false)
  }

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
          {pet.image ?
            <Image source={{ uri: pet.image }} style={styles.image} />
            :
            <Ionicons name="image-outline" size={50} color={COLORS.dark} />
          }
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

        <Modal animationType="slide" transparent={true} visible={animalModalVisible} onRequestClose={() => setAnimalModalVisible(!animalModalVisible)}>
          <View style={styles.modalView}>
            {petTypeOptions.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={styles.modalButton}
                onPress={() => {
                  handleChangeAnimalType(type.id)
                  setAnimalModalVisible(false)
                }}
              >
                <Text style={styles.modalButtonText}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <View style={[styles.inputContainer, nameError && styles.errorInput]}>
          <Ionicons name="text" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            value={pet.name}
            onChangeText={(text) => setPet({ ...pet, name: text })}
          />
        </View>

        <View style={[styles.inputContainer, descriptionError && styles.errorInput]}>
          <Ionicons name="clipboard" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Descrição"
            value={pet.description}
            onChangeText={(text) => setPet(prev => ({ ...prev, description: text }))}
            multiline
          />
        </View>

        <TouchableOpacity style={[styles.inputContainer, foundDateError && styles.errorInput]} onPress={openDatePicker}>
          <Ionicons name="calendar" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>{pet.foundDate ? formatDate(pet.foundDate) : 'Data encontrada'}</Text>
        </TouchableOpacity>
        {showDatePicker &&
          <DateTimePicker
            value={foundDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        }

        <TouchableOpacity
          style={[styles.inputContainer, currentLocalError && styles.errorInput, { height: 55 }]}
          onPress={() => setCurrentLocalModalVisible(true)}>
          <Ionicons name="location" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>
            {currentAddress.street || currentAddress.neighborhood || currentAddress.city ?
              `${currentAddress.street ? currentAddress.street + ', ' : ''}${currentAddress.neighborhood ? currentAddress.neighborhood + ', ' : ''}${currentAddress.city ? currentAddress.city : ''}` :
              'Endereço Atual do Pet'}
          </Text>
        </TouchableOpacity>


        <AddressModal
          visible={currentLocalModalVisible}
          onClose={() => setCurrentLocalModalVisible(false)}
          onSave={handleSaveCurrentLocation}
          title="Endereço atual"
          initialAddress={isEditing ? currentAddress : null}
        />

        <TouchableOpacity
          style={[styles.inputContainer, foundLocalError && styles.errorInput, { height: 55 }]}
          onPress={() => setFoundLocalModalVisible(true)}>
          <Ionicons name="location" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <Text style={styles.textInput}>
            {foundAddress.street || foundAddress.neighborhood || foundAddress.city ?
              `${foundAddress.street ? foundAddress.street + ', ' : ''}${foundAddress.neighborhood ? foundAddress.neighborhood + ', ' : ''}${foundAddress.city ? foundAddress.city : ''}` :
              'Endereço Encontrado'}
          </Text>
        </TouchableOpacity>

        <AddressModal
          visible={foundLocalModalVisible}
          onClose={() => setFoundLocalModalVisible(false)}
          onSave={handleSaveFoundLocation}
          title="Endereço encontrado"
          initialAddress={isEditing ? foundAddress : null}
        />

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
            value={pet.contact}
            onChangeText={(text) => setPet(prev => ({ ...prev, contact: text }))}
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
                  setPet(prev => ({ ...prev, gender: gender.char }))
                  setGenderLabel(gender.label)
                  setGenderModalVisible(false)
                }}
              >
                <Text style={styles.modalButtonText}>{gender.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <View style={[styles.buttonsRow, !isEditing && { justifyContent: 'center' }]}>
          <TouchableOpacity
            style={[styles.buttonContainer, !isEditing ? { flex: 1 } : { flex: 0.50 }]}
            onPress={handleRegister}
          >
            <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
              <Text style={styles.buttonText}>{isEditing ? 'Editar' : 'Cadastrar'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity style={[styles.buttonContainer, { flex: 0.50, marginLeft: 10 }]} onPress={handleDelete}>
              <LinearGradient colors={['#C30010', '#FF0000']} style={styles.button}>
                <Text style={styles.buttonText}>Excluir</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

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
    color: COLORS.dark,
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
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    width: '85%',
  },
  buttonContainer: {
    borderRadius: 20,
    elevation: 10,
  },
  button: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%' 
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
});


export default RegisterPetScreen
