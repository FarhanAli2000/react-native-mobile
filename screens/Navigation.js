import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import MyAdds from './MyAdds';
import AddAdds from './AddAdds';
import MoreSections from './MoreSections';
import { CustomDrawerContent } from './components/CustomDrawer';
import AnalyticsScreen from './AnalyticScreen';
import logoImage from '../assets/logo.png';

import enFlag from '../assets/uk_flag.png'; 
import arFlag from '../assets/saudi_flag.png'; 

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings</Text>
  </View>
);


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabNavigator = () => {
  const tabScreens = [
    { name: 'Home', component: HomeScreen, icons: ['home', 'home-outline'] },
    { name: 'My Ads', component: MyAdds, icons: ['megaphone', 'megaphone-outline'] },
    { name: 'Add Ads', component: AddAdds, icons: ['add', 'add-outline'] },
    { name: 'Profile', component: ProfileScreen, icons: ['person', 'person-outline'] },
    { name: 'More', component:  MoreSections, icons: ['grid', 'grid-outline'] }
  ];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const item = tabScreens.find(screen => screen.name === route.name);
          const iconName = focused ? item.icons[0] : item.icons[1];
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2D4495',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {tabScreens.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const MainDrawerNavigator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const DEFAULT_PHONE_NUMBER = '+956123099994'; 

  const languages = [
    { code: 'en', label: 'EN', flag: enFlag },
    { code: 'ar', label: 'AR', flag: arFlag }
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownVisible(false);
  };

  const handleCallPress = async () => {
    try {
      await Linking.openURL(`tel:${DEFAULT_PHONE_NUMBER}`);
    } catch (error) {
      console.error('Error opening phone app:', error);
    }
  };

  const LanguageSelector = () => {
    const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

    return (
      <>
        <TouchableOpacity 
          style={styles.languageSelectorContainer}
          onPress={() => setIsDropdownVisible(true)}
        >
          <Image
            source={currentLanguage.flag}
            style={styles.flag}
          />
          <Text style={styles.languageText}>{currentLanguage.label}</Text>
          <Ionicons name="chevron-down" size={16} color="#000" style={styles.dropdownIcon} />
        </TouchableOpacity>

        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View style={[styles.dropdownMenu, { right: 16, top: 60 }]}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.dropdownItem}
                  onPress={() => handleLanguageChange(language.code)}
                >
                  <Image source={language.flag} style={styles.flag} />
                  <Text style={styles.dropdownText}>{language.label}</Text>
                  {selectedLanguage === language.code && (
                    <Ionicons name="checkmark" size={16} color="#36A680" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        headerTitle: () => (
          <View style={styles.logoContainer}>
            <TouchableOpacity>
              <Image source={logoImage} style={styles.logoImage} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconContainer}
              onPress={handleCallPress}
            >
              <Ionicons name="call" size={20} color="#36A680" />
            </TouchableOpacity>
            
            <View style={styles.rightContainer}>
              <LanguageSelector />
            </View>
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="KSA4"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 16,
  },
  logoImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconContainer: {
    paddingLeft: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  languageText: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
  },
  dropdownIcon: {
    marginLeft: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 8,
  }
});

export default MainDrawerNavigator;


