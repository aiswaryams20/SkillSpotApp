import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../config/supabase';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const StartupProfileScreen = ({ navigation }) => {
  const [startupData, setStartupData] = useState(null);

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          const { data, error: profileError } = await supabase
            .from('startups')
            .select('*')
            .eq('email', user.user.email)
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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading startup profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {startupData.name}</Text>
      </View>

      {/* 🏢 Startup Info Card */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Startup Info</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#3F51B5" />
            <Text style={styles.infoText}>{startupData.email}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <MaterialIcons name="domain" size={20} color="#3F51B5" />
            <Text style={styles.infoText}>CIN: {startupData.cin}</Text>
          </View>
        </View>
      </View>

      {/* 🚀 Action Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Actions</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('PostInternship')}
          style={styles.tile}
        >
          <View style={styles.tileIconWrap}>
            <FontAwesome5 name="plus" size={18} color="#2563EB" />
          </View>
          <Text style={styles.tileText}>Post an Internship</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ViewApplications')}
          style={styles.tile}
        >
          <View style={styles.tileIconWrap}>
            <FontAwesome5 name="file-alt" size={18} color="#10B981" />
          </View>
          <Text style={styles.tileText}>View Applications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.tile, styles.logoutTile]}
        >
          <View style={[styles.tileIconWrap, { backgroundColor: '#fff' }]}>
            <Ionicons name="exit-outline" size={22} color="#fff" />
          </View>
          <Text style={[styles.tileText, { color: '#fff' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#3F51B5',
    width: '100%',
    paddingVertical: 30,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#3F51B5',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3F51B5',
    marginBottom: 10,
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tileIconWrap: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 50,
    marginRight: 16,
  },
  tileText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  logoutTile: {
    backgroundColor: '#E53935',
    shadowColor: '#E53935',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  loadingText: {
    fontSize: 20,
    color: '#888',
  },
});

export default StartupProfileScreen;
