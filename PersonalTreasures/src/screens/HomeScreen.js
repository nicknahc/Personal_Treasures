import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listProducts } from '../graphql/queries';

const HomeScreen = ( {navigation} ) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listProducts));
      const productList = data.listProducts.items;
      setProducts(productList);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };
  const handleProductPress = (product) => {
    console.log(JSON.stringify(product));
    navigation.navigate('Product', { product });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
       <TouchableOpacity
       key={product.id}
       style={styles.productContainer}
       onPress={() => handleProductPress(product)}
     >
       <Text>Title: {product.title}</Text>
       <Text>Price: {product.price}</Text>
       <Text>Description: {product.description}</Text>
       <Text>Category: {product.category}</Text>
       <Text>Condition: {product.condition}</Text>
       <Text>Quantity: {product.quantity}</Text>
       {product.images && product.images.length > 0 && (
         <Image source={{ uri: product.images[0] }} style={styles.image} />
       )}
     </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    productContainer: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginBottom: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 10,
    },
});

export default HomeScreen;
