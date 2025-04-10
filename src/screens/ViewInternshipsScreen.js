import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';

const INDIGO = '#3F51B5';
const LIGHT_BG = '#E8EAF6';

const ViewInternshipScreen = ({ navigation }) => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase.from('internships').select('*');
        if (error) throw error;
        setInternships(data);
      } catch (error) {
        console.error('Fetch Error:', error.message);
        Alert.alert('Error', error.message);
      }
    };

    fetchInternships();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Internships</Text>
      <FlatList
        data={internships}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.stipend}>Stipend: ₹{item.stipend || 'Not specified'}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ApplyInternship', { internshipId: item.id })}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: LIGHT_BG,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: INDIGO,
    textAlign: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  description: {
    color: '#4B5563',
    marginTop: 4,
  },
  stipend: {
    color: '#4B5563',
    marginTop: 4,
  },
  button: {
    backgroundColor: INDIGO,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewInternshipScreen;
