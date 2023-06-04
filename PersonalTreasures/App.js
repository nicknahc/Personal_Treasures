import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createTodo} from './src/graphql/mutations';
import {listTodos} from './src/graphql/queries';
import { Authenticator, useAuthenticator, withAuthenticator, ThemeProvider, AmplifyTheme, defaultDarkModeOverride} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import Navigation from './src/screens/Navigation';
Amplify.configure(awsExports);

const initialState = {name: '', description: ''};
const theme = {
  overrides: [defaultDarkModeOverride],
};

const App = () => {
  // retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Hello, {user.username}! Click here to sign out!</Text>
    </Pressable>
  )
};

  return (
    <ThemeProvider 
    theme={theme}>
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignOutButton />
        <Navigation />
      </View>
    </SafeAreaView>
  </ThemeProvider>
    
  );
};

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  todo: {marginBottom: 15},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  todoName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});