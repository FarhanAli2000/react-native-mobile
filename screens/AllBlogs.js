import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import { Play as PlayIcon } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, theme } from './theme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const blogs = [
    {
        id: 1,
        title: 'The Best Spa Saloons for your relaxation!',
        thumbnail: require('../assets/blogs1.png'), // Update with your image path
    },
    {
        id: 2,
        title: 'Three Powerful Tricks...',
        thumbnail: require('../assets/blogs2.png'), // Update with your image path
    },
    {
        id: 3,
        title: 'Competitive Analysis....',
        thumbnail: require('../assets/blogs2.png'), // Update with your image path
    },
    {
        id: 4,
        title: 'Three Powerful Tricks...',
        thumbnail: require('../assets/blogs3.png'), // Update with your image path
    },
    {
        id: 5,
        title: 'Competitive Analysis....',
        thumbnail: require('../assets/blogs3.png'), // Update with your image path
    },
];

const PlayButton = () => (
    <View style={styles.playButtonContainer}>
        <PlayIcon size={20} color="#000000" strokeWidth={2} />
    </View>
);

const BlogItem = ({ blog }) => (
    <TouchableOpacity style={styles.blogCard}>
        <View style={styles.imageContainer}>
            <Image source={blog.thumbnail} style={styles.thumbnail} resizeMode="cover" />
            <PlayButton />
        </View>
        <Text style={styles.blogTitle} numberOfLines={2}>
            {blog.title}
        </Text>
    </TouchableOpacity>
);

const AllBlogs = () => {
    const renderBlogItem = ({ item }) => <BlogItem blog={item} />;
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <AntDesign name="left" size={24} color={colors.secondary.white} />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#000"
                          />
                        </View>
                {/* <Text style={styles.headerTitle}>All Blogs</Text> */}
            </View>
            <View style={styles.content}>
            {/* <Text style={styles.headerText}>All Blogs</Text> */}
            <FlatList
                data={blogs}
                renderItem={renderBlogItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // padding: 16,
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
    searchContainer: {
        flex: 1,
      },
      searchInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#000',
      },
    headerTitle: {
        fontSize: theme.typography.sizes.large,
        color: colors.secondary.white,
        fontFamily: theme.typography.fontFamily.bold,
        paddingLeft: '15%'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 16,
        fontFamily: 'Inter',
    },
    content:{
        padding:16,
        marginBottom:"15%"
    },
    listContainer: {
        paddingBottom: 16,
    },
    blogCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        position: 'relative',
        aspectRatio: 16 / 9,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
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
        margin: 12,
        fontFamily: 'Inter',
    },
});

export default AllBlogs;
