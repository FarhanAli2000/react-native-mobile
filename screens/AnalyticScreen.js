import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = ({ navigation }) => {
  const dummyData = {
    ads: {
      totalAds: 150,
      canceledAds: 20,
      adViews: 5000,
      sales: 3000,
    },
    salesData: {
      week: [200, 300, 250, 400, 450, 500, 600],
      month: [2000, 2500, 2700, 2900, 3200, 3300, 3500, 3700, 4000, 4500, 4700, 4900],
      year: [15000, 17000, 19000, 21000, 23000, 25000, 28000, 30000, 32000, 34000, 36000, 38000],
    },
    adViewsData: {
      week: [150, 200, 180, 210, 230, 250, 300],
      month: [1200, 1500, 1600, 1700, 1800, 1900, 2000, 2200, 2300, 2500, 2700, 2900],
      year: [10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000],
    },
    dates: [
      "2024-12-01", "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05",
      "2024-12-06", "2024-12-07", "2024-12-08", "2024-12-09", "2024-12-10"
    ]
  };

  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [salesData, setSalesData] = useState(dummyData.salesData.week);
  const [adViewsData, setAdViewsData] = useState(dummyData.adViewsData.week);

  useEffect(() => {
    setSalesData(dummyData.salesData[selectedPeriod]);
    setAdViewsData(dummyData.adViewsData[selectedPeriod]);
  }, [selectedPeriod]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={theme.colors.primary.primary1}
        barStyle="light-content"
      />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondary.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Seller Analytics Overview</Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Ads</Text>
            <Text style={styles.cardValue}>{dummyData.ads.totalAds}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Canceled Ads</Text>
            <Text style={styles.cardValue}>{dummyData.ads.canceledAds}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ad Views</Text>
            <Text style={styles.cardValue}>{dummyData.ads.adViews}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Sales</Text>
            <Text style={styles.cardValue}>${dummyData.ads.sales}</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Select Sales Period</Text>
        <Picker
          selectedValue={selectedPeriod}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
        >
          <Picker.Item label="This Week" value="week" />
          <Picker.Item label="This Month" value="month" />
          <Picker.Item label="This Year" value="year" />
        </Picker>

        <Text style={styles.subTitle}>Sales Data</Text>
        <LineChart
          data={{
            labels: dummyData.dates.slice(0, salesData.length),
            datasets: [
              {
                data: salesData,
              },
            ],
          }}
          width={screenWidth - 32}
          height={180}
          yAxisLabel="$"
          yAxisSuffix=" sales"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
            propsForLabels: {
              fontSize: 5,
            },
          }}
          bezier
        />

        <Text style={styles.subTitle}>Ad Views Data</Text>
        <LineChart
          data={{
            labels: dummyData.dates.slice(0, adViewsData.length),
            datasets: [
              {
                data: adViewsData,
              },
            ],
          }}
          width={screenWidth - 32}
          height={180}
          yAxisLabel=""
          yAxisSuffix=" views"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
            propsForLabels: {
              fontSize: 5,
            },
          }}
          bezier
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  header: {
    backgroundColor: theme.colors.primary.primary1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 40,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: theme.colors.secondary.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2a44',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: '45%',
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#34495e',
  },
  picker: {
    height: 50,
    width: screenWidth - 32,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
  bottomSpacing: {
    height: 50,
  },
});

export default AnalyticsScreen;
