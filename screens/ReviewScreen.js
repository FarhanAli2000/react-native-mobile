// ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, colors } from './theme';
import { useNavigation } from '@react-navigation/native';

const MOCK_REVIEWS = [
 {
   id: '1',
   userName: 'John Doe',
   userImage: require('../assets/profile.png'),
   rating: 5,
   review: 'Great condition Toyota Corolla. The seller was very professional and honest about the car\'s condition. Smooth transaction and excellent communication throughout.',
   created_at: '2024-12-25',
   helpfulCount: 12,
   images: [require('../assets/car1.jpeg'), require('../assets/car2.jpeg')],
   verifiedBuyer: true,
   location: 'Islamabad'
 },
 {
   id: '2',
   userName: 'Sarah Khan',
   userImage: require('../assets/profile.png'),
   rating: 4,
   review: 'The car was in good condition as described. Minor issues with paperwork but seller helped resolve them. Would recommend this dealer.',
   created_at: '2024-12-24',
   helpfulCount: 8,
   verifiedBuyer: true,
   location: 'Lahore'
 },
 {
   id: '3',
   userName: 'Ahmed Ali',
   userImage: require('../assets/profile.png'),
   rating: 5,
   review: 'Best price in the market for this model. Very satisfied with the purchase. Car runs perfectly and everything was as advertised.',
   created_at: '2024-12-23',
   helpfulCount: 15,
   images: [require('../assets/bike1.jpeg')],
   verifiedBuyer: true,
   location: 'Karachi'
 }
];

const ReviewScreen = () => {
 const [selectedRating, setSelectedRating] = useState(0);
 const navigation = useNavigation();

 const FilterButton = ({ rating }) => (
   <TouchableOpacity
     style={[styles.filterButton, selectedRating === rating && styles.filterButtonActive]}
     onPress={() => setSelectedRating(rating)}
   >
     <Text style={[styles.filterButtonText, selectedRating === rating && styles.filterButtonTextActive]}>
       {rating === 0 ? 'All' : `${rating} Stars`}
     </Text>
   </TouchableOpacity>
 );

 const renderReviewCard = ({ item }) => (
   <View style={styles.reviewCard}>
     <View style={styles.reviewHeader}>
       <Image source={item.userImage}style={styles.userImage} />
       <View style={styles.userInfo}>
         <Text style={styles.userName}>{item.userName}</Text>
         <View style={styles.reviewMeta}>
           {item.verifiedBuyer && (
             <View style={styles.verifiedBadge}>
               <MaterialIcons name="verified" size={12} color={colors.primary.primary2} />
               <Text style={styles.verifiedText}>Verified Buyer</Text>
             </View>
           )}
           <Text style={styles.locationText}>
             <MaterialIcons name="location-on" size={12} color={colors.primary.primary2} />
             {item.location}
           </Text>
         </View>
         <View style={styles.starsRow}>
           {[1,2,3,4,5].map(i => (
             <MaterialIcons
               key={i}
               name={i <= item.rating ? "star" : "star-border"}
               size={16}
               color={i <= item.rating ? colors.secondary.secondary1 : '#ccc'}
             />
           ))}
           <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleDateString()}</Text>
         </View>
       </View>
     </View>

     <Text style={styles.reviewText}>{item.review}</Text>

     {item.images?.length > 0 && (
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
         {item.images.map((img, index) => (
           <Image key={index} source={img} style={styles.reviewImage} />
         ))}
       </ScrollView>
     )}

     <View style={styles.reviewFooter}>
       <TouchableOpacity style={styles.helpfulButton}>
         <MaterialIcons name="thumb-up" size={16} color={colors.primary.primary2} />
         <Text style={styles.helpfulText}>Helpful ({item.helpfulCount})</Text>
       </TouchableOpacity>
     </View>
   </View>
 );

 return (
   <View style={styles.container}>
     <View style={styles.header}>
      <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.secondary.white} />
            </TouchableOpacity>
       <View style={styles.ratingOverview}>
         <Text style={styles.avgRating}>4.5</Text>
         <View style={styles.ratingStats}>
           <View style={styles.starsContainer}>
             {[1,2,3,4,5].map(i => (
               <MaterialIcons
                 key={i}
                 name="star"
                 size={24}
                 color={colors.secondary.secondary1}
               />
             ))}
           </View>
           <Text style={styles.totalReviews}>Based on {MOCK_REVIEWS.length} reviews</Text>
         </View>
       </View>

       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
         <FilterButton rating={0} />
         {[5,4,3,2,1].map(rating => (
           <FilterButton key={rating} rating={rating} />
         ))}
       </ScrollView>
     </View>

     <FlatList
       data={MOCK_REVIEWS}
       renderItem={renderReviewCard}
       keyExtractor={item => item.id}
       contentContainerStyle={styles.listContainer}
     />
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: theme.colors.background.light,
 },
 header: {
   backgroundColor: colors.primary.primary1,
   padding: theme.spacing.lg,
   paddingTop: 50,
 },

 ratingOverview: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: theme.spacing.md,
 },
 avgRating: {
   fontSize: 48,
   color: colors.secondary.white,
   fontFamily: theme.typography.fontFamily.bold,
 },
 ratingStats: {
   alignItems: 'flex-end',
 },
 starsContainer: {
   flexDirection: 'row',
   marginBottom: theme.spacing.xs,
 },
 totalReviews: {
   color: colors.secondary.white,
   fontSize: theme.typography.sizes.small,
 },
 filterScroll: {
   marginTop: theme.spacing.md,
 },
 filterButton: {
   backgroundColor: 'rgba(255,255,255,0.2)',
   paddingHorizontal: theme.spacing.lg,
   paddingVertical: theme.spacing.sm,
   borderRadius: theme.borderRadius.round,
   marginRight: theme.spacing.sm,
 },
 filterButtonActive: {
   backgroundColor: colors.secondary.white,
 },
 filterButtonText: {
   color: colors.secondary.white,
   fontSize: theme.typography.sizes.small,
 },
 filterButtonTextActive: {
   color: colors.primary.primary1,
 },
 listContainer: {
   padding: theme.spacing.md,
 },
 reviewCard: {
   backgroundColor: colors.secondary.white,
   borderRadius: theme.borderRadius.md,
   padding: theme.spacing.lg,
   marginBottom: theme.spacing.md,
   elevation: 3,
 },
 reviewHeader: {
   flexDirection: 'row',
   marginBottom: theme.spacing.md,
 },
 userImage: {
   width: 50,
   height: 50,
   borderRadius: 25,
   marginRight: theme.spacing.md,
 },
 userInfo: {
   flex: 1,
 },
 userName: {
   fontSize: theme.typography.sizes.medium,
   fontFamily: theme.typography.fontFamily.bold,
   marginBottom: 2,
 },
 reviewMeta: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 4,
 },
 verifiedBadge: {
   flexDirection: 'row',
   alignItems: 'center',
   marginRight: theme.spacing.md,
 },
 verifiedText: {
   fontSize: 12,
   color: colors.primary.primary2,
   marginLeft: 2,
 },
 locationText: {
   fontSize: 12,
   color: colors.primary.primary2,
 },
 starsRow: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 reviewDate: {
   fontSize: 12,
   color: '#666',
   marginLeft: theme.spacing.sm,
 },
 reviewText: {
   fontSize: theme.typography.sizes.medium,
   lineHeight: 22,
   color: '#333',
   marginBottom: theme.spacing.md,
 },
 imageScroll: {
   marginBottom: theme.spacing.md,
 },
 reviewImage: {
   width: 120,
   height: 120,
   borderRadius: theme.borderRadius.sm,
   marginRight: theme.spacing.sm,
 },
 reviewFooter: {
   flexDirection: 'row',
   justifyContent: 'flex-end',
   borderTopWidth: 1,
   borderTopColor: 'rgba(0,0,0,0.05)',
   paddingTop: theme.spacing.sm,
 },
 helpfulButton: {
   flexDirection: 'row',
   alignItems: 'center',
   padding: theme.spacing.sm,
 },
 helpfulText: {
   marginLeft: theme.spacing.xs,
   fontSize: theme.typography.sizes.small,
   color: colors.primary.primary2,
 },
});

export default ReviewScreen;