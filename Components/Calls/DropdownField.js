import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';

const DropdownField = ({
  label,
  value,
  options = [],
  error = false,
  onSelect,
  onToggle,
  openDropdown,
  placeholder,
  disabled = false,
}) => {
  const selectedLabel =
    options.find(opt => opt.value == value)?.label || value;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Dropdown Trigger */}
      <Pressable
        style={({ pressed }) => [
          styles.dropdown,
          error && styles.dropdownError,
          disabled && styles.dropdownDisabled,
          pressed && !disabled && styles.dropdownPressed,
        ]}
        onPress={onToggle}
        disabled={disabled}
      >
        <Text style={styles.selectedText} numberOfLines={1}>
          {value ? selectedLabel : placeholder || 'Select an option'}
        </Text>
      </Pressable>

      {/* Dropdown Options */}
      {openDropdown && options.length > 0 && (
        <ScrollView
          style={styles.optionsContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          directionalLockEnabled
          showsVerticalScrollIndicator
          overScrollMode="always"
          bounces={false}
          scrollEventThrottle={16}
          {...(Platform.OS === 'android' && {
            removeClippedSubviews: false,
          })}
        >
          {options.map((option, index) => (
            <Pressable
              key={`${option.value}-${index}`}
              android_disableSound
              style={({ pressed }) => [
                styles.option,
                index === options.length - 1 && styles.lastOption,
                pressed && styles.optionPressed,
              ]}
              onPress={() => onSelect(option.value, option.label)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
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

  dropdownPressed: {
    backgroundColor: '#F3F4F6',
  },

  dropdownError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },

  dropdownDisabled: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },

  selectedText: {
    fontSize: 16,
    color: '#333',
  },

  optionsContainer: {
    maxHeight: 200,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  scrollContent: {
    paddingVertical: 4, // IMPORTANT: no flexGrow here
  },

  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },

  optionPressed: {
    backgroundColor: '#F3F4F6',
  },

  lastOption: {
    borderBottomWidth: 0,
  },

  optionText: {
    fontSize: 16,
    color: '#333',
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
    paddingLeft: 4,
  },
})

export default DropdownField;
