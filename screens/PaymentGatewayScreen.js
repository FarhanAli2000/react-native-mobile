import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Alert
} from 'react-native';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme, colors } from './theme';

const PaymentGatewayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDescription, setTransferDescription] = useState('');

  // Payment methods data
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'card-outline',
      supported: ['Visa', 'Mastercard', 'American Express']
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: 'business-outline',
    }
  ];

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return text;
    }
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = () => {
    if (selectedMethod === 'card') {
      navigation.navigate('OTPVerificationScreen');
    } else if (selectedMethod === 'bank') {
      navigation.navigate('PaymentInstructionsScreen');
    }
  };
  

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedMethod === method.id && styles.selectedPaymentMethod
      ]}
      onPress={() => setSelectedMethod(method.id)}
    >
      <Ionicons
        name={method.icon}
        size={24}
        color={selectedMethod === method.id ? colors.primary.primary1 : '#666'}
      />
      <View style={styles.paymentMethodTextContainer}>
        <Text style={styles.paymentMethodText}>{method.name}</Text>
        {method.supported && (
          <View style={styles.supportedCards}>
            {method.supported.map((card, index) => (
              <Text key={index} style={styles.supportedCardText}>{card}</Text>
            ))}
          </View>
        )}
      </View>
      <MaterialIcons
        name={selectedMethod === method.id ? "radio-button-checked" : "radio-button-unchecked"}
        size={24}
        color={selectedMethod === method.id ? colors.primary.primary1 : '#666'}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.content}>
        <View style={styles.planSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan</Text>
            <Text style={styles.summaryValue}>Premium Plan</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>30 Days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryAmount}>$9.99</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>

        {paymentMethods.map(renderPaymentMethod)}

        {selectedMethod === 'card' && (
          <View style={styles.cardForm}>
            <Text style={styles.formLabel}>Card Details</Text>

            <View style={styles.inputContainer}>
              <MaterialIcons name="credit-card" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                maxLength={19}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                <MaterialIcons name="date-range" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  maxLength={5}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  maxLength={4}
                  keyboardType="numeric"
                  secureTextEntry
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        )}

        {selectedMethod === 'bank' && (
          <View style={styles.cardForm}>
            <Text style={styles.formLabel}>Bank Transfer Details</Text>

            <View style={styles.inputContainer}>
              <MaterialIcons name="account-balance" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Bank Name"
                value={bankName}
                onChangeText={setBankName}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Account Holder Name"
                value={accountHolderName}
                onChangeText={setAccountHolderName}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="account-circle" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Account Number"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="attach-money" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Amount to Transfer"
                value={transferAmount}
                onChangeText={setTransferAmount}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="message" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Description/Reference"
                value={transferDescription}
                onChangeText={setTransferDescription}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        )}

        <View style={styles.secureNotice}>
          <MaterialIcons name="lock" size={20} color={colors.primary.primary2} />
          <Text style={styles.secureText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  planSummary: {
    backgroundColor: colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    color: '#666',
  },
  summaryValue: {
    fontFamily: theme.typography.fontFamily.bold,
  },
  summaryAmount: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: colors.primary.primary1,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  selectedPaymentMethod: {
    borderColor: colors.primary.primary1,
    borderWidth: 2,
  },
  paymentMethodTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  paymentMethodText: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
  supportedCards: {
    flexDirection: 'row',
    marginTop: 4,
  },
  supportedCardText: {
    color: '#666',
    fontSize: theme.typography.sizes.small,
    marginRight: theme.spacing.sm,
  },
  cardForm: {
    backgroundColor: colors.secondary.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  formLabel: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
  },
  row: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.xl,
  },
  secureText: {
    marginLeft: theme.spacing.sm,
    color: colors.primary.primary2,
    fontSize: theme.typography.sizes.small,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: colors.secondary.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  payButton: {
    backgroundColor: colors.primary.primary1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
  },
  payButtonText: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default PaymentGatewayScreen;