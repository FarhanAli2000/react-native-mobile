import React, { useState, useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  ActivityIndicator,
} from "react-native";
import { theme } from "./theme";
import ImageSlider from "./components/ImageSlider";
import CarSpecification from "./components/CarSpecification";
import CarFeatures from "./components/CarFeatures";
import SellerDetail from "./components/SellerDetail";
import AdSection from "./components/AdSection";
import BlogSection from "./components/Blogs";
import SupportSection from "./components/SupportSection";
import AdvertisementSection from "./components/AdvertisementSection";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get("window");

const AdDetailScreen = ({ navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cars"));
        const adsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (adsData.length > 0) {
          console.log("Fetched Data: ", adsData[0]);
          setAdDetails(adsData[0]);
        } else {
          console.log("No ads found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdDetails();
  }, []);

  console.log(adDetails, "Ad Details State"); // Debugging

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const headerBackground = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ["transparent", "#2D4495"],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.primary1} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.View
        style={[styles.header, { backgroundColor: headerBackground }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color="#fff" />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
          {adDetails?.title || "Ad Details"}
        </Animated.Text>
      </Animated.View>
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {adDetails ? (
          <>
            <ImageSlider images={adDetails?.galleryImages || []} />
            <View style={styles.priceSection}>
            <Text style={styles.adTitle}>{adDetails?.title}</Text>
  <View style={styles.location}>
    <Ionicons name="location" size={16} color="#2D4495" />
    <Text style={styles.locationText}>{adDetails?.City}</Text>
  
                </View>
           
              <Text style={styles.price}>PKR {adDetails?.Price}</Text>
            </View>
            <CarSpecification specs={adDetails?.reportTypes} />
         
            <CarFeatures />
            <SellerDetail navigation={navigation} />
            <AdSection
              title="You May Also Like"
              ads={adDetails?.galleryImages || []}
            />
            <AdvertisementSection title="Commercial Ads" advertisements={[]} />
            <BlogSection
              onExplorePress={() => navigation.navigate("AllBlogs")}
            />
            <SupportSection />
            <View style={{ height: 20 }} />
          </>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No data available
          </Text>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    height: 56 + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
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
  priceSection: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  adTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 18,
    color: theme.colors.primary.primary1,
  },
  location: {
    flexDirection: 'row', // 👈 Icon aur text ek line me rahenge
    alignItems: 'center',
    marginTop: 4, // 👈 Title aur location ke beech halka gap
  },
  locationText: {
    fontSize: 14,
    color: '#2D4495',
    marginLeft: 4, // 👈 Icon aur text ke beech halka gap
  }
});

export default AdDetailScreen;
