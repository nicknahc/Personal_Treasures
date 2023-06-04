import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MessagingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messaging Screen</Text>
      {/* Add your messaging screen content here */}
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
});

export default MessagingScreen;
