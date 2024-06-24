import React from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../const/colors'

type FilterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  gender: string;
  setGender: (gender: string) => void;
  showRadioOptions: string;
  setShowRadioOptions: (option: string) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, gender, setGender, showRadioOptions, setShowRadioOptions }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.dark} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Gênero</Text>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('Macho')}
          >
            <View style={styles.radioButton}>
              {gender === 'Macho' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Macho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('Fêmea')}
          >
            <View style={styles.radioButton}>
              {gender === 'Fêmea' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Fêmea</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('Não definido')}
          >
            <View style={styles.radioButton}>
              {gender === 'Não definido' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Não definido</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Exibir</Text>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setShowRadioOptions('Todos')}
          >
            <View style={styles.radioButton}>
              {showRadioOptions === 'Todos' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setShowRadioOptions('Cadastrados por mim')}
          >
            <View style={styles.radioButton}>
              {showRadioOptions === 'Cadastrados por mim' && <View style={styles.radioButtonSelected} />}
            </View>
            <Text style={styles.radioText}>Cadastrados por mim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%'
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  radioButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary
  },
  radioText: {
    fontSize: 16,
    color: COLORS.dark
  },
  textInput: {
    color: COLORS.lightGrey,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
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
  }
})

export default FilterModal
