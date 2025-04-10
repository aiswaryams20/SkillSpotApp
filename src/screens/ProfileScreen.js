import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../config/supabase';
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔷 Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {userData.full_name}</Text>
      </View>

      {/* 📄 Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Profile</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={20} color="#3F51B5" />
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="code-slash" size={20} color="#3F51B5" />
            <Text style={styles.infoText}>
              {userData.skills?.length > 0
                ? `Skills: ${userData.skills.join(', ')}`
                : 'No skills added'}
            </Text>
          </View>
        </View>
      </View>

      {/* 🎯 Action Tiles */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Quick Actions</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('PostProject')}
          style={styles.tile}
        >
          <View style={styles.tileIconWrap}>
            <MaterialIcons name="post-add" size={24} color="#3949AB" />
          </View>
          <Text style={styles.tileText}>Post a Project</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ViewInternships')}
          style={styles.tile}
        >
          <View style={styles.tileIconWrap}>
            <FontAwesome5 name="briefcase" size={22} color="#1E88E5" />
          </View>
          <Text style={styles.tileText}>View Internships</Text>
        </TouchableOpacity>

        {/* 📄 View My Applications */}
        <TouchableOpacity
          onPress={() => navigation.navigate('MyApplications')}
          style={styles.tile}
        >
          <View style={styles.tileIconWrap}>
            <AntDesign name="profile" size={22} color="#0D47A1" />
          </View>
          <Text style={styles.tileText}>View My Applications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.tile, styles.logoutTile]}
        >
          <View style={[styles.tileIconWrap, { backgroundColor: '#fff' }]}>
            <Ionicons name="exit-outline" size={24} color="#E53935" />
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
    backgroundColor: '#ECEFF1',
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
    width: '100%',
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
    backgroundColor: '#ECEFF1',
  },
  loadingText: {
    fontSize: 20,
    color: '#888',
  },
});

export default ProfileScreen;
