import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import InputField from './InputField';
import DropdownField from './DropdownField';

export default function PreOrderForm({
  planData,
  leadData,
  dropdowns,
  onSubmit,
  onPracticeChange,
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    emailStr: '',
    practiceId: '',
    specialityId: '',
    billingEntityName: '',
    alternateContactName: '',
    alternateContactNumber: '',
    state: '',
    city: '',
    street: '',
    zipCode: '',
    country: 'India',
    typeOfHospitalClinic: '',
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- PREFILL FROM API ---------------- */
  useEffect(() => {
    if (!planData && !leadData) return;

    setForm(prev => ({
      ...prev,
      firstName: planData?.firstName || leadData?.firstName || '',
      lastName: planData?.lastName || leadData?.lastName || '',
      mobileNo: planData?.mobileNo || leadData?.mobileNo || '',
      emailStr: planData?.emailStr || leadData?.emailStr || '',
      practiceId: planData?.practiceId || '',
      specialityId: planData?.specialityId || '',
      billingEntityName: planData?.billingEntityName || '',
      alternateContactName: planData?.alternateContactName || '',
      alternateContactNumber: planData?.alternateContactNumber || '',
      state: planData?.state || '',
      city: planData?.city || '',
      street: planData?.street || '',
      zipCode: planData?.zipCode || '',
      country: planData?.country || 'India',
      typeOfHospitalClinic: planData?.typeOfHospitalClinic || '',
    }));
  }, [planData, leadData]);

  /* ---------------- UPDATE FORM ---------------- */
  const updateForm = useCallback(
    (key, value) => {
      setForm(prev => ({ ...prev, [key]: value }));
      setErrors(prev => ({ ...prev, [key]: false }));

      if (key === 'practiceId' && value) {
        onPracticeChange?.(value);
      }
    },
    [onPracticeChange]
  );

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const e = {};

    if (!form.firstName) e.firstName = true;
    if (!form.lastName) e.lastName = true;
    if (!form.mobileNo || form.mobileNo.length !== 10) e.mobileNo = true;
    if (!form.emailStr || !/\S+@\S+\.\S+/.test(form.emailStr)) e.emailStr = true;
    if (!form.practiceId) e.practiceId = true;
    if (!form.specialityId) e.specialityId = true;
    if (!form.state) e.state = true;
    if (!form.city) e.city = true;
    if (!form.street) e.street = true;
    if (!form.zipCode || form.zipCode.length !== 6) e.zipCode = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(form);
  };

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Pre-Order Information</Text>

          {/* BASIC INFO */}
          <InputField
            label="First Name *"
            value={form.firstName}
            error={errors.firstName}
            onChangeText={v => updateForm('firstName', v)}
          />

          <InputField
            label="Last Name *"
            value={form.lastName}
            error={errors.lastName}
            onChangeText={v => updateForm('lastName', v)}
          />

          <InputField
            label="Mobile Number *"
            value={form.mobileNo}
            keyboardType="numeric"
            maxLength={10}
            error={errors.mobileNo}
            onChangeText={v => updateForm('mobileNo', v)}
          />

          <InputField
            label="Email *"
            value={form.emailStr}
            keyboardType="email-address"
            error={errors.emailStr}
            onChangeText={v => updateForm('emailStr', v)}
          />

          {/* PRACTICE */}
          <DropdownField
            label="Stream of Practice *"
            value={form.practiceId}
            options={dropdowns.streams}
            error={errors.practiceId}
            openDropdown={openDropdown === 'practice'}
            onToggle={() =>
              setOpenDropdown(openDropdown === 'practice' ? null : 'practice')
            }
            onSelect={value => updateForm('practiceId', value)}
            placeholder="Select practice stream"
          />

          <DropdownField
            label="Speciality *"
            value={form.specialityId}
            options={dropdowns.specialities}
            error={errors.specialityId}
            openDropdown={openDropdown === 'speciality'}
            onToggle={() =>
              setOpenDropdown(openDropdown === 'speciality' ? null : 'speciality')
            }
            onSelect={value => updateForm('specialityId', value)}
            placeholder="Select speciality"
            disabled={!form.practiceId}
          />

          {/* ADDRESS */}
          <DropdownField
            label="State *"
            value={form.state}
            options={dropdowns.states.map(s => ({
              value: s.key,
              label: s.name,
            }))}
            error={errors.state}
            openDropdown={openDropdown === 'state'}
            onToggle={() =>
              setOpenDropdown(openDropdown === 'state' ? null : 'state')
            }
            onSelect={value => updateForm('state', value)}
          />

          <InputField
            label="City *"
            value={form.city}
            error={errors.city}
            onChangeText={v => updateForm('city', v)}
          />

          <InputField
            label="Street Address *"
            value={form.street}
            error={errors.street}
            onChangeText={v => updateForm('street', v)}
          />

          <InputField
            label="ZIP Code *"
            value={form.zipCode}
            keyboardType="numeric"
            maxLength={6}
            error={errors.zipCode}
            onChangeText={v => updateForm('zipCode', v)}
          />

          {/* SUBMIT */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Pre-Order Form</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  screen: {
    flex: 1,                    // Full screen height
    backgroundColor: '#F8FAFC',
  },
  keyboard: {
    flex: 1,                    // Full keyboard height
  },
  scrollContent: {
    padding: 20,                // Matches your old perfect padding
    paddingBottom: 120,         // Space for submit + keyboard
    flexGrow: 1,               
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    color: '#0F172A',
    paddingTop: 10,
  },
  submitBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 32,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
