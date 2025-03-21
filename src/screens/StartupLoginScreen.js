import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const StartupLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);

      // ✅ Sign in using Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const user = data?.user;
      if (!user) throw new Error('User not found.');

      // ✅ Fetch user profile using email
      const { data: profile, error: profileError } = await supabase
        .from('startups')
        .select('*')
        .eq('email', user.email)
        .single();

      if (profileError) {
        if (profileError.message.includes('no rows')) {
          Alert.alert('Error', 'No profile found. Please sign up.');
          navigation.replace('StartupSignup');
        } else {
          throw profileError;
        }
        return;
      }

      Alert.alert('Success', `Welcome back, ${profile.name}!`);
      navigation.replace('StartupProfile');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', color: '#222', marginBottom: 20, textAlign: 'center' }}>
        Startup Login 🚀
      </Text>

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
          marginBottom: 12,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#E0E0E0',
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
          marginBottom: 12,
          fontSize: 16,
          borderWidth: 1,
          borderColor: '#E0E0E0',
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
        disabled={loading}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* ➡️ Redirect to Signup */}
      <TouchableOpacity onPress={() => navigation.replace('StartupSignup')}>
        <Text style={{ color: '#0077B5', textAlign: 'center', marginTop: 8 }}>
          Don’t have an account? Sign up here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartupLoginScreen;
