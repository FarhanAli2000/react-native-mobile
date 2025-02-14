// hooks/useStatusBarColor.js
import { useEffect, useCallback } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export const useStatusBarColor = (backgroundColor, barStyle = 'default') => {
  const isFocused = useIsFocused();

  const updateStatusBar = useCallback(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor(backgroundColor, true); 
    }
    StatusBar.setBarStyle(barStyle, true); 
  }, [backgroundColor, barStyle]);

  useEffect(() => {
    if (isFocused) {
      updateStatusBar();
    }
  }, [isFocused, updateStatusBar]);

  // Handle screen focus specifically
  useFocusEffect(
    useCallback(() => {
      updateStatusBar();
      
      return () => {
       
      };
    }, [updateStatusBar])
  );
};