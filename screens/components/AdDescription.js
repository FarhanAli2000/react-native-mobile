import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

const Description = () => {
  const descriptionText = [
    "Lorem ipsum dolor sit amet consectetur. Volutpat sociis in arcu enim sed netus a porta malesuada. Sodales praesent mauris mi sit. Aenean sagittis quam viverra et mauris. Non faucibus ultricies nec a.",
    "Lorem ipsum dolor sit amet consectetur. Volutpat sociis in arcu enim sed netus a porta malesuada. Sodales praesent mauris mi sit. Aenean sagittis quam viverra et mauris. Non faucibus ultricies nec a.",
    "Lorem ipsum dolor sit amet consectetur. Volutpat sociis in arcu enim sed netus a porta malesuada. Sodales praesent mauris mi sit. Aenean sagittis quam viverra et mauris. Non faucibus ultricies nec a.",
    "Lorem ipsum dolor sit amet consectetur. Volutpat sociis in arcu enim sed netus a porta malesuada. Sodales praesent mauris mi sit. Aenean sagittis quam viverra et mauris. Non faucibus ultricies nec a.",
    "Lorem ipsum dolor sit amet consectetur. Volutpat sociis in arcu enim sed netus a porta malesuada. Sodales praesent mauris mi sit. Aenean sagittis quam viverra et mauris. Non faucibus ultricies nec a."
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description:</Text>
      {descriptionText.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.secondary.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.dark,
  },
  title: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.md,
  },
  paragraph: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
});

export default Description;