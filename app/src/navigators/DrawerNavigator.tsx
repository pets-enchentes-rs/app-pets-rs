import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps
} from '@react-navigation/drawer'
import HomeScreen from '../screen/HomeScreen'
import COLORS from '../const/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProfileScreen from '../screen/ProfileScreen'
import { StatusBar } from 'expo-status-bar'

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} style={{ paddingVertical: 30 }}>
      <StatusBar translucent backgroundColor="transparent" style="light" />
      <View style={styles.drawerContent}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/user.jpg')} style={styles.profileImage} />
          <Text style={styles.profileName}>ANA LUÍSA</Text>
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
        drawerItemStyle: { backgroundColor: null },
        drawerLabelStyle: {
          fontWeight: 'bold',
          flexShrink: 1
        },
        drawerIconContainerStyle: {
          marginRight: -5
        }
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
        name="Perfil"
        options={{
          title: 'PERFIL',
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={25} color={color} />
          )
        }}
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="Cadastrar"
        options={{
          title: 'CADASTRAR',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="plus" size={25} color={color} />
        }}
        component={HomeScreen}
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
    height: 60,
    width: 60,
    borderRadius: 30
  },
  profileName: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 10
  }
})
