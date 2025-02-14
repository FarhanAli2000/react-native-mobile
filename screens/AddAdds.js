import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Button, Switch, RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { theme } from './theme';

const AddAdds = () => {
  // Initialize navigation
  const navigation = useNavigation();

  // State variables for form fields
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [allowWhatsAppContact, setAllowWhatsAppContact] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState(''); 
  const [subCategory, setSubCategory] = useState(''); 

  // Function to pick multiple images
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  // Remove image function
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // Form validation function
  const validateForm = () => {
    // Comprehensive form validation
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return false;
    }
    if (!purpose) {
      Alert.alert('Validation Error', 'Please select a purpose');
      return false;
    }
    if (!location) {
      Alert.alert('Validation Error', 'Please select a location');
      return false;
    }
    if (!city) {
      Alert.alert('Validation Error', 'Please select a city');
      return false;
    }
    if (!category) {
      Alert.alert('Validation Error', 'Please select a category');
      return false;
    }
    if (!subCategory) {
      Alert.alert('Validation Error', 'Please select a subcategory');
      return false;
    }
    if (!price.trim()) {
      Alert.alert('Validation Error', 'Please enter a price');
      return false;
    }
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    if (!mobileNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter your mobile number');
      return false;
    }
    if (images.length === 0) {
      Alert.alert('Validation Error', 'Please add at least one image');
      return false;
    }
    return true;
  };

  // Preview button handler
  const handlePreview = () => {
    if (validateForm()) {
      // Prepare ad details to pass to preview screen
      const adDetails = {
        images,
        title,
        description,
        price,
        name,
        email,
        mobileNumber,
        allowWhatsAppContact,
        purpose,
        location,
        city,
        category,
        subCategory
      };

      // Navigate to Preview Screen
      navigation.navigate('PreviewAd', { adDetails });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Appbar.Header style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <AntDesign name="left" size={24} color="#fff" />
                </TouchableOpacity>
        <Appbar.Content title="Post Your Ad" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image Picker Section */}
        <View style={styles.imagePickerWrapper}>
          <View style={styles.imagePickerContainer}>
            {images.length === 0 ? (
              <TouchableOpacity style={styles.imageBox} onPress={pickImages}>
                <View style={styles.imageBoxContent}>
                  <AntDesign name="camera" size={40} color="#2D4495" />
                  <Text style={styles.addImageText}>Add Photos</Text>
                  <Text style={styles.imageLimit}>(Maximum 5 photos)</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.selectedImagesContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageScroll}
                >
                  {images.map((uri, index) => (
                    <View key={index} style={styles.imageContainer}>
                      <Image source={{ uri }} style={styles.largeImage} />
                      <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <AntDesign name="closecircle" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {images.length < 5 && (
                    <TouchableOpacity
                      style={styles.addMoreImages}
                      onPress={pickImages}
                    >
                      <AntDesign name="plus" size={30} color="#2D4495" />
                      <Text style={styles.addMoreText}>Add More</Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>AD Details</Text>

          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            theme={{ colors: { primary: '#2D4495' } }}
          />

          <TextInput
            label="Description"
            mode="outlined"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.input}
            theme={{ colors: { primary: '#2D4495' } }}
          />

<Text style={styles.sectionTitle}>Purpose</Text>
<View style={styles.pickerContainer}>
  <Picker
    selectedValue={purpose}
    onValueChange={setPurpose}
    style={styles.picker}
  >
    <Picker.Item label="Select Purpose" value="" />
    <Picker.Item label="For Sale" value="for_sale" />
    <Picker.Item label="Wanted" value="wanted" />
    <Picker.Item label="Exchange" value="exchange" />
    <Picker.Item label="Services" value="services" />
  </Picker>
</View>

<Text style={styles.sectionTitle}>Location</Text>
<View style={styles.pickerContainer}>
  <Picker
    selectedValue={location}
    onValueChange={(itemValue) => setLocation(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Select Country" value="" />
    <Picker.Item label="Saudi Arabia" value="saudi_arabia" />
    <Picker.Item label="Pakistan" value="pakistan" />
    <Picker.Item label="UAE" value="uae" />
  </Picker>
</View>

<View style={styles.pickerContainer}>
  <Picker
    selectedValue={city}
    onValueChange={(itemValue) => setCity(itemValue)}
    style={styles.picker}
  >
    <Picker.Item label="Select City" value="" />
    <Picker.Item label="Islamabad" value="islamabad" />
    <Picker.Item label="Lahore" value="lahore" />
    <Picker.Item label="Karachi" value="karachi" />
  </Picker>
  </View>

<Text style={styles.sectionTitle}>Categories</Text>
<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false} 
  style={styles.categoryScroll}
>
  <RadioButton.Group onValueChange={setCategory} value={category}>
    <View style={styles.radioRow}>
      <TouchableOpacity 
        style={[styles.radioItem, category === 'electronics' && styles.radioItemSelected]} 
        onPress={() => setCategory('electronics')}
      >
        <RadioButton.Android value="electronics" color="#2D4495" />
        <Text style={styles.radioLabel}>Electronics</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.radioItem, category === 'vehicles' && styles.radioItemSelected]} 
        onPress={() => setCategory('vehicles')}
      >
        <RadioButton.Android value="vehicles" color="#2D4495" />
        <Text style={styles.radioLabel}>Vehicles</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.radioItem, category === 'furniture' && styles.radioItemSelected]} 
        onPress={() => setCategory('furniture')}
      >
        <RadioButton.Android value="furniture" color="#2D4495" />
        <Text style={styles.radioLabel}>Furniture</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.radioItem, category === 'clothing' && styles.radioItemSelected]} 
        onPress={() => setCategory('clothing')}
      >
        <RadioButton.Android value="clothing" color="#2D4495" />
        <Text style={styles.radioLabel}>Clothing</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.radioItem, category === 'property' && styles.radioItemSelected]} 
        onPress={() => setCategory('property')}
      >
        <RadioButton.Android value="property" color="#2D4495" />
        <Text style={styles.radioLabel}>Property</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.radioItem, category === 'services' && styles.radioItemSelected]} 
        onPress={() => setCategory('services')}
      >
        <RadioButton.Android value="services" color="#2D4495" />
        <Text style={styles.radioLabel}>Services</Text>
      </TouchableOpacity>
    </View>
  </RadioButton.Group>
</ScrollView>

{/* Subcategories Section */}
<Text style={styles.sectionTitle}>Sub Categories</Text>
<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false} 
  style={styles.categoryScroll}
>
  <RadioButton.Group onValueChange={setSubCategory} value={subCategory}>
    <View style={styles.radioRow}>
      {category === 'electronics' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'phones' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('phones')}
          >
            <RadioButton.Android value="phones" color="#2D4495" />
            <Text style={styles.radioLabel}>Phones</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'laptops' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('laptops')}
          >
            <RadioButton.Android value="laptops" color="#2D4495" />
            <Text style={styles.radioLabel}>Laptops</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'tablets' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('tablets')}
          >
            <RadioButton.Android value="tablets" color="#2D4495" />
            <Text style={styles.radioLabel}>Tablets</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'accessories' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('accessories')}
          >
            <RadioButton.Android value="accessories" color="#2D4495" />
            <Text style={styles.radioLabel}>Accessories</Text>
          </TouchableOpacity>
        </>
      )}

      {category === 'vehicles' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'cars' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('cars')}
          >
            <RadioButton.Android value="cars" color="#2D4495" />
            <Text style={styles.radioLabel}>Cars</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'bikes' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('bikes')}
          >
            <RadioButton.Android value="bikes" color="#2D4495" />
            <Text style={styles.radioLabel}>Bikes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'trucks' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('trucks')}
          >
            <RadioButton.Android value="trucks" color="#2D4495" />
            <Text style={styles.radioLabel}>Trucks</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'spare_parts' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('spare_parts')}
          >
            <RadioButton.Android value="spare_parts" color="#2D4495" />
            <Text style={styles.radioLabel}>Spare Parts</Text>
          </TouchableOpacity>
        </>
      )}

      {category === 'furniture' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'sofa' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('sofa')}
          >
            <RadioButton.Android value="sofa" color="#2D4495" />
            <Text style={styles.radioLabel}>Sofa Sets</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'beds' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('beds')}
          >
            <RadioButton.Android value="beds" color="#2D4495" />
            <Text style={styles.radioLabel}>Beds</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'tables' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('tables')}
          >
            <RadioButton.Android value="tables" color="#2D4495" />
            <Text style={styles.radioLabel}>Tables</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'chairs' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('chairs')}
          >
            <RadioButton.Android value="chairs" color="#2D4495" />
            <Text style={styles.radioLabel}>Chairs</Text>
          </TouchableOpacity>
        </>
      )}

      {category === 'clothing' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'mens' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('mens')}
          >
            <RadioButton.Android value="mens" color="#2D4495" />
            <Text style={styles.radioLabel}>Men's Wear</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'womens' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('womens')}
          >
            <RadioButton.Android value="womens" color="#2D4495" />
            <Text style={styles.radioLabel}>Women's Wear</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'kids' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('kids')}
          >
            <RadioButton.Android value="kids" color="#2D4495" />
            <Text style={styles.radioLabel}>Kids Wear</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'accessories' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('accessories')}
          >
            <RadioButton.Android value="accessories" color="#2D4495" />
            <Text style={styles.radioLabel}>Accessories</Text>
          </TouchableOpacity>
        </>
      )}

      {category === 'property' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'houses' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('houses')}
          >
            <RadioButton.Android value="houses" color="#2D4495" />
            <Text style={styles.radioLabel}>Houses</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'apartments' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('apartments')}
          >
            <RadioButton.Android value="apartments" color="#2D4495" />
            <Text style={styles.radioLabel}>Apartments</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'plots' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('plots')}
          >
            <RadioButton.Android value="plots" color="#2D4495" />
            <Text style={styles.radioLabel}>Plots</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'commercial' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('commercial')}
          >
            <RadioButton.Android value="commercial" color="#2D4495" />
            <Text style={styles.radioLabel}>Commercial</Text>
          </TouchableOpacity>
        </>
      )}

      {category === 'services' && (
        <>
          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'education' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('education')}
          >
            <RadioButton.Android value="education" color="#2D4495" />
            <Text style={styles.radioLabel}>Education</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'electronics_repair' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('electronics_repair')}
          >
            <RadioButton.Android value="electronics_repair" color="#2D4495" />
            <Text style={styles.radioLabel}>Electronics Repair</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'cleaning' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('cleaning')}
          >
            <RadioButton.Android value="cleaning" color="#2D4495" />
            <Text style={styles.radioLabel}>Cleaning</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.radioItem, subCategory === 'moving' && styles.radioItemSelected]} 
            onPress={() => setSubCategory('moving')}
          >
            <RadioButton.Android value="moving" color="#2D4495" />
            <Text style={styles.radioLabel}>Moving</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </RadioButton.Group>
</ScrollView>

        <Text style={styles.sectionTitle}>Price</Text>
        <TextInput
          label="Price (PKR)"
          mode="outlined"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#2D4495' } }}
        />
      </View>

      {/* Contact Information */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <TextInput
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#2D4495' } }}
        />

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#2D4495' } }}
        />

        <TextInput
          label="Mobile Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#2D4495' } }}
        />

        {/* WhatsApp Contact Option */}
        
      </View>

       
        {/* Submit and Preview Buttons */}
        <View style={styles.submitContainer}>
          <Button
            mode="contained"
            onPress={handlePreview}
            style={styles.submitButton}
            buttonColor="#2D4495"
          >
            Preview Ad
          </Button>
          <Button
            mode="outlined"
            onPress={() => console.log('Advertisement Added')}
            style={[styles.submitButton, { marginTop: 10 }]}
            buttonColor="#FFFFFF"
            textColor="#2D4495"
          >
            Post Your Ad
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAdds;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  appBar: {
    backgroundColor: theme.colors.primary.primary1,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  imagePickerWrapper: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  imagePickerContainer: {
    width: '100%',
    minHeight: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary.primary1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBox: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageBoxContent: {
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 16,
    color: theme.colors.primary.primary1,
    marginTop: 8,
    fontWeight: '500',
  },
  imageLimit: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  selectedImagesContainer: {
    padding: 10,
  },
  imageScroll: {
    flexGrow: 0,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  largeImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
  },
  addMoreImages: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.primary.primary1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addMoreText: {
    fontSize: 12,
    color: theme.colors.primary.primary1,
    marginTop: 4,
  },
  formContainer: {
    padding: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 55,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary.primary1,
    marginBottom: 16,
  },
  submitContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  radioRow: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  radioItemSelected: {
    backgroundColor: '#E8EAF6',
    borderColor: theme.colors.primary.primary1,
  },
  radioLabel: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333333',
  },
  backButton: {
    marginRight: 16,
    marginLeft:10
  },
});




