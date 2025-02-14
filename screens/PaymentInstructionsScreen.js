// PaymentInstructionsScreen.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme, colors } from './theme';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

const PaymentInstructionsScreen = () => {
    const navigation = useNavigation();

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <AntDesign name="left" size={24} color={colors.secondary.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bank Transfer</Text>
            </View>
            <View style={styles.content}>
            <Text style={styles.title}>Bank Transfer Instructions</Text>
            <Text style={styles.instructions}>
                Please use the following details to make the payment:
            </Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Bank Name: </Text>ABC Bank
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Account Holder: </Text>John Doe
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Account Number: </Text>123456789
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Amount: </Text>$9.99
                </Text>
                <Text style={styles.detail}>
                    <Text style={styles.label}>Reference: </Text>YourName-Payment
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
                <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.light,
        // alignItems: 'center',
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
        width:'100%',
        padding:20
    },
    title: {
        fontSize: theme.typography.sizes.large,
        fontFamily: theme.typography.fontFamily.bold,
        color: colors.primary.primary1,
        marginBottom: theme.spacing.md,
    },
    instructions: {
        fontSize: theme.typography.sizes.medium,
        color: '#666',
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    detailsContainer: {
        backgroundColor: colors.secondary.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.lg,
        width: '100%',
        marginBottom: theme.spacing.lg,
        elevation: 2,
    },
    detail: {
        fontSize: theme.typography.sizes.medium,
        marginBottom: theme.spacing.sm,
    },
    label: {
        fontFamily: theme.typography.fontFamily.bold,
        color: colors.primary.primary1,
    },
    button: {
        backgroundColor: colors.primary.primary1,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.round,
        alignItems: 'center',
        width: '90%',
        marginTop:'10%'
    },
    buttonText: {
        color: colors.secondary.white,
        fontSize: theme.typography.sizes.medium,
        fontFamily: theme.typography.fontFamily.bold,
    },
});

export default PaymentInstructionsScreen;
