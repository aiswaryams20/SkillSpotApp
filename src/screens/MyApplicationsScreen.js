import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { supabase } from '../config/supabase';

const MyApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        // Get student ID using user email
        const { data: studentData, error: studentError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (studentError) throw studentError;

        const { data, error } = await supabase
          .from('applications')
          .select(`
            id,
            cover_letter,
            status,
            created_at,
            internships (
              title
            )
          `)
          .eq('student_id', studentData.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setApplications(data);
      } catch (error) {
        console.error('Fetch Error:', error.message);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case 'Approved':
        return <Text style={styles.statusApproved}>✅ Approved</Text>;
      case 'Rejected':
        return <Text style={styles.statusRejected}>❌ Rejected</Text>;
      default:
        return <Text style={styles.statusPending}>⏳ Pending</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Internship Applications</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : applications.length === 0 ? (
        <Text style={styles.noData}>No applications found</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.internship}>
                Internship: {item.internships?.title || 'N/A'}
              </Text>
              {renderStatus(item.status)}
              <Text style={styles.label}>Cover Letter:</Text>
              <Text style={styles.letter}>
                {item.cover_letter || 'Not provided'}
              </Text>
              <Text style={styles.date}>
                Applied on: {new Date(item.created_at).toDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  internship: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    marginTop: 8,
    color: '#4B5563',
  },
  letter: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  statusApproved: {
    color: '#10B981',
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusRejected: {
    color: '#EF4444',
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusPending: {
    color: '#2563EB',
    fontWeight: 'bold',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default MyApplicationsScreen;
