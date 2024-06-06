import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import HomeScreen from '../screen/HomeScreen';
import COLORS from '../const/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props} style={{ paddingVertical: 30 }}>
            <View style={{ marginLeft: 10, marginVertical: 30 }}>
                <Image source={require("../assets/user.jpg")} style={{ height: 60, width: 60, borderRadius: 20 }} />
                <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 13, marginTop: 10, marginBottom: 30 }}>ANA LUÍSA</Text>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerType: 'slide',
            drawerStyle: {
                width: 250,  // Aumentei a largura do Drawer para evitar corte
                backgroundColor: COLORS.primary
            },
            drawerActiveTintColor: COLORS.grey,
            drawerInactiveTintColor: COLORS.white,
            drawerItemStyle: { backgroundColor: null },
            drawerLabelStyle: {
                fontWeight: 'bold',
                flexShrink: 1,  // Permite que o texto encolha para se ajustar ao espaço
            },
            drawerIconContainerStyle: {
                marginRight: -5,  // Ajusta a margem entre o ícone e o texto
            },
        }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Perfil"
                options={{
                    title: 'PERFIL',
                    drawerIcon: ({ color }) =>
                        <MaterialCommunityIcons name="account" size={25} color={color} />
                }} component={HomeScreen} />
            <Drawer.Screen
                name="Home"
                options={{
                    title: 'PETS',
                    drawerIcon: ({ color }) =>
                        <MaterialCommunityIcons name="paw" size={25} color={color} />
                }} component={HomeScreen} />
            <Drawer.Screen
                name="Cadastrar"
                options={{
                    title: 'CADASTRAR',
                    drawerIcon: ({ color }) =>
                        <MaterialCommunityIcons name="plus" size={25} color={color} />
                }} component={HomeScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
