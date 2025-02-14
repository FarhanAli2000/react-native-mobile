import React, { useState } from 'react';
import { theme, colors } from './theme';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView 
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    // Input validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      
      Alert.alert(
        'Password Reset', 
        'A password reset link has been sent to your email. Please check your inbox.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      let errorMessage = 'Password reset failed';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many reset attempts. Please try again later.';
          break;
      }
      
      Alert.alert('Reset Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Forgot Password</Text>
        
        <Text style={styles.subtitle}>
          Enter your email to reset your password
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={handlePasswordReset}
          disabled={isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backToLoginText}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  resetButton: {
    backgroundColor: theme.components.button.primary.backgroundColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  backToLoginText: {
    marginTop: 15,
    textAlign: 'center',
    color: theme.components.button.primary.backgroundColor,
  }
});

export default ForgotPasswordScreen;