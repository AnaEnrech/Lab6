import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SURVEYS_KEY = 'SURVEYS_LIST';

export default function MainMenu({ navigation, route }) {
  const [surveys, setSurveys] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const loadSurveys = async () => {
    try {
      const stored = await AsyncStorage.getItem(SURVEYS_KEY);
      if (stored) setSurveys(JSON.parse(stored));
    } catch (e) {
      console.error('Error al cargar encuestas', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSurveys();

      if (route?.params?.surveyCreated) {
        setShowSuccess(true);

        // Limpia el parámetro para que no se muestre otra vez
        navigation.setParams({ surveyCreated: false });

        // Oculta el mensaje luego de unos segundos
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }, [route?.params?.surveyCreated])
  );

  const renderSurvey = ({ item }) => (
    <View style={styles.surveyItem}>
      <Text style={styles.surveyTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú Principal</Text>

      {showSuccess && (
        <Text style={styles.success}>¡Encuesta creada correctamente!</Text>
      )}

      <Button
        title="Crear Nueva Encuesta"
        onPress={() => navigation.navigate('CreateSurvey')}
      />

      <Text style={styles.subHeader}>Encuestas existentes:</Text>
      <FlatList
        data={surveys}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={renderSurvey}
        ListEmptyComponent={<Text>No hay encuestas creadas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subHeader: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  surveyItem: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  surveyTitle: { fontSize: 16 },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
  },
});
