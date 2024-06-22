import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'

import { UserProvider } from './src/contexts/UserContext'

import LoginScreen from './src/screen/LoginScreen'
import SignupScreen from './src/screen/SignupScreen'
import DetailsScreen from './src/screen/DetailsScreen'
import DrawerNavigator from './src/navigators/DrawerNavigator'
import ProfileScreen from './src/screen/ProfileScreen'
import RegisterPetScreen from './src/screen/RegisterPetScreen'
import SettingsScreen from './src/screen/SettingsScreen'
import SecurityScreen from './src/screen/SecurityScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="RegisterPetScreen" component={RegisterPetScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
