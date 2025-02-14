import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from "./theme";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../ksaforsale-rect-native-test-main/config/firebase";


const ProductsCategory = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // Make sure the collection name is correct
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        console.log("The product data is :",productList);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigateToFilter = () => {
    navigation.navigate('FilterScreen');
  };

  const navigateToADDetails = (item) => {
    navigation.navigate('AdDetailScreen', { product: item });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigateToADDetails(item)}> 
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
          <Text style={styles.specText}>{item.mileage} Km</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.specText}>{item.fuel}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call-outline" size={12} color="white" />
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={12} color={theme.colors.primary.primary1} />
              <Text style={styles.buttonTextCall}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whatsappButton}>
              <Ionicons name="logo-whatsapp" size={12} color={theme.colors.primary.primary1} />
              <Text style={styles.buttonTextCall}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.updateTime}>Updated {item.updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for used cars"
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="heart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterOptions}>
          <TouchableOpacity style={styles.filterOption}>
            <MaterialIcons name="sort" size={18} color="#333" />
            <Text style={styles.filterText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOption} onPress={navigateToFilter}>
            <View style={styles.badgeContainer}>
              <MaterialIcons name="filter-list" size={18} color="#333" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary.primary1} style={{ marginTop: 20 }} />
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
    paddingTop: 46,
    paddingBottom: 16
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productList: {
    paddingHorizontal: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 120,
    height: 120,
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
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
  },
  updateTime: {
    fontSize: 10,
    color: '#999',
    paddingTop: 5,
  },
});

export default ProductsCategory;
