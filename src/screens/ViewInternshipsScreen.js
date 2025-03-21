import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const ViewInternshipScreen = ({ navigation }) => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase
          .from('internships')
          .select('*');

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
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' }}>
        🚀 Available Internships
      </Text>
      <FlatList
        data={internships}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
              {item.title}
            </Text>
            <Text style={{ color: '#4B5563', marginTop: 4 }}>{item.description}</Text>
            <Text style={{ color: '#4B5563', marginTop: 4 }}>
              💰 Stipend: ₹{item.stipend || 'Not specified'}
            </Text>

            {/* ✅ Apply Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ApplyInternship', { internshipId: item.id })}
              style={{
                backgroundColor: '#2563EB',
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                Apply Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ViewInternshipScreen;
