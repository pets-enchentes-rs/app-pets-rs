import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { UserProvider } from './src/contexts/UserContext'

import LoginScreen from './src/screen/LoginScreen'
import SignupScreen from './src/screen/SignupScreen'
import DetailsPetScreen from './src/screen/DetailsPetScreen'
import DrawerNavigator from './src/navigators/DrawerNavigator'
import ProfileScreen from './src/screen/ProfileScreen'
import RegisterPetScreen from './src/screen/RegisterPetScreen'
import SettingsScreen from './src/screen/SettingsScreen'
import SecurityScreen from './src/screen/SecurityScreen'
import MapScreen from './src/screen/MapScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignupScreen} />
          <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
          <Stack.Screen name="DetailsPetScreen" component={DetailsPetScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RegisterPetScreen" component={RegisterPetScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

export default App
