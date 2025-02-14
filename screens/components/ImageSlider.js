import React, { useState, useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

const { width } = Dimensions.get('window');
const THUMB_SIZE = 60;

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const scrollToImage = (index) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>
            {`${activeIndex + 1}/${images.length}`}
          </Text>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailScroll}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToImage(index)}
            style={[
              styles.thumbnailContainer,
              activeIndex === index && styles.activeThumbnail
            ]}
          >
            <Image
              source={image}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  sliderContainer: {
    height: 280,
    width: width,
    
  },
  sliderImage: {
    width: width,
    height: 280,
  },
  pagination: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  paginationText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.small,
  },
  thumbnailScroll: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
  },
  thumbnailContainer: {
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: theme.colors.primary.primary1,
  },
  thumbnail: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 6,
  },
});

export default ImageSlider;