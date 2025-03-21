import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', color: '#222', marginBottom: 20, textAlign: 'center' }}>
        Student Login 🎓
      </Text>

      {/* 📧 Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      {/* 🔒 Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      {/* ✅ Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#0077B5',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* 👉 Signup Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('StudentSignup')}
        style={{ marginTop: 12, alignItems: 'center' }}
      >
        <Text style={{ color: '#0077B5', fontSize: 16 }}>
          Don't have an account? <Text style={{ fontWeight: '600' }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentLoginScreen;
