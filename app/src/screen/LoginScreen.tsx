import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../const/colors'
import { UserService } from '../services'
import { useUser } from '../contexts/UserContext'

const LoginScreen = () => {
  const { user, setUser } = useUser()

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    navigation.navigate('SignUpScreen')
  }

  const handleEnter = async () => {
    const user = await UserService.login(email, password)

    if (user) {
      setUser(user.data)
      navigation.navigate('HomeScreen')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require('../assets/topVector.png')} style={styles.topImage} />
      </View>

      <View>
        <Text style={styles.titleText}>Olá</Text>
      </View>

      <View>
        <Text style={styles.signInText}>Entre na sua conta</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      </View>

      <View>
        <Text style={styles.esqueceuSenha}>Esqueceu sua senha?</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleEnter}>
        <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <View>
          <Text style={styles.semContaText}>
            Não possui uma conta? <Text style={styles.registerText}>Registre-se</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.leftVectorContainer}>
        <ImageBackground source={require('../assets/leftVector.png')} style={styles.leftVectorImage} />
      </View>
    </View>
  )
}

export default LoginScreen

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
  signInText: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.titlePrimary,
    marginBottom: 30
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
  esqueceuSenha: {
    color: COLORS.titleSecondary,
    textAlign: 'right',
    width: '85%',
    fontSize: 15,
    marginRight: 40
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
    marginTop: 120
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
