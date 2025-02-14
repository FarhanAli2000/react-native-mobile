import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme} from './theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      
      navigation.replace('Onboarding');
    }, 5000); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <View style={[styles.bubble, styles.bubble1]} />
        <View style={[styles.bubble, styles.bubble2]} />
        <View style={[styles.bubble, styles.bubble3]} />
        <View style={[styles.bubble, styles.bubble4]} />
      </View>
      <Image
        source={require('../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.primary1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 9999, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bubble1: {
    width: 250,
    height: 250,
    top: -40,
    left: -40,
  },
  bubble2: {
    width: 230,
    height: 230,
    top: -60,
    right: -20,
  },
  bubble3: {
    width: 180,
    height: 180,
    bottom: -110,
    right: 90,
  },
  bubble4: {
    width: 180,
    height: 180,
    bottom: -45,
    right: -70,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.2,
  },
});

export default SplashScreen;