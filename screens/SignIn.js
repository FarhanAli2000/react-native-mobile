

// import React, { useState } from 'react';
// import { theme, colors } from './theme';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Image,
//   Alert, 
//   SafeAreaView 
// } from 'react-native';
// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from '../firebase';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     // Temporary direct navigation
//     navigation.replace('Home');

//     /* Commented out authentication logic for later use
//     // Input validation
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Firebase authentication
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
//       // Navigate to home screen upon successful login
//       navigation.replace('Home');
//     } catch (error) {
//       // Error handling
//       let errorMessage = 'Login failed';
      
//       switch (error.code) {
//         case 'auth/invalid-email':
//           errorMessage = 'Invalid email address';
//           break;
//         case 'auth/user-not-found':
//           errorMessage = 'No user found with this email';
//           break;
//         case 'auth/wrong-password':
//           errorMessage = 'Incorrect password';
//           break;
//       }
      
//       Alert.alert('Login Error', errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//     */
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.inner}>
//         <View style={styles.logoContainer}>
//           <Image 
//             source={require('../assets/logo.png')} 
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </View>
        
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
        
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
        
//         <TouchableOpacity 
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={isLoading}
//         >
//           <Text style={styles.loginButtonText}>
//             {isLoading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           onPress={() => navigation.navigate('ForgotPassword')}
//         >
//           <Text style={styles.forgotPasswordText}>
//             Forgot Password?
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           onPress={() => navigation.navigate('SignUp')}
//         >
//           <Text style={styles.signupText}>
//             Don't have an account? Sign Up
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5'
//   },
//   inner: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center'
//   },
//   input: {
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     backgroundColor: 'white'
//   },
//   loginButton: {
//     backgroundColor: theme.components.button.primary.backgroundColor,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   loginButtonText: {
//     color: theme.components.button.primary.color,
//     fontWeight: 'bold'
//   },
//   forgotPasswordText: {
//     marginTop: 10,
//     textAlign: 'center',
//     color: theme.components.button.primary.backgroundColor,
//   },
//   signupText: {
//     marginTop: 15,
//     textAlign: 'center',
//     color: theme.components.button.primary.backgroundColor,
//   },
//   logoContainer: {
//     flex: 0.6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%'
//   },
//   logo: {
//     width: '80%',
//     maxHeight: 250,
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { theme } from './theme';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 100); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.components.button.primary.color} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('ForgotPassword')}
          disabled={isLoading}
        >
          <Text style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('SignUp')}
          disabled={isLoading}
        >
          <Text style={styles.signupText}>
            Don't have an account? Sign Up
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
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
  loginButton: {
    backgroundColor: theme.components.button.primary.backgroundColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  loginButtonDisabled: {
    opacity: 0.7
  },
  loginButtonText: {
    color: theme.components.button.primary.color,
    fontWeight: 'bold'
  },
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'center',
    color: theme.components.button.primary.backgroundColor,
  },
  signupText: {
    marginTop: 15,
    textAlign: 'center',
    color: theme.components.button.primary.backgroundColor,
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  logo: {
    width: '80%',
    maxHeight: 250,
  },
});

export default LoginScreen;