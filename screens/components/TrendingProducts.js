import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View,StyleSheet } from 'react-native';
// import { styles } from '../styles/homeStyles';

export const TrendingProducts = ({ trendingProducts, selectedProductId, setSelectedProductId }) => {
  if (!trendingProducts || !Array.isArray(trendingProducts)) {
    return null;
  }

  useEffect(() => {
    if (selectedProductId === null && trendingProducts.length > 0) {
      setSelectedProductId(0);
    }
  }, []);

  return (
    <View>
      <Text style={styles.sectionTitle}>Our Trending Products</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.trendingContainer}
      >
        {trendingProducts.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterCard,
              selectedProductId === index && { backgroundColor: '#2d4495' }
            ]}
            onPress={() => setSelectedProductId(index)}
          >
            <Text
              style={[
                styles.categoryName,
                selectedProductId === index && { color: 'white' }
              ]}
            >
              {product}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    marginTop:10,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  trendingContainer: {
    paddingLeft: 5,
    marginRight:10,
    
  },
  filterCard: {
    paddingBottom: 10,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
  },
  
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center'

  },

});