import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const FAQsScreen = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const faqSections = [
    {
      title: 'Buying Guidelines',
      faqs: [
        {
          question: 'How do I buy a vehicle on the platform?',
          answer: 'Browse listings, contact the seller, negotiate the price, and complete the transaction securely through our platform. Always verify the vehicle details and meet in a safe location.'
        },
        {
          question: 'What should I check before purchasing a vehicle?',
          answer: 'Inspect the vehicle\'s condition, check maintenance history, verify documentation, test drive if possible, and get a professional inspection. Always ask the seller for complete vehicle history.'
        },
        {
          question: 'Are the prices negotiable?',
          answer: 'Prices are set by individual sellers. Most listings allow room for negotiation. Always communicate respectfully and be prepared to discuss pricing details directly with the seller.'
        },
        {
          question: 'How can I verify the vehicle\'s condition?',
          answer: 'Request a detailed inspection report, ask for service history, check for any accidents or major repairs, and consider getting an independent mechanical inspection before finalizing the purchase.'
        }
      ]
    },
    {
      title: 'Selling Guidelines',
      faqs: [
        {
          question: 'How can I list my vehicle for sale?',
          answer: 'Create an account, go to "Add Listing", provide detailed vehicle information, upload clear photos, set a competitive price, and publish your ad.'
        },
        {
          question: 'What documents do I need to sell my vehicle?',
          answer: 'You\'ll need the original registration card, ownership transfer documents, and a valid MVRC (Motor Vehicle Registration Certificate). Ensure all paperwork is up to date.'
        },
        {
          question: 'How long will my listing remain active?',
          answer: 'Listings typically remain active for 30 days. You can renew or edit your listing at any time from your profile dashboard.'
        },
        {
          question: 'How do I price my vehicle competitively?',
          answer: 'Research similar models, consider the vehicle\'s age, mileage, condition, and current market trends. Use our price estimation tool to get a fair market value.'
        }
      ]
    },
    {
      title: 'Safety & Security',
      faqs: [
        {
          question: 'How do you ensure user safety?',
          answer: 'We provide verified user profiles, secure messaging, and recommend meeting in public places. Always verify the seller\'s identity and never share personal financial information.'
        },
        {
          question: 'What if I encounter a fraudulent listing?',
          answer: 'Report the listing immediately through our platform. Provide detailed information and our support team will investigate and take appropriate action.'
        },
        {
          question: 'Are my personal details secure?',
          answer: 'We use advanced encryption and follow strict data protection guidelines. Your personal information is never shared without your consent.'
        },
        {
          question: 'How can I avoid scams?',
          answer: 'Never send money before seeing the vehicle, use our secure platform for communication, meet in public places, and be wary of deals that seem too good to be true.'
        }
      ]
    },
    {
      title: 'Payment & Transactions',
      faqs: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We support bank transfer, cash, and secure online payment methods. Always use our platform\'s recommended payment channels for added security.'
        },
        {
          question: 'How do I handle the ownership transfer?',
          answer: 'Complete the ownership transfer through official channels. Ensure all necessary documentation is signed and filed with local transportation authorities.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'We are transparent about our fees. Listing is free for basic accounts. Premium features may have additional charges. Check our pricing page for detailed information.'
        },
        {
          question: 'What if the vehicle doesn\'t match the description?',
          answer: 'If the vehicle differs significantly from the listing, contact our support team immediately. We can help mediate disputes and provide buyer protection.'
        }
      ]
    },
    {
      title: 'Account & Profile',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up", provide your email or phone number, create a strong password, and verify your account through the confirmation link or OTP.'
        },
        {
          question: 'Can I edit my profile?',
          answer: 'Yes, go to "Profile Settings" to update your personal information, profile picture, contact details, and preferences.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login screen, enter your registered email or phone number, and follow the password reset instructions.'
        },
        {
          question: 'What information is visible to other users?',
          answer: 'Only your display name and verified information is visible. Personal contact details are only shared after mutual consent through our secure messaging system.'
        }
      ]
    }
  ];

  const toggleSection = (sectionIndex) => {
    setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex);
  };

  const renderFAQSection = (section, sectionIndex) => (
    <View key={sectionIndex} style={styles.sectionContainer}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(sectionIndex)}
      >
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Ionicons
          name={expandedSection === sectionIndex ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.primary.primary1}
        />
      </TouchableOpacity>

      {expandedSection === sectionIndex && (
        <View style={styles.faqList}>
          {section.faqs.map((faq, faqIndex) => (
            <View key={faqIndex} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary.primary1}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.secondary.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {faqSections.map(renderFAQSection)}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still Have Questions?</Text>
          <Text style={styles.contactSubtitle}>
            Our support team is always ready to help you
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate('ContactUsScreen')}
          >
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary.white,
  },
  header: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  headerButton: {
    padding: theme.spacing.xs,
  },
  headerTitle: {
    flex: 1,
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    marginHorizontal: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  sectionContainer: {
    backgroundColor: theme.colors.secondary.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.dark,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary.primary1,
  },
  faqList: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  faqItem: {
    marginBottom: theme.spacing.md,
  },
  faqQuestion: {
    fontSize: theme.typography.sizes.large,
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.sm,
  },
  faqAnswer: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: theme.colors.background.light,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary.primary1,
    marginBottom: theme.spacing.sm,
  },
  contactSubtitle: {
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: theme.colors.primary.primary1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  contactButtonText: {
    color: theme.colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default FAQsScreen;