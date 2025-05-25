// app/post.tsx として保存してください
import { Stack } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { db } from '../services/firebase';

const feelings = ['😄', '😢', '😡', '😌', '😱', '😍'];

export default function PostScreen() {
  const [content, setContent] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState('😄');
  const location = useLocation(); 

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('日記が空です');
      return;
    }

    if (!location) {
      alert('位置情報の取得中です');
      return;
    }

    try {
      await addDoc(collection(db, 'diaries'), {
        content,
        feeling: selectedFeeling,
        createdAt: serverTimestamp(),
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      alert('投稿が完了しました！');
      setContent('');
      setSelectedFeeling('😄');
    } catch (e) {
      console.error('投稿エラー:', e);
      alert('投稿に失敗しました');
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: '投稿',
          headerShown: true 
        }} 
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>その場所の気持ちを記録しよう</Text>

        <Text style={styles.label}>今の気持ちは？</Text>
        <View style={styles.feelingsRow}>
          {feelings.map((feeling) => (
            <TouchableOpacity
              key={feeling}
              style={[
                styles.feelingButton,
                selectedFeeling === feeling && styles.selectedFeeling,
              ]}
              onPress={() => setSelectedFeeling(feeling)}
            >
              <Text style={styles.feelingText}>{feeling}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>日記</Text>
        <TextInput
          style={styles.input}
          placeholder="思ったこと、感じたことを書いてみよう"
          multiline
          numberOfLines={6}
          value={content}
          onChangeText={setContent}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>この場所に投稿</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefefe',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  feelingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  feelingButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  selectedFeeling: {
    backgroundColor: '#cceeff',
  },
  feelingText: {
    fontSize: 24,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3399ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});