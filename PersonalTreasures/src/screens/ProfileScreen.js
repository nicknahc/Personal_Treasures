import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
        <Text key={product.id}>{product.title}</Text>
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
});

export default ProfileScreen;
