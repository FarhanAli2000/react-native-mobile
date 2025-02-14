import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Play as PlayIcon } from "lucide-react-native"; // Fixed import

const styles = {
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  exploreButton: {
    backgroundColor: '#2D4495',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  exploreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  blogCard: {
    width: '47%', // Adjusted for better spacing on mobile
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  largeCard: {
    width: '100%',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 16/9,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 12,
  },
};

const PlayButton = () => (
  <View style={styles.playButtonContainer}>
    <PlayIcon size={20} color="#000000" strokeWidth={2} />
  </View>
);

const BlogCard = ({ blog }) => (
  <TouchableOpacity 
    style={[styles.blogCard, blog.isLarge && styles.largeCard]}
  >
    <View style={styles.imageContainer}>
      <Image 
        source={blog.thumbnail}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <PlayButton />
    </View>
    <Text style={styles.blogTitle} numberOfLines={2}>
      {blog.title}
    </Text>
  </TouchableOpacity>
);

const BlogSection = ({ onExplorePress }) => {
  const blogs = [
    {
      id: 1,
      title: 'The Best Spa Saloons for your relaxation!',
      thumbnail: require('../../assets/blogs1.png'), // Update with your image path
      isLarge: true,
    },
    {
      id: 2,
      title: 'Three Powerful Tricks...',
      thumbnail: require('../../assets/blogs2.png'), // Update with your image path
    },
    {
      id: 3,
      title: 'Competitive Analysis....',
      thumbnail: require('../../assets/blogs2.png'), // Update with your image path
    },
    {
      id: 4,
      title: 'Three Powerful Tricks...',
      thumbnail: require('../../assets/blogs3.png'), // Update with your image path
    },
    {
      id: 5,
      title: 'Competitive Analysis....',
      thumbnail: require('../../assets/blogs3.png'), // Update with your image path
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest Blogs</Text>
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={onExplorePress}
        >
          <Text style={styles.exploreText}>Explore Blogs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        {blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </View>
    </View>
  );
};

export default BlogSection;