import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../config/supabase';

const PostInternshipScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [stipend, setStipend] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !requirements || !stipend) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // ✅ Get the authenticated user
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        // ✅ Get startup ID from the `startups` table using email
        const { data: startupData, error: startupError } = await supabase
          .from('startups')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (startupError || !startupData?.id) {
          throw new Error('Startup data not found. Please try again.');
        }

        // ✅ Insert into 'internships' table using the fetched startup ID
        const { error: insertError } = await supabase
          .from('internships')
          .insert([
            {
              startup_id: startupData.id, // ✅ Use startup ID from the `startups` table
              title,
              description,
              requirements,
              stipend: Number(stipend), // ✅ Convert stipend to number
            },
          ]);

        if (insertError) throw insertError;

        Alert.alert('Success', 'Internship posted successfully!');
        navigation.goBack(); // ✅ Go back to StartupProfile screen after posting
      }
    } catch (error) {
      console.error('Submit Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 16, textAlign: 'center' }}>
        🚀 Post an Internship
      </Text>

      {/* 📌 Internship Title */}
      <TextInput
        placeholder="Title"
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

      {/* ✅ Requirements */}
      <TextInput
        placeholder="Requirements"
        value={requirements}
        onChangeText={setRequirements}
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

      {/* 💰 Stipend */}
      <TextInput
        placeholder="Stipend"
        value={stipend}
        onChangeText={setStipend}
        keyboardType="numeric"
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
          marginTop: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Post Internship</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostInternshipScreen;
