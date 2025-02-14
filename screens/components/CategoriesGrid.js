import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image,StyleSheet } from 'react-native';
// import { styles } from '../styles/homeStyles'; 
import { useNavigation } from '@react-navigation/native';

const CategoriesGrid = ({ categories }) => {
  const navigation = useNavigation();

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(category)}
    >
    
      <Image source={category.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const groupCategories = (categories, itemsPerRow = 4) => {
    const rows = [];
    for (let i = 0; i < categories.length; i += itemsPerRow) {
      rows.push(categories.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const handleCategoryPress = (category) => {
    console.log(category.category);
    
    navigation.navigate('AllAdsScreen', { category:category.category });
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesGridContainer}>
        {groupCategories(categories).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.categoryRow}>
            {row.map(renderCategoryCard)}
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  
  categoryCard: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
  categoryName: {
    marginTop: 10,
    fontSize: 12,

  },
  
  categoryImage: {
    width: 40, 
    height: 40, 
    resizeMode: 'contain', 
  },


  categoriesGridContainer: {
    paddingHorizontal: 15,
    paddingTop:10,
    backgroundColor:"#E9EEFF"
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 18,
    marginTop:10,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 20,
  },

});

export default CategoriesGrid;
