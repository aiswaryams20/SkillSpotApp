import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const StudentSignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSignup = async () => {
    // ✅ Sign up in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    // ✅ Add user profile to "users" table
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
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: '700', color: '#222', marginBottom: 20 }}>
        Student Signup 🎓
      </Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

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

      <TextInput
        placeholder="Skills"
        value={skills}
        onChangeText={setSkills}
        style={{
          backgroundColor: '#F7F7F7',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          marginBottom: 12,
        }}
      />

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
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentSignupScreen;
