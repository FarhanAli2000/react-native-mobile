import React, { useEffect } from "react";
// import { db } from "./../../Firebase/FirebaseConfig.jsx";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Text, View } from "react-native";

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the 'Electronic' collection
        const listingsCollection = collection(db, "carData");

        // Fetch documents from the collection
        const querySnapshot = await getDocs(listingsCollection);

        // Extract and log data
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(), // Document data
        }));

        console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <View>
      <Text>Test Component</Text>
      <Text>Check the console for fetched data.</Text>
    </View>
  );
};

export default Test;
