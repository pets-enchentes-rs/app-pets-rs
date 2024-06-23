import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../const/colors'
import { StatusBar } from 'expo-status-bar'
import { NavigationProp } from '@react-navigation/native'
import { useUser } from '../contexts/UserContext'
import { UserService } from '../services'
import Toast from 'react-native-toast-message'

type Props = {
  navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, setUser } = useUser()

  const showDeleteConfirmation = () => {
    Alert.alert('Deseja excluir sua conta?', 'Essa funcionalidade é irreversível!', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Excluir', onPress: handleDeleteAccount},
    ]);
  }

  const handleDeleteAccount = async () => {
    if (user && user.id) {
      const data = await UserService.delete(user.id)

      if (data) {
        handleLogout()
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.light} />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configurações</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name="person-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('SecurityScreen')}>
          <Ionicons name="shield-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Segurança</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="lock-closed-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Privacidade</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suporte e Sobre</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Ajuda & Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="document-text-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Termos e Políticas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="alert-circle-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Reportar um Problema</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={showDeleteConfirmation}>
          <Ionicons name="trash-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Deletar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.dark} />
          <Text style={styles.itemText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.light
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  backButton: {
    position: 'absolute',
    left: 0
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16
  }
})

export default SettingsScreen
