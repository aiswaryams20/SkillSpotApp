import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3F51B5" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.brand}>SkillSpot</Text>
        <Text style={styles.subtitle}>
          Bridging the gap between students and startups.
        </Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('StudentLogin')}
        >
          <Text style={styles.buttonTextPrimary}>Student Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('StartupLogin')}
        >
          <Text style={styles.buttonTextPrimary}>Startup Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const INDIGO = '#3F51B5';
const LIGHT_INDIGO = '#E8EAF6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_INDIGO,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcome: {
    fontSize: 20,
    color: '#444',
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    color: INDIGO,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  buttonsWrapper: {
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: INDIGO,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default WelcomeScreen;
