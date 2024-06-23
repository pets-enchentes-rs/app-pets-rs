import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../const/colors'
import { TextInputMask } from 'react-native-masked-text'
import { StatusBar } from 'expo-status-bar'
import { useUser } from '../contexts/UserContext'
import { User } from '../models'
import { UserService } from '../services'
import { AxiosResponse } from 'axios'

const ProfileScreen = ({ navigation }) => {
  const { user, setUser } = useUser()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileImage(user.image)
      setName(user.name)
      setEmail(user.email)
      setContact(user.phone)
    }
  }, [])

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

  const handleEditUser = async () => {
    if (user && user.id) {
      const payload: User = {
        name,
        email,
        image: profileImage,
        phone: contact
      }

      const data = await UserService.update(user.id, payload)

      if (data) {
        setUser(data as User)
      }
    }
  }

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.light} />
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Editar perfil</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.imageContainer}>
                <Image source={user.image ? { uri: user.image } : require('../assets/default-user.png')} style={styles.profileImage} />
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
              <TextInput style={styles.textInput} placeholder="Nome" value={name} onChangeText={setName} />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={24} color="#9A9A9A" style={styles.inputIcon} />
              <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call" size={24} color="#9A9A9A" style={styles.inputIcon} />
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
              />
            </View>

            {/* <View style={styles.inputContainer}>
            <Ionicons
              name="calendar"
              size={24}
              color="#9A9A9A"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Data de Nascimento"
              value="23/05/1995"
              editable={false}
            />
          </View> */}

            <TouchableOpacity style={styles.buttonContainer} onPress={handleEditUser}>
              <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
                <Text style={styles.buttonText}>Atualizar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ''
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    paddingTop: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  content: {
    alignItems: 'center'
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60
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
