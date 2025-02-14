// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreensComponent from './screens/onboarding/OnboardingScreens';
import SplashScreenComponent from './screens/SplashScreen';
import WelcomeScreenComponent from './screens/WelcomeScreen';
import ProfileScreenComponent from './screens/ProfileScreen';
import LoginScreen from './screens/SignIn';
import SignUpScreen from './screens/Signup';
import ForgotPasswordScreen from './screens/ForgotPassword';
import MainDrawerNavigator from './screens/Navigation'; 
import ProfileDetailScreenComponent from './screens/ProfileDetailScreen';
import EditProfileScreenComponent from './screens/EditProfileScreen';
import ChangePasswordScreenComponent from './screens/ChangePasswordScreen';
import ProductsCategory from './screens/ProductCategory';
import FilterScreen from './screens/FilterScreen';
import AdDetailScreen from './screens/AdDetailScreen';
import MyAdds from './screens/MyAdds';
import AddAdds from './screens/AddAdds';
import PreviewAd from './screens/PreviewAd';
import SavedAdsScreen from './screens/SavedAdsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import AnalyticsScreen from './screens/AnalyticScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import FAQsScreen from './screens/FAQsScreen';
import PricingPlansScreen from './screens/PricingPlansScreen';
import PaymentGatewayScreen from './screens/PaymentGatewayScreen';
import ReviewScreen from './screens/ReviewScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import SellerDetailScreen from './screens/SellerDetailScreen';
import VehicleListingScreen from './screens/VehicleListingScreen';
import MoreSections from './screens/MoreSections';
import { StatusBar } from 'expo-status-bar';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import PaymentInstructionsScreen from './screens/PaymentInstructionsScreen';
import AllAdsScreen from './screens/AllAdsScreen';
import AllBlogs from './screens/AllBlogs';
import Test from './screens/Test';
// In your navigation stack

const Stack = createStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreenComponent} />
        <Stack.Screen name="ProfileDetailScreen" component={ProfileDetailScreenComponent} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreenComponent} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreenComponent} />
        <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreenComponent} />
        <Stack.Screen name="Onboarding" component={OnboardingScreensComponent} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={MainDrawerNavigator} />
        <Stack.Screen name="ProductsCategory" component={ProductsCategory} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="AdDetailScreen" component={AdDetailScreen} />
        <Stack.Screen name="MyAdds" component={MyAdds} />
        <Stack.Screen name="AddAdds" component={AddAdds} />
        <Stack.Screen name="PreviewAd" component={PreviewAd} />
        <Stack.Screen name="SavedAdsScreen" component={SavedAdsScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
        <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="FAQsScreen" component={FAQsScreen} />
        <Stack.Screen name="MoreSections" component={MoreSections} />
        <Stack.Screen name="PricingPlansScreen" component={PricingPlansScreen} />
        <Stack.Screen name="PaymentGatewayScreen" component={PaymentGatewayScreen} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
        <Stack.Screen name="SellerDetailScreen" component={SellerDetailScreen} />
        <Stack.Screen name="VehicleListingScreen" component={VehicleListingScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="PaymentInstructionsScreen" component={PaymentInstructionsScreen} />
        <Stack.Screen name="AllAdsScreen" component={AllAdsScreen} />
        <Stack.Screen name="AllBlogs" component={AllBlogs} />
        <Stack.Screen name="Test" component={Test} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}










