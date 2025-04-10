import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { supabase } from '../config/supabase';

const INDIGO = '#3F51B5';
const LIGHT_BG = '#E8EAF6';

const FILTERS = ['All', 'Pending', 'Approved', 'Rejected'];

const ViewApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        if (user) {
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
            .eq('internships.startup_id', user.user.id);

          if (error) throw error;
          setApplications(data);
          setFilteredApplications(data);
        }
      } catch (error) {
        console.error('Fetch Error:', error.message);
        Alert.alert('Error', error.message);
      }
    };

    fetchApplications();
  }, []);

  const applyFilters = (apps, status, search) => {
    let result = [...apps];

    if (status !== 'All') {
      result = result.filter((app) => app.status === status);
    }

    if (search.trim() !== '') {
      const keyword = search.trim().toLowerCase();
      result = result.filter((app) =>
        app.students?.skills?.some((skill) =>
          skill.toLowerCase().includes(keyword)
        )
      );
    }

    setFilteredApplications(result);
  };

  const handleFilterChange = (status) => {
    setActiveFilter(status);
    applyFilters(applications, status, searchText);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    applyFilters(applications, activeFilter, text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Internship Applications</Text>

      {/* 🔎 Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by skill (e.g., React, ML)"
        value={searchText}
        onChangeText={handleSearchChange}
        placeholderTextColor="#888"
      />

      {/* 📌 Filter Bar */}
      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterChange(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredApplications.length === 0 ? (
        <Text style={styles.noData}>No applications found</Text>
      ) : (
        <FlatList
          data={filteredApplications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>👤 {item.students?.full_name || 'N/A'}</Text>
              <Text style={styles.value}>{item.students?.email || 'N/A'}</Text>

              <Text style={styles.label}>Skills</Text>
              <Text style={styles.value}>
                {item.students?.skills?.join(', ') || 'N/A'}
              </Text>

              <Text style={styles.label}>✉️ Cover Letter</Text>
              <Text style={styles.value}>{item.cover_letter || 'N/A'}</Text>

              <Text style={styles.label}>📌 Internship</Text>
              <Text style={styles.value}>{item.internships?.title || 'N/A'}</Text>

              <Text style={styles.label}>📍 Status</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === 'Approved'
                        ? '#10B981'
                        : item.status === 'Rejected'
                        ? '#EF4444'
                        : INDIGO,
                  },
                ]}
              >
                {item.status || 'Pending'}
              </Text>
            </View>
          )}
        />
      )}
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
    textAlign: 'center',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: INDIGO,
  },
  activeFilterButton: {
    backgroundColor: INDIGO,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: INDIGO,
  },
  activeFilterText: {
    color: '#fff',
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
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: '#111827',
    marginTop: 4,
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },
});

export default ViewApplicationsScreen;
