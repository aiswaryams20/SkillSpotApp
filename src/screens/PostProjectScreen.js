import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../config/supabase';

const PostProjectScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !skills) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // ✅ Step 1: Get the authenticated user
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        // ✅ Step 2: Get user ID from the `users` table using the email
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (userError) throw userError;

        // ✅ Step 3: Insert into 'projects' table using the fetched user ID
        const { error: insertError } = await supabase
          .from('projects')
          .insert([
            {
              user_id: userData.id, // ✅ Use user ID from the `users` table
              title,
              description,
              skills,
            },
          ]);

        if (insertError) throw insertError;

        Alert.alert('Success', 'Project posted successfully!');
        navigation.goBack(); // ✅ Go back to Profile screen after posting
      }
    } catch (error) {
      console.error('Submit Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 16, textAlign: 'center' }}>
        🚀 Post a New Project
      </Text>

      {/* 🏷️ Project Title */}
      <TextInput
        placeholder="Project Title"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 12,
          fontSize: 16,
          color: '#374151',
        }}
      />

      {/* 📝 Description */}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 12,
          fontSize: 16,
          color: '#374151',
          height: 120,
          textAlignVertical: 'top',
        }}
      />

      {/* 🛠️ Skills Used */}
      <TextInput
        placeholder="Skills (comma separated)"
        value={skills}
        onChangeText={setSkills}
        style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 12,
          fontSize: 16,
          color: '#374151',
        }}
      />

      {/* 🚀 Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: '#2563EB',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 12,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostProjectScreen;
