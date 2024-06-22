import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { User } from '../models'
import { UserService } from '../services'
import { TextInputMask } from 'react-native-masked-text'
import COLORS from '../const/colors'

const SignupScreen = () => {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const user: User = {
      name,
      email,
      phone,
      password
    }

    const data = await UserService.create(user)

    if (data) handleReturnLogin()
  }

  const handleReturnLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require('../assets/topVector.png')} style={styles.topImage} />
      </View>

      <View>
        <Text style={styles.createAccountText}>Crie sua conta</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Nome" value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>

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
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
        <LinearGradient colors={['#13EE85', '#0088A6']} style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReturnLogin}>
        <View>
          <Text style={styles.semContaText}>
            Já possui uma conta? <Text style={styles.registerText}>Entre</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require('../assets/leftVector.png')} style={styles.leftVectorImage} />
      </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    position: 'relative'
  },
  topImageContainer: {},
  topImage: {
    width: '100%',
    height: 130
  },
  titleText: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: '500',
    color: COLORS.titlePrimary
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.titlePrimary,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: 'center',
    height: 50
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10
  },
  textInput: {
    flex: 1
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 40,
    borderRadius: 20,
    elevation: 10
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
  semContaText: {
    color: COLORS.titlePrimary,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 70
  },
  registerText: {
    textDecorationLine: 'underline'
  },
  leftVectorContainer: {
    bottom: 0,
    left: 0
  },
  leftVectorImage: {
    height: 250,
    width: 100
  }
})
