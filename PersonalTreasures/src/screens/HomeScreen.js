import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listProducts } from '../graphql/queries';

const HomeScreen = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Text>Title: {product.title}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Condition: {product.condition}</Text>
          <Text>Quantity: {product.quantity}</Text>
          {product.images && product.images.length > 0 && (
            <Image source={{ uri: product.images[0] }} style={styles.image} />
          )}
        </View>
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
