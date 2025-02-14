import React from 'react';
import { View, Text, TouchableOpacity, Linking,Image } from 'react-native';
import { Mail, Phone } from "lucide-react-native";
import { theme} from '../theme';

const styles = {
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  contentWrapper: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  supportContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  touchableOverlay: {
    position: 'absolute',
    right: 16,
    opacity: 0.5,
  },
  arrowIcon: {
    fontSize: 20,
    color: theme.colors.primary.primary1,
  }
};

const SupportSection = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:Support@ksa4sale.com');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+96543215678');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>We're Always Here to Help</Text>
        <View style={styles.supportContainer}>
          <TouchableOpacity 
            style={styles.supportItem} 
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Image source={require('../../assets/mail_icon.png')} style={styles.EmailIcon} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.label}>Email Support</Text>
              <Text style={styles.value}>Support@ksa4sale.com</Text>
            </View>
            <Text style={styles.touchableOverlay}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.supportItem}
            onPress={handlePhonePress}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
            <Image source={require('../../assets/whatsapp_icon.png')} style={styles.EmailIcon} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.label}>Phone Support</Text>
              <Text style={styles.value}>+ 965 43215678</Text>
            </View>
            <Text style={styles.touchableOverlay}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SupportSection;