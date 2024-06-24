import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer'
import HomeScreen from '../screen/HomeScreen'
import COLORS from '../const/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import RegisterPetScreen from '../screen/RegisterPetScreen'
import SettingsScreen from '../screen/SettingsScreen'
import { useUser } from '../contexts/UserContext'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useUser()

  return (
    <DrawerContentScrollView {...props} style={{ paddingVertical: 30 }}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View style={styles.drawerContent}>
        <View style={styles.profileContainer}>
          <Image source={user?.image ? { uri: user.image } : require('../assets/default-user.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>{user?.name}</Text>
        </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 250,
          backgroundColor: COLORS.primary
        },
        drawerActiveTintColor: COLORS.grey,
        drawerInactiveTintColor: COLORS.white,
        drawerLabelStyle: {
          fontWeight: 'bold',
          flexShrink: 1
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: 'PETS',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="paw" size={25} color={color} />
        }}
        component={HomeScreen}
      />

      <Drawer.Screen
        name="Register"
        options={{
          title: 'CADASTRAR',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="plus" size={25} color={color} />
        }}
        component={RegisterPetScreen}
      />

      <Drawer.Screen
        name="Settings"
        options={{
          title: 'CONFIGURAÇÕES',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="cog" size={25} color={color} />
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 50
  },
  profileName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 10
  }
})
