import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'What is your best price?',
      timestamp: '2:30 PM',
      unread: 2,
      avatar: null,
      productInfo: {
        id: 'p1',
        title: 'Toyota Corolla 2020',
        price: 'Rs. 3,500,000',
        image: null,
        status: 'active'
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Location?',
      timestamp: '1:45 PM',
      unread: 0,
      avatar: null,
      productInfo: {
        id: 'p2',
        title: 'Honda Civic 2019',
        price: 'Rs. 3,200,000',
        image: null,
        status: 'sold'
      }
    },
  ]);

  const filterChats = (query) => {
    // You could filter by product title or user name
    return chats.filter(chat =>
      chat.name.toLowerCase().includes(query.toLowerCase()) ||
      chat.productInfo.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', {
        chatId: item.id,
        name: item.name,
        productInfo: item.productInfo
      })}
    >
      <View style={styles.chatContent}>
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.defaultAvatar]}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>

          <Text style={styles.productTitle} numberOfLines={1}>
            {item.productInfo.title}
          </Text>

          <View style={styles.messageContainer}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.productPreview}>
        <Image
          source={item.productInfo.image || require('../assets/car1.jpeg')}
          style={styles.productImage}
        />
        <Text style={styles.productPrice}>{item.productInfo.price}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.productInfo.status === 'sold' ? '#FF4444' : '#4CAF50' }
        ]}>
          <Text style={styles.statusText}>
            {item.productInfo.status === 'sold' ? 'Sold' : 'Active'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary.primary1} />
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondary.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => {/* Handle filter/sort */}}>
          <Icon name="filter-variant" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filterChats(searchQuery)}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    paddingTop: 40,
    paddingBottom:10,
    paddingHorizontal:10,
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16
  },
  listContainer: {
    padding: 10
  },
  chatItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  chatContent: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: 15
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    backgroundColor: theme.colors.primary.primary1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  timestamp: {
    fontSize: 12,
    color: '#666'
  },
  productTitle: {
    fontSize: 14,
    color: theme.colors.primary.primary1,
    marginBottom: 5
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary.primary1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  productPreview: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 5
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default ChatListScreen;