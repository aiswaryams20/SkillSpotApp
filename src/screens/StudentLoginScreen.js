import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../config/supabase';

const StudentLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Login successful!');
      navigation.replace('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={INDIGO} barStyle="light-content" />

      <Text style={styles.heading}>Student Login</Text>

      {/* 📧 Email Input */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      {/* 🔒 Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* ✅ Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.buttonPrimary}>
        <Text style={styles.buttonTextPrimary}>Login</Text>
      </TouchableOpacity>

      {/* 👉 Signup Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('StudentSignup')}
        style={styles.signupLink}
      >
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupBold}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const INDIGO = '#3F51B5';
const LIGHT_INDIGO = '#E8EAF6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_INDIGO,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: INDIGO,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  buttonPrimary: {
    backgroundColor: INDIGO,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupLink: {
    alignItems: 'center',
  },
  signupText: {
    color: '#444',
    fontSize: 15,
  },
  signupBold: {
    color: INDIGO,
    fontWeight: '600',
  },
});

export default StudentLoginScreen;
