// EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import {
  Camera,
  Save,
  ArrowLeft,
} from 'lucide-react-native';

import { theme } from "./theme";

const EditProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [formData, setFormData] = useState({
    name: userData.name,
    mobileNumber: userData.mobileNumber,
    email: userData.email,
    description: userData.description,
    location: userData.location,
    logo: userData.logo
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, logo: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    console.log('Saving profile:', formData);
    navigation.goBack();
  };

  const renderInput = (label, value, key, isMultiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.input, isMultiline && styles.multilineInput]}
        value={value}
        onChangeText={(text) => setFormData(prev => ({ ...prev, [key]: text }))}
        multiline={isMultiline}
        numberOfLines={isMultiline ? 4 : 1}
      />
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
            <Text style={styles.screenTitle}>Edit Profile</Text>
          </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={typeof formData.logo === 'string' ? { uri: formData.logo } : formData.logo}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={handleImagePick}>
              <Camera color={theme.colors.secondary.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          {renderInput('Name', formData.name, 'name')}
          {renderInput('Mobile Number', formData.mobileNumber, 'mobileNumber')}
          {renderInput('Email Address', formData.email, 'email')}
          {renderInput('Description', formData.description, 'description', true)}
          {renderInput('Location', formData.location, 'location')}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Save color={theme.colors.secondary.white} size={20} />
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.secondary.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary.primary2,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
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
  input: {
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    borderWidth: 1,
    borderColor: theme.colors.background.dark,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
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

export default EditProfileScreen;