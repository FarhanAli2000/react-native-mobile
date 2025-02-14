import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const NotificationsScreen = ({ navigation }) => {
  // Sample notification data - replace with your actual data source
  const [notifications] = useState([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'You have received a message about your KIA Sportage listing',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'offer',
      title: 'Price Update',
      message: 'Someone made an offer on your Honda Civic',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'system',
      title: 'Account Security',
      message: 'Please verify your email address',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'advertisement',
      title: 'Special Offer',
      message: 'Promote your ad for 50% off this weekend!',
      time: '2 days ago',
      read: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return 'chatbox';
      case 'offer':
        return 'pricetag';
      case 'system':
        return 'alert-circle';
      case 'advertisement':
        return 'megaphone';
      default:
        return 'notifications';
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color={theme.colors.primary.primary1}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.primary.primary1}
      />
    </TouchableOpacity>
  );

  const handleNotificationPress = (notification) => {
    // Handle notification press based on type
    switch (notification.type) {
      case 'message':
        // Navigate to messages
        break;
      case 'offer':
        // Navigate to offers
        break;
      case 'advertisement':
        // Navigate to ad details
        break;
      default:
        // Handle other notification types
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={theme.colors.secondary.white}
          />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off"
              size={48}
              color={theme.colors.primary.primary1}
            />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
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
    justifyContent: 'space-between',
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
  listContainer: {
    padding: theme.spacing.md,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.background.dark,
  },
  unreadNotification: {
    backgroundColor: '#F0F8FF',
    borderColor: theme.colors.primary.primary1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: `${theme.colors.primary.primary1}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  notificationContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  notificationTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  notificationMessage: {
    fontSize: theme.typography.sizes.small,
    color: theme.colors.secondary.black,
    marginBottom: theme.spacing.xs,
  },
  notificationTime: {
    fontSize: theme.typography.sizes.small,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.medium,
    color: theme.colors.secondary.black,
    fontFamily: theme.typography.fontFamily.regular,
  },
});

export default NotificationsScreen;