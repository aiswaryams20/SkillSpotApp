import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      if (user) {
        const { data, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.user.email)
          .single();

        if (profileError) {
          Alert.alert('Error', profileError.message);
        } else {
          setUserData(data);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Welcome');
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Welcome, {userData.full_name}</Text>
      <Text style={styles.info}>📧 Email: {userData.email}</Text>
      <Text style={styles.info}>
        🛠️ Skills: {userData.skills ? userData.skills.join(', ') : 'No skills added'}
      </Text>

      {/* 🚀 Post Project Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PostProject')} // ✅ Navigate to PostProjectScreen
        style={styles.button}
      >
        <Text style={styles.buttonText}>Post a Project</Text>
      </TouchableOpacity>

      {/* 🚪 Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
  onPress={() => navigation.navigate('ViewInternships')}
  style={{
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  }}
>
  <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
    View Internships
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
    backgroundColor: '#0077B5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
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

export default ProfileScreen;
