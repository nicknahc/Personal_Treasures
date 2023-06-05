import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listProducts } from '../graphql/queries';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchUserProducts();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const fetchUserProducts = async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(listProducts, { filter: { seller: { eq: user?.attributes?.sub } } })
      );
      setProducts(data.listProducts.items);
    } catch (error) {
      console.log('Error fetching user products:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {user && (
        <View>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.attributes.email}</Text>
        </View>
      )}
      <Text style={styles.sectionTitle}>Posted Products:</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Text>Title: {product.title}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Category: {product.category}</Text>
          <Text>Condition: {product.condition}</Text>
          <Text>Quantity: {product.quantity}</Text>
          {product.images && product.images.length > 0 && (
            <View style={styles.imagesContainer}>
              {product.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.image} />
              ))}
            </View>
          )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ProfileScreen;
