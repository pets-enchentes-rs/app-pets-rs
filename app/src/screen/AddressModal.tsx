import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../const/colors';
import Toast from 'react-native-toast-message';

const AddressModal = ({ visible, onClose, onSave, title }) => {
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [number, setNumber] = useState('');

  const handleSave = async () => {
    if (!street || !neighborhood || !postalCode || !number) {
      Toast.show({
        type: 'error',
        text1: 'Campos obrigatórios',
        text2: 'Por favor, preencha todos os campos.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    const fullAddress = `${street}, ${number} - ${neighborhood}, ${postalCode}`;

    try {
      const coordinates = await getCoordinates(fullAddress);
      if (coordinates) {
        onSave({ street, neighborhood, postalCode, number, ...coordinates });
        onClose();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Endereço inválido 🙀',
          text2: 'Não foi possível encontrar coordenadas para o endereço fornecido.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro 🙀',
        text2: 'Ocorreu um erro ao tentar validar o endereço.',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const getCoordinates = async (address) => {
    try {
      const formattedAddress = encodeURIComponent(address);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${formattedAddress}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        throw new Error('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      throw error;
    }
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={[styles.inputContainer]}>
            <TextInput style={[styles.textInput]} placeholder="Rua" value={street} onChangeText={setStreet} />
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput style={[styles.textInput]} placeholder="Bairro" value={neighborhood} onChangeText={setNeighborhood} />
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput style={[styles.textInput]} placeholder="Número" value={number} onChangeText={setNumber} />
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput style={[styles.textInput]} placeholder="CEP" value={postalCode} onChangeText={setPostalCode} />
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={handleSave}>
            <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    borderRadius: 20,
    elevation: 10,
    width: '100%',
    marginTop: 20,
  },
  button: {
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
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
  textInput: {
    color: COLORS.lightGrey,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});

export default AddressModal;
