import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

const SafetyTips = () => {
  const tips = [
    'Meet seller at safe place.',
    'Check item before you buy.',
    'Pay only after collecting item.',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Tips</Text>
      {tips.map((tip, index) => (
        <View key={index} style={styles.tipContainer}>
          <View style={styles.bullet} />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}
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
  title: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.md,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary.primary1,
    marginRight: theme.spacing.md,
  },
  tipText: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
  },
});

export default SafetyTips;