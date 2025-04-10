import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const StartupSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cin, setCin] = useState('');

  const handleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const { error: profileError } = await supabase
        .from('startups')
        .insert([{ email, name, cin }]);

      if (profileError) throw profileError;

      Alert.alert('Success', 'Signup successful! Please check your email to confirm.');
      navigation.replace('StartupLogin');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#E8EAF6' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', color: '#3F51B5', marginBottom: 20, textAlign: 'center' }}>
        Startup Signup 
      </Text>

      <TextInput
        placeholder="Startup Name"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#C5CAE9',
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#C5CAE9',
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#C5CAE9',
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="CIN Number"
        value={cin}
        onChangeText={setCin}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#C5CAE9',
          marginBottom: 16,
          fontSize: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleSignup}
        style={{
          backgroundColor: '#3F51B5',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          elevation: 3,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartupSignupScreen;
