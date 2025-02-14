
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Pencil,
  Settings,
  ShieldCheck,
  LogOut,
  Heart,
  UserRound,
  Bell,
  ChevronRight,
  User,
  CreditCard,
  ChevronLeft,
  Contact,
  ChartArea,
  Contact2Icon,
  MessageCircle,
  HelpCircle
} from 'lucide-react-native';

// Import the theme
import { theme } from "./theme";
import { Message } from 'react-native-gifted-chat';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: require('../assets/advertisement.jpeg'),
    stats: {
      listings: 12,
      favorites: 45,
      purchases: 3
    }
  });

  const profileMenuItems = [
    {
      icon: <UserRound color={theme.colors.primary.primary1} size={24} />,
      title: 'My Account',
      onPress: () => navigation.navigate('ProfileDetailScreen')
      
    },
    {
      icon: <Heart color={theme.colors.primary.primary1} size={24} />,
      title: 'My Favorites',
      onPress: () => navigation.navigate('SavedAdsScreen')
     
    },
    {
      icon: <Bell color={theme.colors.primary.primary1} size={24} />,
      title: 'Notifications',
      onPress: () => navigation.navigate('NotificationsScreen')
    },
    {
      icon: <MessageCircle color={theme.colors.primary.primary1} size={24} />,
      title: 'Messages',
      onPress: () => navigation.navigate('ChatListScreen')
    },
    {
      icon: <ChartArea color={theme.colors.primary.primary1} size={24} />,
      title: 'Your Analytics',
      onPress: () => navigation.navigate('AnalyticsScreen')
    },
    {
      icon: <Contact color={theme.colors.primary.primary1} size={24} />,
      title: 'Contact Us',
      onPress: () => navigation.navigate('ContactUsScreen')
    },
    {
      icon: <HelpCircle color={theme.colors.primary.primary1} size={24} />,
      title: 'FAQ',
      onPress: () => navigation.navigate('FAQsScreen')
    },
    {
      icon: <Settings color={theme.colors.primary.primary1} size={24} />,
      title: 'Settings',
      // onPress: () => console.log('Settings Pressed')
    },
    {
      icon: <LogOut color={theme.colors.primary.primary1} size={24} />,
      title: 'Logout',
      // onPress: () => console.log('Logout Pressed'),
      style: { color: theme.colors.primary.primary1 }
    },
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemContent}>
        {item.icon}
        <Text style={[styles.menuItemText, item.style]}>{item.title}</Text>
      </View>
      <ChevronRight
        color={theme.colors.primary.primary1}
        size={24}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.primary1} />
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color={theme.colors.secondary.white} size={24} />
        </TouchableOpacity>
        <View style={styles.appBarSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeaderWrapper}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                source={user.profileImage}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editProfileButton}>
                <Pencil color={theme.colors.secondary.white} size={16} />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>

            {/* User Stats */}
            <View style={styles.userStatsContainer}>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatNumber}>{user.stats.listings}</Text>
                <Text style={styles.userStatLabel}>Listings</Text>
              </View>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatNumber}>{user.stats.favorites}</Text>
                <Text style={styles.userStatLabel}>Favorites</Text>
              </View>
              <View style={styles.userStatItem}>
                <Text style={styles.userStatNumber}>{user.stats.purchases}</Text>
                <Text style={styles.userStatLabel}>Purchases</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          {profileMenuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.primary1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderBottomColor: theme.colors.background.light,
  },
  appBarSpacer: {
    flex: 1,
  },
  profileHeaderWrapper: {
    backgroundColor: theme.colors.primary.primary1,
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    
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
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary.primary2,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontSize: theme.typography.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.secondary.white,
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.white,
    opacity: 0.8,
    marginBottom: theme.spacing.md,
  },
  userStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.colors.primary.primary2,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  userStatItem: {
    alignItems: 'center',
  },
  userStatNumber: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.secondary.white,
  },
  userStatLabel: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.secondary.white,
    opacity: 0.8,
  },
  menuContainer: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.md,

  },
  menuSectionTitle: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 10,
    marginBottom: 10,

  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.dark,
    marginBottom: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
  },
});

export default ProfileScreen;