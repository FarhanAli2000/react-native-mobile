

import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

const CategoryFilters = ({ 
  categories = [],
  onCategoryChange,
  defaultCategory = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory || (categories[0] || ''));
  
  useEffect(() => {
    // Trigger initial category selection
    if (categories.length > 0) {
      onCategoryChange?.(selectedCategory);
    }
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <View style={{
      marginTop: 8,
      marginBottom: 16,
      backgroundColor:'#E9EEFF'
    }}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 16
        }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryPress(category)}
            style={{
              paddingBottom: 8,
              borderBottomWidth: 2,
              borderBottomColor: selectedCategory === category ? theme.colors.primary.primary1 : 'transparent'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: selectedCategory === category ? theme.colors.primary.primary1 : '#666666',
              fontWeight: selectedCategory === category ? '500' : '400'
            }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryFilters;

