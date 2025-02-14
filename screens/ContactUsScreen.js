import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const ContactUsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Implement message sending logic
    console.log('Message sent:', { name, email, message });
    // You could add validation, API call, or other logic here
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
            name="chevron-back"
            size={24}
            color={theme.colors.secondary.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contactInfoSection}>
          <View style={styles.contactInfoItem}>
            <Ionicons
              name="call"
              size={24}
              color={theme.colors.primary.primary2}
            />
            <Text style={styles.contactInfoText}>+92 300 1234567</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Ionicons
              name="mail"
              size={24}
              color={theme.colors.primary.primary2}
            />
            <Text style={styles.contactInfoText}>support@example.com</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Ionicons
              name="location"
              size={24}
              color={theme.colors.primary.primary2}
            />
            <Text style={styles.contactInfoText}>Office Address, City, Country</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Send Us a Message</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={theme.colors.background.black}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor={theme.colors.background.black}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            placeholderTextColor={theme.colors.background.black}
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 40,
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
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  contactInfoSection: {
    backgroundColor: theme.colors.background.light,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  contactInfoText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
  },
  formContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  formTitle: {
    fontSize: theme.typography.sizes.large,
    color: theme.colors.primary.primary1,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary.primary1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: theme.colors.primary.primary1,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  sendButtonText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default ContactUsScreen;