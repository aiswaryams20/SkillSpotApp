import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const StartupProfileScreen = ({ navigation }) => {
  const [startupData, setStartupData] = useState(null);

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        // ✅ Get the authenticated user
        const { data: user, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          // ✅ Fetch startup profile using `email` (NOT id)
          const { data, error: profileError } = await supabase
            .from('startups')
            .select('*')
            .eq('email', user.user.email) // ✅ Match using email
            .single();

          if (profileError) throw profileError;

          setStartupData(data);
        }
      } catch (error) {
        console.error('Profile Fetch Error:', error.message);
        Alert.alert('Error', error.message);
      }
    };

    fetchStartupData();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace('Welcome');
    } catch (error) {
      console.error('Logout Error:', error.message);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (!startupData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Welcome, {startupData.name}</Text>
      <Text style={styles.info}>📧 Email: {startupData.email}</Text>
      <Text style={styles.info}>🏢 CIN: {startupData.cin}</Text>

      {/* 🚀 Post an Internship Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PostInternship')}
        style={{
          backgroundColor: '#2563EB',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Post an Internship
        </Text>
      </TouchableOpacity>

      {/* 🚪 Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() => navigation.navigate('ViewApplications')}
  style={{
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  }}
>
  <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
    View Applications
  </Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
  },
});

export default StartupProfileScreen;
