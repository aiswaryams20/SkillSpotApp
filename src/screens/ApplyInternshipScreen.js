import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { supabase } from '../config/supabase';

const INDIGO = '#3F51B5';
const LIGHT_BG = '#E8EAF6';

const ApplyInternshipScreen = ({ route, navigation }) => {
  const { internshipId } = route.params;
  const [coverLetter, setCoverLetter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleFinalSubmit = async () => {
    try {
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        const { data: studentData, error: studentError } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.user.email)
          .single();

        if (studentError) throw studentError;

        const { error: insertError } = await supabase
          .from('applications')
          .insert([
            {
              internship_id: internshipId,
              student_id: studentData.id,
              cover_letter: coverLetter,
              status: 'Pending',
            },
          ]);

        if (insertError) throw insertError;

        Alert.alert('Success', 'Application submitted successfully!');
        setModalVisible(false);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Apply Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  const handleApplyPress = () => {
    if (!coverLetter.trim()) {
      Alert.alert('Error', 'Please add a cover letter.');
      return;
    }
    setModalVisible(true); // show preview before final submit
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Submit Your Application</Text>

      <TextInput
        placeholder="Write your cover letter here..."
        value={coverLetter}
        onChangeText={setCoverLetter}
        multiline
        numberOfLines={6}
        maxLength={1000}
        style={styles.textArea}
      />

      {/* 🔢 Character Count */}
      <Text style={styles.charCount}>{coverLetter.length}/1000 characters</Text>

      <TouchableOpacity onPress={handleApplyPress} style={styles.button}>
        <Text style={styles.buttonText}>Preview & Submit</Text>
      </TouchableOpacity>

      {/* 🔍 Preview Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Preview the Cover Letter</Text>
            <Text style={styles.modalContent}>{coverLetter}</Text>

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, { backgroundColor: '#E5E7EB' }]}
              >
                <Text style={{ color: '#1F2937', fontWeight: 'bold' }}>Edit</Text>
              </Pressable>
              <Pressable
                onPress={handleFinalSubmit}
                style={[styles.modalBtn, { backgroundColor: INDIGO }]}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: INDIGO,
    marginBottom: 24,
    textAlign: 'center',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    height: 150,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  charCount: {
    textAlign: 'right',
    color: '#6B7280',
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: INDIGO,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: INDIGO,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContent: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});

export default ApplyInternshipScreen;
