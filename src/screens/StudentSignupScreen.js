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

const StudentSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          email,
          full_name: fullName,
          skills: skills.split(',').map((skill) => skill.trim()),
        },
      ]);

    if (profileError) {
      Alert.alert('Error', profileError.message);
    } else {
      Alert.alert('Success', 'Signup successful! Please check your email to confirm.');
      navigation.replace('StudentLogin');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={INDIGO} barStyle="light-content" />
      <Text style={styles.heading}>Student Signup</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Skills"
        placeholderTextColor="#999"
        value={skills}
        onChangeText={setSkills}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSignup} style={styles.buttonPrimary}>
        <Text style={styles.buttonTextPrimary}>Sign Up</Text>
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
    fontSize: 30,
    fontWeight: '700',
    color: INDIGO,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  buttonPrimary: {
    backgroundColor: INDIGO,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default StudentSignupScreen;
