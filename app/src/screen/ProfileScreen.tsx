import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import COLORS from '../const/colors'
import { StatusBar } from 'expo-status-bar'

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Ana Luísa')
  const [email, setEmail] = useState('analuisa@gmail.com')
  const [contact, setContact] = useState('+67234567890')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access camera is required!')
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri)
    }
    setModalVisible(false)
  }

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access gallery is required!')
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri)
    }
    setModalVisible(false)
  }

  const removeImage = () => {
    setProfileImage(null)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.imageContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../assets/default-user.png')}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={pickImageFromCamera}>
              <Text style={styles.modalButtonText}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={pickImageFromGallery}>
              <Text style={styles.modalButtonText}>Galeria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={removeImage}>
              <Text style={styles.modalButtonText}>Remover Foto</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Contato"
            value={contact}
            onChangeText={setContact}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Senha atual"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Nova senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#9A9A9A" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirmar nova senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
            <Text style={styles.buttonText}>Atualizar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 3
  },
  textInput: {
    flex: 1
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center'
  },
  modalButtonText: {
    fontSize: 18
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default ProfileScreen
