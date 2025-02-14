import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, colors } from './theme';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const OTPVerificationScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = () => {
        if (otp === '1234') { // Replace with actual verification logic
            Alert.alert('Success', 'OTP verified successfully!');
            navigation.navigate('Home'); // Navigate to the desired screen after OTP verification
        } else {
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <AntDesign name="left" size={24} color={colors.secondary.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Method</Text>
            </View>
            <View style={styles.content}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Enter the OTP sent to your registered mobile number</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={4}
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.light,
    },
    header: {
        backgroundColor: colors.primary.primary1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.lg,
        paddingTop: 40,
    },
    backButton: {
        marginRight: theme.spacing.lg,
    },
    headerTitle: {
        fontSize: theme.typography.sizes.large,
        color: colors.secondary.white,
        fontFamily: theme.typography.fontFamily.bold,
        paddingLeft:'15%'
    },
    content:{
        alignItems:'center',
        marginTop:'30%',
        padding:20
    },
    title: {
        fontSize: theme.typography.sizes.large,
        fontFamily: theme.typography.fontFamily.bold,
        color: colors.primary.primary1,
        marginBottom: theme.spacing.md,
    },
    subtitle: {
        fontSize: theme.typography.sizes.medium,
        color: '#666',
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    input: {
        width: '100%',
        marginTop:'20%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: theme.typography.sizes.medium,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.primary.primary1,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.round,
        width: '100%',
        alignItems: 'center',
        marginTop:'20%'
    },
    buttonText: {
        color: colors.secondary.white,
        fontSize: theme.typography.sizes.medium,
        fontFamily: theme.typography.fontFamily.bold,
    },
});

export default OTPVerificationScreen;