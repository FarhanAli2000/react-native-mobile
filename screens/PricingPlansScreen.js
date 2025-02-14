import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme, colors } from './theme';

const PricingPlansScreen = () => {
  const navigation = useNavigation();

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 'Free',
      duration: '30 days',
      features: [
        'Post 2 Ads',
        'Basic Ad Visibility',
        'Standard Support',
        'Regular Search Placement'
      ],
      recommended: false,
      color: colors.secondary.white
    },
    {
      id: 2,
      name: 'Premium',
      price: '$9.99',
      duration: '30 days',
      features: [
        'Post 10 Ads',
        'Featured Ads',
        'Priority Support',
        'Top Search Placement',
        'Detailed Analytics',
        'Ad Refresh Every 3 Days'
      ],
      recommended: true,
      color: colors.primary.primary1
    },
  ];

  const renderPlanCard = (plan) => (
    <View
      key={plan.id}
      style={[
        styles.planCard,
        { backgroundColor: plan.color },
        plan.recommended && styles.recommendedCard
      ]}
    >
      {plan.recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>RECOMMENDED</Text>
        </View>
      )}

      <Text style={[
        styles.planName,
        { color: plan.recommended ? colors.secondary.white : colors.primary.primary1 }
      ]}>{plan.name}</Text>

      <Text style={[
        styles.planPrice,
        { color: plan.recommended ? colors.secondary.white : colors.primary.primary1 }
      ]}>{plan.price}</Text>

      <Text style={[
        styles.planDuration,
        { color: plan.recommended ? colors.secondary.white : '#666' }
      ]}>per {plan.duration}</Text>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <MaterialIcons
              name="check-circle"
              size={20}
              color={plan.recommended ? colors.secondary.white : colors.primary.primary2}
            />
            <Text style={[
              styles.featureText,
              { color: plan.recommended ? colors.secondary.white : '#333' }
            ]}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor: plan.recommended ? colors.secondary.white : colors.primary.primary1,
            borderWidth: plan.recommended ? 0 : 1,
            borderColor: colors.primary.primary1
          }
        ]}
        onPress={()=>navigation.navigate('PaymentGatewayScreen')}
      >
        <Text style={[
          styles.selectButtonText,
          { color: plan.recommended ? colors.primary.primary1 : colors.secondary.white }
        ]}>Select Plan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color={colors.secondary.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pricing Plans</Text>
      </View>

      <ScrollView
        style={styles.plansContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Choose the plan that works for you</Text>
        {plans.map(plan => renderPlanCard(plan))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Choose Premium?</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="visibility" size={24} color={colors.primary.primary2} />
            <Text style={styles.infoText}>Get up to 10x more visibility</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="speed" size={24} color={colors.primary.primary2} />
            <Text style={styles.infoText}>Sell up to 2x faster</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="verified" size={24} color={colors.primary.primary2} />
            <Text style={styles.infoText}>Verified Seller badge</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  header: {
    backgroundColor: colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: 40,
  },
  backButton: {
    marginRight: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.large,
    color: colors.secondary.white,
    fontFamily: theme.typography.fontFamily.bold,
  },
  plansContainer: {
    padding: theme.spacing.lg,
  },
  subtitle: {
    fontSize: theme.typography.sizes.medium,
    color: '#666',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recommendedCard: {
    borderWidth: 0,
    transform: [{ scale: 1.02 }],
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: theme.spacing.xl,
    backgroundColor: colors.secondary.secondary1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },
  recommendedText: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.small,
    fontFamily: theme.typography.fontFamily.bold,
  },
  planName: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  planPrice: {
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.xs,
  },
  planDuration: {
    fontSize: theme.typography.sizes.small,
    marginBottom: theme.spacing.lg,
  },
  featuresContainer: {
    marginBottom: theme.spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.sizes.medium,
  },
  selectButton: {
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
  infoSection: {
    padding: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  infoTitle: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: '#333',
    marginBottom: theme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  infoText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    color: '#666',
  },
});

export default PricingPlansScreen;