// components/LatestNewsSection.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

const NewsItem = ({ image, title, date }) => (
  <TouchableOpacity style={styles.newsItemContainer}>
    <Image
      source={image}
      style={styles.newsImage}
      resizeMode="cover"
    />
    <View style={styles.newsContent}>
      <Text style={styles.newsTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.newsDate}>{date}</Text>
    </View>
  </TouchableOpacity>
);

const LatestNewsSection = () => {
  const newsData = [
    {
      id: 1,
      image: require('../../assets/advertisement.jpeg'),
      title: 'Images - Hyundai Tucson Black Interior & New Exterior Colours',
      date: 'December 5, 2024 4:08 PM',
    },
    {
      id: 2,
      image: require('../../assets/advertisement.jpeg'),
      title: 'First Locally Assembled Seres 3 EV Rolled Out - Price, Specs and Photos',
      date: 'November 30, 2024 5:48 PM',
    },
    {
      id: 3,
      image: require('../../assets/advertisement.jpeg'),
      title: "Pakistan's First Locally Assembled E-SUV Seres 3 - Photos, Unveiling & Specs",
      date: 'November 27, 2024 3:54 PM',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Latest News</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newsList}>
        {newsData.map((news) => (
          <NewsItem
            key={news.id}
            image={news.image}
            title={news.title}
            date={news.date}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.primary.primary1,
    margin: 15,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 16,
    color: '#fff', 
  },
  newsList: {
    gap: 16,
  },
  newsItemContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  newsImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 14,
    color: '#fff', 
  },
});

export default LatestNewsSection;