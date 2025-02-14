import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Save,
  Lock
} from 'lucide-react-native';

import { theme } from "./theme";

const ChangePasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
   
    if (formData.newPassword !== formData.confirmPassword) {
     
      return;
    }
    console.log('Saving new password');
    navigation.goBack();
  };

  const renderInput = (label, value, key, isSecure = true) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordInputContainer}>
        <Lock color={theme.colors.primary.primary1} size={20} style={styles.lockIcon} />
        <TextInput
          style={styles.passwordInput}
          value={value}
          onChangeText={(text) => setFormData(prev => ({ ...prev, [key]: text }))}
          secureTextEntry={isSecure}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={theme.colors.background.black}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerNavigation}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={theme.colors.secondary.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Change Password</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Lock color={theme.colors.secondary.white} size={40} />
          </View>
          <Text style={styles.headerText}>
            Create a new password that is at least 8 characters long
          </Text>
        </View>

        <View style={styles.formContainer}>
          {renderInput('Current Password', formData.currentPassword, 'currentPassword')}
          {renderInput('New Password', formData.newPassword, 'newPassword')}
          {renderInput('Confirm Password', formData.confirmPassword, 'confirmPassword')}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Save color={theme.colors.secondary.white} size={20} />
            <Text style={styles.saveButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  headerNavigation: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  backButton: {
    marginRight: theme.spacing.lg,
  },
  screenTitle: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontWeight: '600',
  },
  headerContainer: {
    backgroundColor: theme.colors.primary.primary1,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  iconContainer: {
    backgroundColor: theme.colors.primary.primary2,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.round,
    marginBottom: theme.spacing.md,
  },
  headerText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  formContainer: {
    padding: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.primary.primary1,
    marginBottom: theme.spacing.xs,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.background.dark,
  },
  lockIcon: {
    marginLeft: theme.spacing.md,
  },
  passwordInput: {
    flex: 1,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,

  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary.primary2,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
  },
  saveButtonText: {
    color: theme.colors.secondary.white,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.medium,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;