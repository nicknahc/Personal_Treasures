import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Pressable, Text, Image, ActivityIndicator } from 'react-native';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { createProduct } from '../graphql/mutations';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
const MAX_IMAGE_LIMIT = 5;

const initialState = {
  title: '',
  description: '',
  category: '',
  price: 0,
  quantity: 0,
  condition: '',
  images: [],
};

const AddProductScreen = () => {
  const [productForm, setProductForm] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      console.log('Camera roll permission not granted');
      return;
    }
  
    if (productForm.images.length >= MAX_IMAGE_LIMIT) {
      console.log('Maximum number of images reached');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageURI = result.assets[0].uri;
      setProductForm((prevForm) => ({ ...prevForm, images: [...prevForm.images, imageURI] }));
      await uploadImage(imageURI);
    }
  };
  

  const uploadImage = async (uri) => {
    try {
      setIsLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `product-image-${Date.now()}.jpg`; // Generate a unique file name

      const { identityId } = await Auth.currentCredentials();
      const key = `${identityId}/${fileName}`;
      Storage.configure({ region: 'us-west-1' });
      await Storage.put(key, blob, {
        contentType: 'image/jpeg',
      });

      console.log('Image uploaded successfully');
    } catch (error) {
      console.log('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const setInput = (key, value) => {
    setProductForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const addProduct = async () => {
    try {
      if (!productForm.title || !productForm.description) return;
  
      setIsLoading(true);
      const sellerId = await Auth.currentAuthenticatedUser().then((user) => user.attributes.sub);
  
      const product = {
        ...productForm,
        seller: sellerId,
      };
  
      setProducts([...products, product]);
      setProductForm(initialState);
      await API.graphql(graphqlOperation(createProduct, { input: product }));
      console.log('Product created:', product);
      // Handle success, e.g., show a success message or navigate to another screen
    } catch (error) {
      console.log('Error creating product:', error);
      console.log('Product data:', productForm); // Access productForm instead of product
      setError('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={productForm.title}
        onChangeText={(text) => setInput('title', text)}
        required
      />
      <TextInput
        placeholder="Description"
        value={productForm.description}
        onChangeText={(text) => setInput('description', text)}
        required
      />
      <TextInput
        placeholder="Category"
        value={productForm.category}
        onChangeText={(text) => setInput('category', text)}
        required
      />
      <TextInput
        placeholder="Item Price"
        value={productForm.price.toString()}
        onChangeText={(text) => setInput('price', parseFloat(text))}
        keyboardType="numeric"
        required
      />
      <TextInput
        placeholder="Quantity"
        value={productForm.quantity.toString()}
        onChangeText={(text) => setInput('quantity', parseInt(text, 10))}
        keyboardType="numeric"
        required
      />
      <TextInput
        placeholder="Condition"
        value={productForm.condition}
        onChangeText={(text) => setInput('condition', text)}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <View style={styles.imageContainer}>
          {productForm.images.map((imageURI, index) => (
            <Image key={index} source={{ uri: imageURI }} style={styles.image} />
          ))}
          {productForm.images.length < MAX_IMAGE_LIMIT && (
        <Pressable onPress={pickImage} style={styles.imageContainer}>
          <AntDesign name="plus" size={48} color="black" />
        </Pressable>
      )}
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Add product button */}
      <Pressable onPress={addProduct} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Add Product</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: 'center' },
  input: { backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  buttonContainer: { alignSelf: 'center', backgroundColor: 'black', paddingHorizontal: 8 },
  buttonText: { color: 'white', padding: 16, fontSize: 18 },
  errorText: { color: 'red', marginVertical: 10 },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});

export default AddProductScreen;
