import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../ksaforsale-rect-native-test-main/config/firebase"; // Ensure correct path

const SearchScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from Firestore...");

        const querySnapshot = await getDocs(collection(db, "Cars")); // Ensure the collection exists
        const productList = [];

        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched products:", productList);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigateToADDetails = (item) => {
    navigation.navigate('AdDetailScreen', { product: item });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigateToADDetails(item)}
    >
      <View style={styles.imageContainer}>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="heart" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#000" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.specsRow}>
          <Text style={styles.specText}>{item.year}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.specText}>{item.mileage}Km</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.specText}>{item.fuel}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.updateTime}>Updated {item.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
        />
      )}
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  headerContainer: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  likeButton: {
    marginLeft: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 8,
  },
  outlinedOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'transparent',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
  },
  badgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff3d3d',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
  },
  saveSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 4,
  },
  saveSearchText: {
    fontSize: 14,
    color: theme.colors.primary.primary1,
  },
  productList: {
    paddingHorizontal: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 142,
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    paddingRight: 10,

  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingTop:3,

  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D4495',
    paddingTop:3
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    paddingBottom:3
  },
  specsRow: {
    flexDirection: 'row',
    paddingTop:3,

  },
  specText: {
    fontSize: 12,
    color: '#666',

  },
  separator: {
    marginHorizontal: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    paddingTop:3,
    paddingBottom:8

  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#2D4495',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  messageButton: {
    borderColor: "#2D4495",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  whatsappButton: {
    backgroundColor: '#fff',
    borderColor: "#2D4495",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateTime: {
    fontSize: 10,
    color: '#999',
    paddingTop: 5,
    paddingBottom:5,
    marginLeft: 105,
  },
  buttonText: {
    fontSize: 10,
    color: "white",
  },
  buttonTextCall: {
    fontSize: 10,
    color: "#2D4495",
  },
});

export default SearchScreen;