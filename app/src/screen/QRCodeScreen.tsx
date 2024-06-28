import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import COLORS from '../const/colors';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

const QRCodeScreen = ({ route, navigation }) => {
    const { amount, selectedOptions = [] } = route.params;
    const pixKey = '92.958.800/0001-38';
    const beneficiaryName = 'Pets';
    const cityName = 'Porto Alegre';
    const formattedAmount = amount.replace('R$', '').replace('.', '').replace(',', '');
    const qrCodeValue = `00020101021226860014BR.GOV.BCB.PIX0136${pixKey}5204000053039865802BR5913${beneficiaryName}6009${cityName}62070503${formattedAmount}6304`;

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(pixKey);
        Toast.show({
            type: 'success',
            text1: 'Sucesso 😸',
            text2: 'Chave pix copiada',
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.light} />
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>QR Code para PIX</Text>
            </View>

            <View style={styles.qrCodeContainer}>
                <QRCode value={qrCodeValue} size={200} />
            </View>

            <Text style={styles.infoText}>Use o QR code acima ou a chave PIX abaixo para realizar a doação.</Text>

            <View style={styles.pixKeyBox}>
                <Text style={styles.pixKeyText}>Chave PIX: {pixKey}</Text>
                <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                    <Ionicons name="copy" size={24} color={COLORS.dark} />
                </TouchableOpacity>
            </View>

            <View style={styles.selectedOptionsContainer}>
                <Text style={styles.selectedOptionsTitle}>Sua doação será destinada a compra de:</Text>
                {selectedOptions.map((option: string, index: number) => (
                    <Text key={index} style={styles.selectedOptionText}>{option}</Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.light,
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginBottom: 30,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    qrCodeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoText: {
        padding: 10,
        fontSize: 16,
        color: COLORS.dark,
        textAlign: 'center',
        marginBottom: 10,
    },
    pixKeyBox: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pixKeyText: {
        fontSize: 16,
        color: COLORS.dark,
        fontWeight: 'bold',
    },
    copyButton: {
        marginLeft: 10,
    },
    selectedOptionsContainer: {
        marginTop: 30,
        width: '90%',
    },
    selectedOptionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedOptionText: {
        fontSize: 16,
        color: COLORS.dark,
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 30,
        borderRadius: 20,
        elevation: 10,
        width: '90%',
    },
    button: {
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QRCodeScreen;
