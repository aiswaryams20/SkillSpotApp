import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';

const ViewApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // ✅ Step 1: Get authenticated startup user
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        if (user) {
          // ✅ Step 2: Fetch applications + JOIN with students table using internship's startup_id
          const { data, error } = await supabase
            .from('applications')
            .select(`
              id,
              created_at,
              cover_letter,
              status,
              students:student_id (
                full_name,
                email,
                skills
              ),
              internships (
                title,
                startup_id
              )
            `)
            .eq('internships.startup_id', user.user.id); // ✅ Use internship's startup_id for match

          if (error) throw error;

          setApplications(data);
        }
      } catch (error) {
        console.error('Fetch Error:', error.message);
        Alert.alert('Error', error.message);
      }
    };

    fetchApplications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Internship Applications</Text>
      {applications.length === 0 ? (
        <Text style={styles.noData}>No applications found</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>
                {item.students?.full_name || 'N/A'}
              </Text>
              <Text style={styles.email}>
                {item.students?.email || 'N/A'}
              </Text>
              <Text style={styles.skills}>
                Skills: {item.students?.skills?.join(', ') || 'N/A'}
              </Text>
              <Text style={styles.coverLetter}>
                Cover Letter: {item.cover_letter || 'N/A'}
              </Text>
              <Text style={styles.status}>
                Status: {item.status || 'Pending'}
              </Text>
              <Text style={styles.internshipTitle}>
                Internship: {item.internships?.title || 'N/A'}
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
    padding: 20,
    backgroundColor: '#F9FAFB',
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  email: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
  },
  skills: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  coverLetter: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
  },
  status: {
    fontSize: 14,
    color: '#2563EB',
    marginTop: 8,
    fontWeight: 'bold',
  },
  internshipTitle: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 8,
  },
});

export default ViewApplicationsScreen;
