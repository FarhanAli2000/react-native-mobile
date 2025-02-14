import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from "./theme";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { formatDistanceToNow } from 'date-fns';

const ProductsCategory = ({route}) => {
  const {category} = route.params
  // console.log(category);
  const[ads,setAds]= useState(null)
  const[loading,setLoading]=useState(false) 
   useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
        try {
          // Reference to the 'Electronic' collection
          const listingsCollection = collection(db, category);
  
          // Fetch documents from the collection
          const querySnapshot = await getDocs(listingsCollection);
  
          // Extract and log data
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Document ID
            ...doc.data(), // Document data
          }));
          console.log("Fetched  Data  from all ads screen hsjjca:",data);
          setAds(data)
         
        } catch (error) {
          console.error("Error fetching data:", error);              
        }
        finally {
          setLoading(false)
        }
      };
  
      fetchData();
    }, []);
  const navigation = useNavigation();
 
 
  const navigateToFilter = () => {
    navigation.navigate('FilterScreen');
  };

  const navigateToADDetails = () => {
    navigation.navigate('AdDetailScreen');
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigateToADDetails(item)} 
    >
      {/* <Text>kjsaclkmsackmascl,acs</Text> */}
      <View style={styles.imageContainer}>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <Image source={{uri:item.img}} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="heart" size={15} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.productName}>{item.name?item.name:item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#000" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
{/* 
        <View style={styles.specsRow}>
  <Text style={styles.specText}>{item.model ? item.model : "N/A"}</Text>
  <Text style={styles.separator}>|</Text>
  <Text style={styles.specText}>{item.engineCapacity ? item.engineCapacity : "N/A"}</Text>
  <Text style={styles.separator}>|</Text>
  <Text style={styles.specText}>{item.color? item.color : "N/A"}</Text>
</View> */}

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
              <Text style={styles.buttonTextCall}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.updateTime}>{formatDistanceToNow(new Date(item.time_ago?item.time_ago:item.timeAgo), { addSuffix: true })}</Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
    <ActivityIndicator size={"large"} />
    </View>
    )
  }
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
          <TouchableOpacity style={[styles.filterOption, styles.outlinedOption]}>
            <Text style={styles.filterText}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterOption, styles.outlinedOption]}>
            <Text style={styles.filterText}>Model</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterOption, styles.outlinedOption]}>
            <Text style={styles.filterText}>Location</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>31365 results</Text>
        <View style={styles.saveSearchContainer}>
          <TouchableOpacity style={styles.saveSearchButton}>
            <AntDesign name="hearto" size={20} color={theme.colors.primary.primary1} style={styles.heartIcon} />
            <Text style={styles.saveSearchText}>Save Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 0, 
  },
  headerContainer: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 46,
    paddingBottom:16
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
    color: theme.colors.primary.primary1,
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
    paddingBottom:8,
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
    borderColor: theme.colors.primary.primary1,
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
    color: theme.colors.primary.primary1,
  },
});

export default ProductsCategory;
