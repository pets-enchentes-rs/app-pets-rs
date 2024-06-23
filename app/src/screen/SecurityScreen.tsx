import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../const/colors'
import { StatusBar } from 'expo-status-bar'
import { useUser } from '../contexts/UserContext'
import { UserService } from '../services';
import { User } from '../models';

const SecurityScreen = ({ navigation }) => {
  const {user, setUser} = useUser()

  const [password, setPassword] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  
  const handleChangePassword = async () => {
    if (user && user.id) {
      const payload = {
        password,
        newPass,
        confirmPass
      }

      const data = await UserService.changePassword(user.id, payload)

      if (data) {
        setUser(data as User)

        navigation.navigate('HomeScreen')
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.light} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Segurança</Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Alterar senha</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Senha atual" value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Nova senha" value={newPass} onChangeText={setNewPass} secureTextEntry />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color={COLORS.lightGrey} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder="Confirmar nova senha" value={confirmPass} onChangeText={setConfirmPass} secureTextEntry />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleChangePassword}>
        <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.button}>
          <Text style={styles.buttonText}>Alterar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.light,
    flex: 1,
    paddingTop: 60,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 30,
    width: '100%'
  },
  backButton: {
    position: 'absolute',
    left: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10
  },
  textInput: {
    flex: 1
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 20,
    elevation: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 50,
    width: '90%',
    paddingHorizontal: 15
  },
  inputIcon: {
    marginRight: 10
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 20,
    elevation: 10,
    width: '90%'
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
})

export default SecurityScreen
