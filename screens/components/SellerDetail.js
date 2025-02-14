import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

const SellerDetail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.sellerName}>Philip Martin</Text>
          <Text style={styles.memberSince}>Member since 24, Nov</Text>
          <TouchableOpacity>
            <Text style={styles.viewAds}>View All Ads</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactSection}>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#1A47BD" />
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.whatsappButton}>
        <Ionicons name="logo-whatsapp" size={20} color="#1A47BD" />
        <Text style={styles.whatsappText}>Whatsapp</Text>
      </TouchableOpacity>

      <View style={styles.locationSection}>
        <Text style={styles.locationTitle}>Location</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText}>Sheikh Zayed, Dubai</Text>
      </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F1F9',
  },
  profileInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  sellerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  viewAds: {
    color: '#1A47BD',
    fontSize: 14,
  },
  contactSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A47BD',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A47BD',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  messageText: {
    color: '#1A47BD',
    fontSize: 16,
    fontWeight: '500',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A47BD',
    marginBottom: 20,
    gap: 8,
  },
  whatsappText: {
    color: '#1A47BD',
    fontSize: 16,
    fontWeight: '500',
  },
  locationSection: {
    gap: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1,
    borderColor: '#1A47BD',
  },
  
  locationText: {
    color: '#1A47BD',
    fontSize: 14,
    paddingHorizontal:30
  },
  
});

export default SellerDetail;