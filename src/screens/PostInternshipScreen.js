import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { supabase } from '../config/supabase';

const INDIGO = '#3F51B5';
const LIGHT_BG = '#E8EAF6';

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
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        const { data: startupData, error: startupError } = await supabase
          .from('startups')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (startupError || !startupData?.id) {
          throw new Error('Startup data not found. Please try again.');
        }

        const { error: insertError } = await supabase.from('internships').insert([
          {
            startup_id: startupData.id,
            title,
            description,
            requirements,
            stipend: Number(stipend),
          },
        ]);

        if (insertError) throw insertError;

        Alert.alert('Success', 'Internship posted successfully!');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Submit Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Post an Internship</Text>

      {/* Title */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Internship Title</Text>
        <TextInput
          placeholder="Eg. React Native Developer Intern"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      {/* Description */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Job Description of the intern "
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.multiline]}
        />
      </View>

      {/* Requirements */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Requirements</Text>
        <TextInput
          placeholder="Eg. React, Firebase, Supabase"
          value={requirements}
          onChangeText={setRequirements}
          style={styles.input}
        />
      </View>

      {/* Stipend */}
      <View style={styles.inputCard}>
        <Text style={styles.label}>Stipend (INR)</Text>
        <TextInput
          placeholder="Eg. 5000"
          value={stipend}
          onChangeText={setStipend}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Submit */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Post Internship</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: LIGHT_BG,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: INDIGO,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  multiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: INDIGO,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
    elevation: 4,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostInternshipScreen;
