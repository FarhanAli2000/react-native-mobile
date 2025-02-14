import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image, Text, Modal, Linking, Platform, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import SearchBar from './SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { TrendingProducts } from './components/TrendingProducts';
import CategoriesGrid from './components/CategoriesGrid';
import AdvertisementSection from './components/AdvertisementSection';
import BrowseMoreSection from './components/BrowseMoreSection';
import AdSection from './components/AdSection';
import LatestNewsSection from './components/LatestNewsSection';
import CurrentFuelPrices from './components/CurrentFuelPrices';
import { CATEGORIES, ADSCARS, ADSBIKES, ADVERTISEMENTS, TRENDING } from './data';
import BlogSection from './components/Blogs';
import SupportSection from './components/SupportSection';
import FeaturedAdSection from './components/FeaturedAd';
import logoImage from '../assets/logo.png';

import enFlag from '../assets/uk_flag.png';
import arFlag from '../assets/saudi_flag.png';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useStatusBarColor } from './hooks/statusbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const DEFAULT_PHONE_NUMBER = '+956123099994';
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [AutomoticeAds, setAutomotiveAds] = useState(null)
  const [FeaturedAds, setFeaturedAds] = useState(null)
  const [RealestateAds, setRealestateAds] = useState(null)
  const [HealthCareAds, setHealthCareAds] = useState(null)
  const [ElectronicsAds, setElectronicsAds] = useState(null)
  const [GamesSportsAds, setGamesSportsAds] = useState(null)
  const [CommercialAds, setCommercialAds] = useState(null)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "carData");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setAutomotiveAds(data)
        console.log("Fetched features data for car Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only on mount
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "books");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setFeaturedAds(data)
        console.log("Fetched featured Data for books:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only on mount
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "RealEstate");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setRealestateAds(data)
        console.log("Fetched feature Realestate Data:", data);
      } catch (error) {
        console.error("Error Realestate data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only on mount
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "HealthCare");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setHealthCareAds(data)
        console.log("Fetched feature healthcare Data:", data);
      } catch (error) {
        console.error("Error healthcare data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "Electronic");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setElectronicsAds(data)
        console.log("Fetched featured Electronics Data:", data);
      } catch (error) {
        console.error("Error Electronics data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "GamesSport");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        setGamesSportsAds(data)
        console.log("Fetched feature GamesSports Data:", data);
      } catch (error) {
        console.error("Error GamesSports data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "ComercialsAds");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));
        console.log("Fetched CommercialAds Data:", data);
        setCommercialAds(data)
        console.log("Fetched feature CommercialAds Data:", CommercialAds);
      } catch (error) {
        console.error("Error CommercialAds data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  const automotiveCategories = [
    'Car For Sale',
    'Car For Rent',
    'Motorcycles For Sale',
    'Motorcycles For Rent',
    'Electric Vehicles',
    'Parts & Accessories',
    'Car Service & Repairs',
    'SUV For Sale',
    'Trucks For Sale',
    'Luxury Cars For Sale',
    'Commercial Vehicles',
    'Car Leasing',
  ];

  const realestateCategories = [
    'Sale Property',
    'Rent Property',
    'Buy Property',
    'Office Space for Sale',
    'Office Space for Rent',
    'Residential Property for Sale',
    'Residential Property for Rent',
    'Vacation Homes',
    'Land for Sale',
    'Farm Land for Sale',
    'Commercial Property for Rent',
    'Industrial Property for Rent',
    'Real Estate Investment',
  ];

  const electronicsCategories = [
    'Charger',
    'Headphones',
    'Speakers',
    'Mobiles',
    'Processor',
    'Laptops',
    'Tablets',
    'Smart Watches',
    'Cameras & Drones',
    'Smart Home Devices',
    'Televisions',
    'Printers & Scanners',
    'Game Consoles',
    'PC Components',
  ];

  const healthcareCategories = [
    'Sugar Apparatus',
    'BP Apparatus',
    'Medicines',
    'Vitamins & Supplements',
    'Medical Equipment',
    'First Aid Kits',
    'Thermometers',
    'Personal Care Devices',
    'Mobility Aids',
    'Hearing Aids',
    'Health Monitors',
    'Orthopedic Products',
    'Dental Care',
  ];

  const sportsCategories = [
    'Football',
    'Cricket Kit',
    'Gloves',
    'Stumps',
    'Tennis Rackets',
    'Badminton Rackets',
    'Cycling Gear',
    'Swimming Equipment',
    'Gym Equipment',
    'Basketball',
    'Hockey Equipment',
    'Running Shoes',
    'Fitness Trackers',
    'Boxing Gear',
  ];




  // Handler to set the selected product
  // In HomeScreen.js
  const handleCategorySelect = (category) => {
    let categoryAds;
    console.log('category',selectedCategory);
    
    switch (category.name.toLowerCase()) {
      case 'electronics':
        categoryAds = ElectronicsAds;
        break;
      case 'sports':
        categoryAds = GamesSportsAds;
        break;
      case 'healthcare':
        categoryAds = HealthCareAds;
        break;
      case 'automotive':
        categoryAds = AutomoticeAds;
        break;
      case 'real estate':
        categoryAds = RealestateAds;
        break;
      default:
        categoryAds = [];
    }

    navigation.navigate('ProductCategory', {
      category: category,
      ads: categoryAds
    });
  };


  const handleCategoryChange = (category) => {
    console.log('Selected category:', category);
    // Filter ads or fetch new ads based on category
  };

  const handleSubCategoryChange = (subCategory) => {
    console.log('Selected subcategory:', subCategory);
    // Filter ads or fetch new ads based on subcategory
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };


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

  const LanguageSelector = () => (
    <>
      <TouchableOpacity
        style={styles.languageSelectorContainer}
        onPress={() => setIsDropdownVisible(true)}
      >
        <Image source={languages.find(lang => lang.code === selectedLanguage).flag} style={styles.flag} />
        <Text style={styles.languageText}>{selectedLanguage.toUpperCase()}</Text>
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
  if (loading) {
    return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
    <ActivityIndicator size={"large"} />
    </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={true}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="menu" size={24} color="black" style={styles.drawerIcon} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <TouchableOpacity>
            <Image source={logoImage} style={styles.logoImage} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.callContainer}
            onPress={handleCallPress}
          >
            <Ionicons name="call" size={20} color="#36A680" />
          </TouchableOpacity>

          <View style={styles.languageContainer}>
            <LanguageSelector />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchcontainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            onLocationPress={() => navigation.navigate('SelectLocationScreen', { onLocationSelect: setSelectedLocation })}
          />
          <TrendingProducts
            trendingProducts={TRENDING}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />

          <CategoriesGrid
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect} />

          <FeaturedAdSection
            title="Featured Ads"
            ads={FeaturedAds}
          // onCategoryChange={(category) => {
          //   console.log('Furniture category changed:', category);
          //   // Handle furniture category change
          // }}
          />

          <AdSection
            title="Automotive"
            categories={automotiveCategories}
            ads={AutomoticeAds}
            // onCategoryChange={(category) => {
            //   console.log('Selected category:', category);
            //   // Handle category change
            // }}
            onViewAllPress={() => {
              // Handle view all press
              navigation.navigate('AllAdsScreen',{category:'carData'})
            }}
          />


          <AdSection
            title="Real Estate"
            categories={realestateCategories}
            ads={RealestateAds}
            // onCategoryChange={(category) => {
            //   console.log('Selected category:', category);
            //   // Handle category change
            // }}
            onViewAllPress={() => {
              // Handle view all press
              navigation.navigate('AllAdsScreen',{category:'RealEstate'})
            }}
          />
            <AdSection
        title="Electronics"
        categories={electronicsCategories}
        ads={ElectronicsAds}
        onCategoryChange={(category) => {
          // console.log('Selected category:', {category:'Electronic'});
          // Handle category change
        }}
        onViewAllPress={() => {
          // Handle view all press
          navigation.navigate('AllAdsScreen',{category:'Electronic'})
        }}
      />
          <AdSection
            title="Health Care"
            categories={healthcareCategories}
            ads={HealthCareAds}
            // onCategoryChange={(category) => {
            //   console.log('Selected category:', category);
            //   // Handle category change
            // }}
            onViewAllPress={() => {
              // Handle view all press
              navigation.navigate('AllAdsScreen',{category:'HealthCare'})
            }}
          />
         
       
     
      
       <AdSection
        title="Sports & Game"
        categories={sportsCategories}
        ads={GamesSportsAds}
        onCategoryChange={(category) => {
          // console.log('Selected category:', category);
          // Handle category change
        }}
        onViewAllPress={() => {
          // Handle view all press
          navigation.navigate('AllAdsScreen',{category:'GamesSport'})
        }}
      /> 


          <AdvertisementSection title="Commercial Ads" CommercialAds={CommercialAds}
            onViewAllPress={() => {
              // Handle view all press
              navigation.navigate('AllAdsScreen')
            }} />

          <BlogSection onExplorePress={() => navigation.navigate('AllBlogs')} />
          <SupportSection />

          <View style={styles.bottom} />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderColor: "#e5e7eb",
    borderWidth: 0.3
  },
  drawerIcon: {
    paddingTop: 10
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 16,
    marginTop: 10,
  },
  logoImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  callContainer: {
    paddingLeft: 46,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60
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
  },
  scrollView: {
    flex: 1,
  },
  searchcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  bottom: {
    marginTop: 50,

  },
});

export default HomeScreen;