import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const ProductScreen = ({ navigation, route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {product.images && product.images.length > 0 ? (
          <SwiperFlatList
            data={product.images}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            keyExtractor={(item, index) => index.toString()}
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
          />
        ) : (
          <Text>No images available</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>Price: {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.condition}>Condition: {product.condition}</Text>
        <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
      </View>
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  imageContainer: {
    height: 300,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: 100, 
    height: 100,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  condition: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantity: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProductScreen;
