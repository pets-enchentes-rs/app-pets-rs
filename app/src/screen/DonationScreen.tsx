import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../const/colors';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

const DonationScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [cpf, setCpf] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setAmount('');
        setCpf('');
        setSelectedOptions([]);
      };
    }, [])
  );

  const handleDonation = () => {
    navigation.navigate('QRCodeScreen', { amount, selectedOptions });
  };

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.light} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doações</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          O aplicativo destinará as doações para ajudar os animais registrados na plataforma, bem como para apoiar ONGs que estejam necessitando de auxílio.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Valor da contribuição</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="cash" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: '',
            }}
            style={styles.textInput}
            placeholder="R$ 0,00"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Text style={styles.sectionTitle}>CPF</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInputMask
            type={'cpf'}
            style={styles.textInput}
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        <Text style={styles.sectionTitle}>Destinação da doação</Text>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleOption('Ração')}>
          <View style={styles.checkbox}>
            {selectedOptions.includes('Ração') && <View style={styles.checkboxSelected} />}
          </View>
          <Text style={styles.checkboxText}>Ração</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleOption('Caminhas')}>
          <View style={styles.checkbox}>
            {selectedOptions.includes('Caminhas') && <View style={styles.checkboxSelected} />}
          </View>
          <Text style={styles.checkboxText}>Caminhas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleOption('Casinha')}>
          <View style={styles.checkbox}>
            {selectedOptions.includes('Casinha') && <View style={styles.checkboxSelected} />}
          </View>
          <Text style={styles.checkboxText}>Casinha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleOption('Medicamentos')}>
          <View style={styles.checkbox}>
            {selectedOptions.includes('Medicamentos') && <View style={styles.checkboxSelected} />}
          </View>
          <Text style={styles.checkboxText}>Medicamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => toggleOption('Veterinário')}>
          <View style={styles.checkbox}>
            {selectedOptions.includes('Veterinário') && <View style={styles.checkboxSelected} />}
          </View>
          <Text style={styles.checkboxText}>Veterinário</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleDonation}>
        <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
          <Text style={styles.buttonText}>Doar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 30,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
  },
  infoText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'justify',
  },
  form: {
    width: '90%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 10,
    marginVertical: 5,
    alignItems: 'center',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 15
  },
  inputIcon: {
    marginRight: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    fontSize: 16,
    color: COLORS.dark,
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 20,
    elevation: 10,
    width: '90%',
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
});

export default DonationScreen;
