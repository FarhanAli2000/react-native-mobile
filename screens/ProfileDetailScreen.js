import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  Edit,
  Save,
  ArrowLeft,
  ChevronLeft,
  Lock,
} from 'lucide-react-native';

// Import the theme
import { theme } from "./theme";

const ProfileDetailScreen = ({ navigation }) => {
  // Dummy data
  const userData = {
    name: 'John Doe',
    mobileNumber: '+1 234 567 8900',
    email: 'johndoe@example.com',
    description: 'Software Developer with 5 years of experience in mobile app development.',
    location: 'New York, USA',
    joiningDate: '01/01/2024',
    logo: require('../assets/profile.png')
  };

  const renderDetailItem = (icon, title, value, onPress) => (
    <TouchableOpacity
      style={styles.detailItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.detailItemContent}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.detailTextContainer}>
          <Text style={styles.detailLabel}>{title}</Text>
          <Text style={styles.detailValue} ellipsizeMode="tail">
            {value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
              <View style={styles.headerNavigation}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                   <ChevronLeft color={theme.colors.secondary.white} size={24} />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Profile Details</Text>
              </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.headerContainer}>
          <View style={styles.profileImageWrapper}>
            <View style={styles.profileImageContainer}>
              <Image
                source={userData.logo}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          </View>

          <Text style={styles.userName} numberOfLines={1}>
            {userData.name}
          </Text>
          <Text style={styles.userDescription} numberOfLines={2}>
            {userData.description}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          {renderDetailItem(
            <Phone color={theme.colors.primary.primary1} size={24} />,
            'Mobile Number',
            userData.mobileNumber,
            () => {/* Optional: Add action for phone number */}
          )}

          {renderDetailItem(
            <Mail color={theme.colors.primary.primary1} size={24} />,
            'Email Address',
            userData.email,
            () => {/* Optional: Add action for email */}
          )}

          {renderDetailItem(
            <FileText color={theme.colors.primary.primary1} size={24} />,
            'Description',
            userData.description,
            () => {/* Optional: Add full description view */}
          )}

          {renderDetailItem(
            <MapPin color={theme.colors.primary.primary1} size={24} />,
            'Location',
            userData.location,
            () => {/* Optional: Add location details or map view */}
          )}

          {renderDetailItem(
            <Calendar color={theme.colors.primary.primary1} size={24} />,
            'Joining Date',
            userData.joiningDate,
            () => {/* Optional: Add more details about joining */}
          )}
               <TouchableOpacity style={styles.changeButton} onPress={() => navigation.navigate('ChangePasswordScreen', { userData })}>
                      <Lock color={theme.colors.secondary.white} size={20} />
                      <Text style={styles.changeButtonText}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.EditButton} onPress={() => navigation.navigate('EditProfileScreen', { userData })}>
                      <Save color={theme.colors.secondary.white} size={20} />
                      <Text style={styles.EditButtonText}>Edit Details</Text>
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
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary.primary1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  profileImageWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImageContainer: {
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: theme.colors.secondary.white,
  },
  userName: {
    fontSize: theme.typography.sizes.xlarge,
    color: theme.colors.secondary.white,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  userDescription: {
    fontSize: theme.typography.sizes.medium, 
    color: theme.colors.secondary.white,
    opacity: 0.9, 
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    lineHeight: theme.typography.sizes.medium * 1.4,
    marginTop: theme.spacing.sm,
  },
  detailsContainer: {
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: theme.colors.primary.primary1 + '15', 
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  detailItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.primary.primary1,
    marginBottom: theme.spacing.xs,
  },
  detailValue: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
  },

  EditButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary.primary2,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.lg,
    },
    EditButtonText: {
      color: theme.colors.secondary.white,
      marginLeft: theme.spacing.sm,
      fontSize: theme.typography.sizes.medium,
      fontWeight: 'bold',
    },
  changeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary.primary1,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.lg,
    },
    changeButtonText: {
      color: theme.colors.secondary.white,
      marginLeft: theme.spacing.sm,
      fontSize: theme.typography.sizes.medium,
      fontWeight: 'bold',
    },
});

export default ProfileDetailScreen;