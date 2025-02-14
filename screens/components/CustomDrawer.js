import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { colors, theme } from '../theme';


// CustomDrawerContent Component
const CustomDrawerContent = (props) => {
  const drawerItems = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home', route: 'Home', description: 'Browse listings & deals' },
    { name: 'My Profile', icon: 'person-outline', activeIcon: 'person', route: 'ProfileScreen', description: 'Manage your account' },
    { name: 'My Ads', icon: 'list-outline', activeIcon: 'list', route: 'MyAdds', description: 'View your active ads' },
    { name: 'Add Ad', icon: 'add-outline', activeIcon: 'list', route: 'AddAdds', description: 'Add a new ad' },
    { name: 'Your Analytics', icon: 'bar-chart-outline', activeIcon: 'list', route: 'AnalyticsScreen', description: 'View your stats' },
    { name: 'Contact Us', icon: 'call-outline', activeIcon: 'list', route: 'ContactUsScreen', description: 'Contact us for queries' },
    // { name: 'Messages', icon: 'chatbubble-outline', activeIcon: 'chatbubble', route: 'Messages', description: 'Chat with buyers & sellers' },
    // { name: 'Favorites', icon: 'heart-outline', activeIcon: 'heart', route: 'Favorites', description: 'Your saved items' },
    // { name: 'Settings', icon: 'settings-outline', activeIcon: 'settings', route: 'SettingsScreen', description: 'App preferences' },
    // Add more items here if necessary
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      props.navigation.replace('Login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <View style={styles.profileStatus} />
        </View>
        <Text style={styles.userName}>{auth.currentUser?.displayName || 'User Name'}</Text>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => props.navigation.navigate('Profile')}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Navigation Items */}
      <ScrollView style={styles.navigationSection} contentContainerStyle={styles.scrollViewContainer}>
        {drawerItems.map((item, index) => {
          const isActive = currentRoute === item.route;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.drawerItem, isActive && styles.drawerItemActive]}
              onPress={() => props.navigation.navigate(item.route)}
            >
              <View style={styles.drawerItemIconContainer}>
                <Ionicons
                  name={isActive ? item.activeIcon : item.icon}
                  size={24}
                  color={isActive ? colors.primary.primary1 : colors.secondary.black}
                />
              </View>
              <View style={styles.drawerItemContent}>
                <Text style={[styles.drawerItemText, isActive && styles.drawerItemTextActive]}>
                  {item.name}
                </Text>
                <Text style={styles.drawerItemDescription}>
                  {item.description}
                </Text>
              </View>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={colors.secondary.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
};


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerTitle: () => null,
        drawerStyle: {
          width: '80%',
        }
      })}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabNavigator}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xlarge,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: colors.secondary.black,
  },
  subtitle: {
    fontSize: theme.typography.sizes.medium,
    color: colors.secondary.black,
    opacity: 0.8,
  },
  profileSection: {
    padding: theme.spacing.xl,
    backgroundColor: colors.primary.primary1,
    alignItems: 'center',
    borderBottomRightRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: theme.borderRadius.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
    marginTop: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.secondary.white,
  },
  profileStatus: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary.primary2,
    borderWidth: 2,
    borderColor: colors.secondary.white,
  },
  userName: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  userEmail: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.small,
    opacity: 0.8,
    marginBottom: theme.spacing.md,
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },
  editProfileText: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.small,
  },
  navigationSection: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: theme.spacing.xl,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xs,
    position: 'relative',
  },
  drawerItemActive: {
    backgroundColor: `${colors.primary.primary1}10`,
  },
  drawerItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    backgroundColor: colors.background.dark,
  },
  drawerItemContent: {
    flex: 1,
  },
  drawerItemText: {
    fontSize: theme.typography.sizes.medium,
    color: colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  drawerItemTextActive: {
    color: colors.primary.primary1,
    fontWeight: 'bold',
  },
  drawerItemDescription: {
    fontSize: theme.typography.sizes.small,
    color: '#666',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 4,
    height: 30,
    backgroundColor: colors.primary.primary1,
    borderTopLeftRadius: theme.borderRadius.sm,
    borderBottomLeftRadius: theme.borderRadius.sm,
  },
  footer: {
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.background.dark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.primary1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  logoutText: {
    color: colors.secondary.white,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.medium,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: theme.typography.sizes.small,
  },
});

export { DrawerNavigator, CustomDrawerContent };


