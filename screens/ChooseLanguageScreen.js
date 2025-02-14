import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const ChooseLanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      icon: require('../assets/us-flag.jpg'), 
    },
    {
      code: 'ar',
      name: 'العربية',
      icon: require('../assets/saudi-flag.png'), 
    }
  ];

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);

  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary.primary1}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.secondary.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Language</Text>
      </View>

      {/* Language Selection Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Please select your preferred language
        </Text>

        <View style={styles.languageContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageButton,
                selectedLanguage === language.code && styles.selectedLanguageButton
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <Image
                source={language.icon}
                style={styles.flagIcon}
                resizeMode="contain"
              />
              <Text style={styles.languageText}>{language.name}</Text>
              {selectedLanguage === language.code && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={theme.colors.primary.primary1}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedLanguage) && styles.continueButtonDisabled
          ]}
          disabled={!selectedLanguage}
          onPress={() => handleLanguageSelect(selectedLanguage)}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary.white,
  },
  header: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  headerButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    flex: 1,
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    marginHorizontal: theme.spacing.md,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: theme.typography.sizes.large,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.light,
    borderWidth: 1,
    borderColor: theme.colors.background.dark,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  selectedLanguageButton: {
    borderColor: theme.colors.primary.primary1,
    backgroundColor: theme.colors.background.light,
  },
  flagIcon: {
    width: 40,
    height: 30,
    marginRight: theme.spacing.md,
  },
  languageText: {
    flex: 1,
    fontSize: theme.typography.sizes.large,
    color: theme.colors.secondary.black,
  },
  checkIcon: {
    marginLeft: theme.spacing.sm,
  },
  continueButton: {
    width: '100%',
    backgroundColor: theme.colors.primary.primary1,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: theme.colors.background.dark,
  },
  continueButtonText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default ChooseLanguageScreen;