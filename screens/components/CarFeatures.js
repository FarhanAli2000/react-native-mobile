import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';

const FeatureItem = ({ imagePath, text }) => (
  <View style={styles.featureItem}>
    <Image
      source={imagePath}
      style={styles.featureIcon}
      resizeMode="contain"
    />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const CarFeatures = () => {
  const features = [
    { image: require('../../assets/feature_icon.png'), text: 'ABS' },
    { image: require('../../assets/feature_icon.png'), text: 'AM/FM Radio' },
    { image: require('../../assets/feature_icon.png'), text: 'Air Bags' },
    { image: require('../../assets/feature_icon.png'), text: 'Air Conditioner' },
    { image: require('../../assets/feature_icon.png'), text: 'Immobilizer Key' },
    { image: require('../../assets/feature_icon.png'), text: 'Keyless Entry' },
    { image: require('../../assets/feature_icon.png'), text: 'Power Lock' },
    { image: require('../../assets/feature_icon.png'), text: 'Power Mirrors' },
    { image: require('../../assets/feature_icon.png'), text: 'Power Steering' },
    { image: require('../../assets/feature_icon.png'), text: 'Power Windows' },
    { image: require('../../assets/feature_icon.png'), text: 'Alloy Rims' },
    { image: require('../../assets/feature_icon.png'), text: 'CD Player' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>More Features</Text>
      </View>
      
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            imagePath={feature.image}
            text={feature.text}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary.white,
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.dark,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureIcon: {
    width: 24,
    height: 24,
  },
  featureText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
  },
});

export default CarFeatures;