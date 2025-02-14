import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme, colors } from './theme';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Mock transaction data
  const transactions = [
    {
      id: '1',
      type: 'subscription',
      plan: 'Premium Plan',
      amount: 9.99,
      status: 'completed',
      date: '2024-12-25',
      paymentMethod: 'Visa ***1234',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      type: 'feature',
      plan: 'Featured Ad',
      amount: 4.99,
      status: 'completed',
      date: '2024-12-20',
      paymentMethod: 'JazzCash',
      transactionId: 'TXN123456788'
    },
    {
      id: '3',
      type: 'subscription',
      plan: 'Business Plan',
      amount: 24.99,
      status: 'failed',
      date: '2024-12-15',
      paymentMethod: 'Mastercard ***5678',
      transactionId: 'TXN123456787'
    },
    {
      id: '4',
      type: 'feature',
      plan: 'Highlight Ad',
      amount: 2.99,
      status: 'pending',
      date: '2024-12-10',
      paymentMethod: 'Easypaisa',
      transactionId: 'TXN123456786'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return colors.primary.primary2;
      case 'pending':
        return colors.secondary.secondary1;
      case 'failed':
        return '#FF4444';
      default:
        return '#666';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'subscription':
        return 'card-membership';
      case 'feature':
        return 'star';
      default:
        return 'receipt';
    }
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={() => showTransactionDetails(item)}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={getTransactionIcon(item.type)}
          size={24}
          color={colors.primary.primary1}
        />
      </View>

      <View style={styles.transactionInfo}>
        <View style={styles.transactionHeader}>
          <Text style={styles.planName}>{item.plan}</Text>
          <Text style={styles.amount}>${item.amount}</Text>
        </View>

        <View style={styles.transactionMeta}>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.paymentMethod}>
          <MaterialIcons name="payment" size={16} color="#666" />
          <Text style={styles.paymentMethodText}>{item.paymentMethod}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const showTransactionDetails = (transaction) => {
    // Add navigation to detailed view or show modal with transaction details
    console.log('Show transaction details:', transaction);
  };

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Transaction Type</Text>
            {['all', 'subscription', 'feature'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterOption,
                  selectedFilter === filter && styles.selectedFilter
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedFilter === filter && styles.selectedFilterText
                ]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
                {selectedFilter === filter && (
                  <MaterialIcons name="check" size={20} color={colors.primary.primary1} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Sort By</Text>
            {['newest', 'oldest', 'highest', 'lowest'].map((sort) => (
              <TouchableOpacity
                key={sort}
                style={[
                  styles.filterOption,
                  selectedSort === sort && styles.selectedFilter
                ]}
                onPress={() => setSelectedSort(sort)}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedSort === sort && styles.selectedFilterText
                ]}>
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </Text>
                {selectedSort === sort && (
                  <MaterialIcons name="check" size={20} color={colors.primary.primary1} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.filterButton}
        >
          <MaterialIcons name="filter-list" size={24} color={colors.secondary.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>$42.96</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Transactions</Text>
          <Text style={styles.summaryValue}>4</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.transactionList}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal />
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
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: 40,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.sizes.large,
    color: colors.secondary.white,
    fontFamily: theme.typography.fontFamily.bold,
  },
  filterButton: {
    padding: theme.spacing.sm,
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: colors.secondary.white,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: theme.spacing.lg,
  },
  summaryLabel: {
    fontSize: theme.typography.sizes.small,
    color: '#666',
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
    color: colors.primary.primary1,
  },
  transactionList: {
    padding: theme.spacing.md,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: colors.secondary.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.primary1 + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  planName: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    color: '#333',
  },
  amount: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    color: colors.primary.primary1,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.typography.sizes.small,
    color: '#666',
    marginRight: theme.spacing.md,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.round,
  },
  statusText: {
    fontSize: theme.typography.sizes.small,
    fontFamily: theme.typography.fontFamily.bold,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: theme.typography.sizes.small,
    color: '#666',
    marginLeft: theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.secondary.white,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.large,
    fontFamily: theme.typography.fontFamily.bold,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  filterSection: {
    marginBottom: theme.spacing.xl,
  },
  filterTitle: {
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
    marginBottom: theme.spacing.md,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  selectedFilter: {
    backgroundColor: colors.primary.primary1 + '10',
  },
  filterOptionText: {
    fontSize: theme.typography.sizes.medium,
    color: '#333',
  },
  selectedFilterText: {
    color: colors.primary.primary1,
    fontFamily: theme.typography.fontFamily.bold,
  },
  applyButton: {
    backgroundColor: colors.primary.primary1,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
  },
  applyButtonText: {
    color: colors.secondary.white,
    fontSize: theme.typography.sizes.medium,
    fontFamily: theme.typography.fontFamily.bold,
  },
});

export default TransactionHistoryScreen;