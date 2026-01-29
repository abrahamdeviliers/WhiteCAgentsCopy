// DropdownField.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DropdownField = ({
  label,
  value,
  options = [],
  error = false,
  onSelect,
  onToggle,
  openDropdown,
  placeholder,
  disabled = false
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdown, error && styles.dropdownError, disabled && styles.dropdownDisabled]}
        onPress={onToggle}
        disabled={disabled}
      >
        <Text style={styles.selectedText} numberOfLines={1}>
          {value ? options.find(opt => opt.value == value)?.label || value : placeholder || 'Select an option'}
        </Text>
      </TouchableOpacity>

      {openDropdown && options.length > 0 && (
        <ScrollView style={styles.optionsContainer} nestedScrollEnabled>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => onSelect(option.value, option.label)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {error && <Text style={styles.errorText}>This field is required</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1000,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    minHeight: 48,
    justifyContent: 'center',
  },
  dropdownError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  dropdownDisabled: {
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
});

export default DropdownField;
