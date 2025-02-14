import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors, theme } from '../theme';

const BrowseMoreSection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Browse More</Text>
      </View>

      <View style={styles.sectionContent}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Forums')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Forums</Text>
            <Text style={styles.itemDescription}>Discuss about everything on wheel</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Blog')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Blog</Text>
            <Text style={styles.itemDescription}>PakWheels brings you the latest auto industry updates</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('NewCarPrices')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>New Car Prices</Text>
            <Text style={styles.itemDescription}>Get the latest price list</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('CarReviews')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Car Reviews</Text>
            <Text style={styles.itemDescription}>Help you find the right car</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('CarComparisons')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Car Comparisons</Text>
            <Text style={styles.itemDescription}>Compare car specifications and features</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('GetOnRoadPrice')}
          activeOpacity={0.7}
        >
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Get on road price</Text>
            <Text style={styles.itemDescription}>Know the final price of your new car</Text>
          </View>
          <ChevronRight color={theme.colors.primary.primary1} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: 15,
    shadowColor: theme.colors.secondary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.dark + '20',
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: '600',
    color: theme.colors.primary.primary1,
  },
  sectionContent: {
    
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: theme.typography.sizes.medium,
    fontWeight: '500',
    color: theme.colors.secondary.black,
  },
  itemDescription: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.secondary.black + '80',
    marginTop: theme.spacing.xs,
  },
});

export default BrowseMoreSection;