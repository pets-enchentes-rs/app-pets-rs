import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../const/colors';

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  gender: string;
  setGender: (gender: string) => void;
  showRadioOptions: string;
  setShowRadioOptions: (option: string) => void;
  applyFilters: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  gender,
  setGender,
  showRadioOptions,
  setShowRadioOptions,
  applyFilters, 
}) => {
  const handleApply = () => {
    applyFilters();
    onClose();
  };

  const toggleGender = (selectedGender: string) => {
    setGender(gender === selectedGender ? '' : selectedGender);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Gênero</Text>
          <TouchableOpacity style={styles.radioContainer} onPress={() => toggleGender('Macho')}>
            <View style={styles.radioButton}>
              {gender === 'Macho' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Macho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioContainer} onPress={() => toggleGender('Fêmea')}>
            <View style={styles.radioButton}>
              {gender === 'Fêmea' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Fêmea</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioContainer} onPress={() => toggleGender('Não definido')}>
            <View style={styles.radioButton}>
              {gender === 'Não definido' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Não definido</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Exibir</Text>
          <TouchableOpacity style={styles.radioContainer} onPress={() => setShowRadioOptions('Todos')}>
            <View style={styles.radioButton}>
              {showRadioOptions === 'Todos' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioContainer} onPress={() => setShowRadioOptions('Cadastrados por mim')}>
            <View style={styles.radioButton}>
              {showRadioOptions === 'Cadastrados por mim' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Cadastrados por mim</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer} onPress={handleApply}>
            <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
              <Text style={styles.buttonText}>Aplicar</Text>
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  radioText: {
    fontSize: 16,
    color: COLORS.dark,
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
});

export default FilterModal;
