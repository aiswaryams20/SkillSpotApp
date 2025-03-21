import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const ApplyInternshipScreen = ({ route, navigation }) => {
  const { internshipId } = route.params;
  const [coverLetter, setCoverLetter] = useState('');

  const handleApply = async () => {
    if (!coverLetter) {
      Alert.alert('Error', 'Please add a cover letter.');
      return;
    }

    try {
      // ✅ Step 1: Get student ID using authenticated user
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        const { data: studentData, error: studentError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (studentError) throw studentError;

        // ✅ Step 2: Insert into applications table
        const { error: insertError } = await supabase
          .from('applications')
          .insert([
            {
              internship_id: internshipId, // ✅ Link to internship
              student_id: studentData.id, // ✅ Link to student
              cover_letter: coverLetter,
              status: 'Pending', // ✅ Default status
            },
          ]);

        if (insertError) throw insertError;

        Alert.alert('Success', 'Application submitted successfully!');
        navigation.goBack(); // ✅ Go back to internships list
      }
    } catch (error) {
      console.error('Apply Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        ✍️ Submit Your Application
      </Text>
      <TextInput
        placeholder="Cover Letter"
        value={coverLetter}
        onChangeText={setCoverLetter}
        multiline
        numberOfLines={5}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 12,
          fontSize: 16,
          color: '#374151',
          textAlignVertical: 'top',
          height: 120,
        }}
      />
      <TouchableOpacity
        onPress={handleApply}
        style={{
          backgroundColor: '#2563EB',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Submit Application
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApplyInternshipScreen;
