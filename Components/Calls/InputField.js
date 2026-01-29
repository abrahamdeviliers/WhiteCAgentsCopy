import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({
  label,
  value,
  onChangeText,
  error = false,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  placeholder = ''
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      {error && <Text style={styles.errorText}>This field is required</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
});

export default InputField;
