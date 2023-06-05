import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Text>Title: {product.title}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Condition: {product.condition}</Text>
          <Text>Quantity: {product.quantity}</Text>
          {product.image && <Image source={{ uri: product.image }} style={styles.image} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
