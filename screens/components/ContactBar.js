// components/ContactBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const ContactBar = () => {
  const handleCall = () => {
    Linking.openURL('tel:+123456789');
  };

  const handleSMS = () => {
    Linking.openURL('sms:+123456789');
  };

  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=123456789');
  };

  const handleChat = () => {
    // Implement chat functionality
    console.log('Chat pressed');
  };

  return (
    <View style={styles.container}>
      {/* Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Ionicons name="call-outline" size={24} color="white" />
        <Text style={styles.callButtonText}>Call seller</Text>
      </TouchableOpacity>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSMS}>
          <Ionicons name="chatbubble-outline" size={24} color={theme.colors.primary.primary1} />
          <Text style={styles.actionText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
          <Ionicons name="chatbox-outline" size={24} color={theme.colors.primary.primary1} />
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color={theme.colors.primary.primary1} />
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.secondary.white,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.dark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  callButton: {
    backgroundColor: theme.colors.primary.primary1,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  callButtonText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    marginLeft: theme.spacing.sm,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    color: theme.colors.primary.primary1,
    fontSize: theme.typography.sizes.medium,
    marginTop: theme.spacing.xs,
  },
});

export default ContactBar;