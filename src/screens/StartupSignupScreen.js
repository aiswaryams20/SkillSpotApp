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
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', color: '#222', marginBottom: 20 }}>
        Startup Signup 🚀
      </Text>

      {/* 🏢 Startup Name */}
      <TextInput
        placeholder="Startup Name"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

      {/* 📧 Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

      {/* 🔒 Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

      {/* 🆔 CIN */}
      <TextInput
        placeholder="CIN Number"
        value={cin}
        onChangeText={setCin}
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

      {/* 🚀 Signup Button */}
      <TouchableOpacity
        onPress={handleSignup}
        style={{
          backgroundColor: '#0077B5',
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '500' }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartupSignupScreen;
