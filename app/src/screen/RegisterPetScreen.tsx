import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import COLORS from '../const/colors';
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

type Props = {
  navigation: NavigationProp<any>;
};

const RegisterPetScreen: React.FC<Props> = ({ navigation }) => {
  const [animalType, setAnimalType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [foundDate, setFoundDate] = useState<Date | null>(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [animalModalVisible, setAnimalModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || foundDate;
    setShowDatePicker(false);
    setFoundDate(currentDate);
  };

  const getLocation = async (setLocation) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar localização é necessária!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setLocation(`${address[0].street}, ${address[0].city}`);
  };

  const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setAnimalModalVisible(true)}
        >
          <Ionicons name="paw" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <Text style={styles.textInput}>{animalType || 'Selecionar Tipo de Animal'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={animalModalVisible}
          onRequestClose={() => setAnimalModalVisible(!animalModalVisible)}
        >
          <View style={styles.modalView}>
            {['Cachorro', 'Gato', 'Coelho', 'Ave', 'Outros'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.modalButton}
                onPress={() => {
                  setAnimalType(type);
                  setAnimalModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <View style={styles.inputContainer}>
          <Ionicons name="text" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="clipboard" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.inputContainer} onPress={openDatePicker}>
          <Ionicons name="calendar" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <Text style={styles.textInput}>
            {foundDate ? formatDate(foundDate) : 'Data encontrada'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={foundDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => getLocation(setCurrentLocation)}
        >
          <Ionicons name="location-sharp" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <Text style={styles.textInput}>{currentLocation || 'Local Atual'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => getLocation(setFoundLocation)}
        >
          <Ionicons name="location" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <Text style={styles.textInput}>{foundLocation || 'Local Encontrado'}</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Contato"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setGenderModalVisible(true)}
        >
          <Ionicons name="male-female" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <Text style={styles.textInput}>{gender || 'Selecionar Gênero'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={genderModalVisible}
          onRequestClose={() => setGenderModalVisible(!genderModalVisible)}
        >
          <View style={styles.modalView}>
            {['Macho', 'Fêmea'].map((genderOption) => (
              <TouchableOpacity
                key={genderOption}
                style={styles.modalButton}
                onPress={() => {
                  setGender(genderOption);
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>{genderOption}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    marginTop: 40
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
    width: '85%',
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalButton: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 40,
    borderRadius: 20,
    elevation: 10,
    width: '85%',
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
  }
});

export default RegisterPetScreen;
