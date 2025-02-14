import React, { useState, useRef, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  Dimensions, 
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const OnboardingScreens = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const descriptionOpacity = useRef(new Animated.Value(1)).current;

  const screens = [
    {
      title: 'Explore a World of Options',
      description: 'Browse through a variety of categories to find exactly what you need.',
      content: (
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>Automotive</Text>
              <Image 
                source={require('../../assets/automotive.png')} 
                style={styles.categoryImage} 
              />
              
            </View>
            <View style={styles.categoryBox}>
            <Text style={styles.categoryText}>Electronics</Text>
              <Image 
                source={require('../../assets/electronics.png')} 
                style={styles.categoryImage} 
              />
              
            </View>
          </View>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBox}>
            <Text style={styles.categoryText}>Fashion Style</Text>
              <Image 
                source={require('../../assets/fashion.png')} 
                style={styles.categoryImage} 
              />
              
            </View>
            <View style={styles.categoryBox}>
            <Text style={styles.categoryText}>Health Care</Text>
              <Image 
                source={require('../../assets/health.png')} 
                style={styles.categoryImage} 
              />
              
            </View>
          </View>
        </View>
      )
    },
    {
      title: 'Buy & Sell Everything in',
      titleHighlight: '          3 Simple Steps',
      content: (
        <View style={styles.stepsContainer}>
          <View style={styles.stepsContent}>
            <View style={styles.step}>
              <View style={styles.stepText}>
                <Text style={styles.stepNumber}>Step 1: Pictures</Text>
                <Text style={styles.stepDescription}>
                  Tap the camera icon to capture or upload upto 12 photos of your item.
                </Text>
              </View>
              <Image 
                source={require('../../assets/step1.png')} 
                style={styles.stepImage} 
              />
            </View>

            <View style={styles.step}>
              <View style={styles.stepText}>
                <Text style={styles.stepNumber}>Step 2: Description</Text>
                <Text style={styles.stepDescription}>
                  Write a catchy title, select category, & fill in the required info.
                </Text>
              </View>
              <Image 
                source={require('../../assets/step2.png')} 
                style={styles.stepImage} 
              />
            </View>

            <View style={styles.step}>
              <View style={styles.stepText}>
                <Text style={styles.stepNumber}>Step 3: Post An Ad</Text>
                <Text style={styles.stepDescription}>
                  Share your ad and start connecting with buyers!
                </Text>
              </View>
              <Image 
                source={require('../../assets/step3.png')} 
                style={styles.stepImage} 
              />
            </View>
          </View>
        </View>
      )
    },
    {
      title: 'Your Trust, Our Priority',
      description: 'Experience safe and secure transactions every time.',
      content: (
        <View style={styles.trustContainer}>
          <Image 
            source={require('../../assets/onboarding3.png')} 
            style={styles.shieldImage} 
          />
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('WelcomeScreen')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      )
    }
  ];

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      animateTextOut(() => {
        flatListRef.current.scrollToIndex({ 
          index: currentIndex + 1,
          animated: true 
        });
      });
    }
  };

  const animateTextOut = (callback) => {
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      animateTextIn();
    });
  };

  const animateTextIn = () => {
    titleOpacity.setValue(0);
    descriptionOpacity.setValue(0);
    Animated.stagger(100, [
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderTitle = (title, titleHighlight) => {
    if (titleHighlight) {
      const parts = title.split(titleHighlight);
      return (
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          {parts[0]}
          <Text style={[styles.title, { color: '#2D4495' }]}>{titleHighlight}</Text>
          {parts[1]}
        </Animated.Text>
      );
    }
    return <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>{title}</Animated.Text>;
  };

  const renderOnboardingItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {renderTitle(item.title, item.titleHighlight)}
      <Animated.Text style={[styles.description, { opacity: descriptionOpacity }]}>
        {item.description}
      </Animated.Text>
      <View style={styles.dotsContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? '#2D4495' : '#D0D5DD',
              }
            ]}
          />
        ))}
      </View>
      {item.content}
    </View>
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          animateTextIn();
        }
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={screens}
        renderItem={renderOnboardingItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {currentIndex !== screens.length - 1 && (
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Icon name="chevron-forward" color="#fff" size={24} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#101828',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    color: '#667085',
    textAlign: 'center',
    marginBottom: 16
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  dot: {
    height: 7,
    width: 19,
    borderRadius: 4,
    marginHorizontal: 4
  },
  categoriesContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  categoryBox: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  categoryText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#64748B'
  },
  stepsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  stepImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  stepText: {
    flex: 1,
    marginRight: 16
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    marginBottom: 4
  },
  stepDescription: {
    fontSize: 14,
    color: '#667085'
  },
  trustContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  shieldImage: {
    width: 200,
    height: 200,
    marginBottom: 60,
    resizeMode: 'contain'
  },
  getStartedButton: {
    backgroundColor: '#2D4495',
    paddingVertical: 16,
    marginTop:80,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '90%'
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#2D4495',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default OnboardingScreens;

