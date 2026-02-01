import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import InputField from "./InputField";
import DropdownField from "./DropdownField";

export default function PreOrderForm({
  planData,
  leadData,
  dropdowns, // { streams, specialities, states, hospitalTypes }
  onPracticeChange,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    emailStr: "",
    gstNo: "", // Changed from 'gst' to 'gstNo'
    billingEntityName: "",
    alternateContactName: "",
    alternateContactNumber: "",
    typeOfHospitalClinic: "",
    practiceId: "",
    specialityId: "",
    state: "",
    city: "",
    housePlotNo: "", // Added new field
    area: "", // Added new field
    street: "",
    zipCode: "",
    country: "India",
    latitude: "",
    longitude: "",
    doctorId: "",
    leadId: "",
    agentId: "",
    couponId: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!planData && !leadData) return;

    setForm((prev) => ({
      ...prev,
      firstName: planData?.firstName || leadData?.firstName || "",
      lastName: planData?.lastName || leadData?.lastName || "",
      mobileNo: planData?.mobileNo || leadData?.mobileNo || "",
      emailStr: planData?.emailStr || leadData?.emailStr || "",
      gstNo: planData?.gstNo || leadData?.gstNo || "", // Fixed
      billingEntityName: planData?.billingEntityName || leadData?.billingEntityName || "",
      alternateContactName: planData?.alternateContactName || leadData?.alternateContactName || "",
      alternateContactNumber: planData?.alternateContactNumber || leadData?.alternateContactNumber || "",
      typeOfHospitalClinic: planData?.typeOfHospitalClinic || leadData?.typeOfHospitalClinic || "",
      practiceId: planData?.practiceId || leadData?.practiceId || "",
      specialityId: planData?.specialityId || leadData?.specialityId || "",
      state: planData?.state || leadData?.state || "",
      city: planData?.city || leadData?.city || "",
      housePlotNo: planData?.housePlotNo || leadData?.housePlotNo || "", // New
      area: planData?.area || leadData?.area || "", // New
      street: planData?.street || leadData?.street || "",
      zipCode: planData?.zipCode || leadData?.zipCode || "",
      country: planData?.country || leadData?.country || "India",
      latitude: planData?.latitude || leadData?.latitude || "",
      longitude: planData?.longitude || leadData?.longitude || "",
      doctorId: planData?.doctorId || leadData?.doctorId || "",
      leadId: planData?.leadId || leadData?.leadId || "",
      agentId: planData?.agentId || leadData?.agentId || "",
      couponId: planData?.couponId || leadData?.couponId || "",
    }));
  }, [planData, leadData]);

  /* ---------------- UPDATE ---------------- */
  const updateForm = useCallback(
    (key, value) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: false }));

      if (key === "practiceId" && value) {
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
    if (!form.billingEntityName) e.billingEntityName = true;
    if (!form.typeOfHospitalClinic) e.typeOfHospitalClinic = true;
    if (!form.practiceId) e.practiceId = true;
    if (!form.specialityId) e.specialityId = true;
    if (!form.state) e.state = true;
    if (!form.city) e.city = true;
    if (!form.housePlotNo) e.housePlotNo = true; // Added validation
    if (!form.area) e.area = true; // Added validation
    if (!form.street) e.street = true;
    if (!form.zipCode || form.zipCode.length !== 6) e.zipCode = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log("Form Data:", form);
    // Add your submit logic here
  };

  /* ---------------- UI ---------------- */
  return (
    <ScrollView 
    style={styles.container} 
    contentContainerStyle={{ paddingBottom: 40 }} 
    keyboardShouldPersistTaps="handled"
    nestedScrollEnabled
    >
      {/* TITLE */}
      <Text style={styles.title}>Pre-Order Information</Text>

      {/* BASIC DETAILS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Details</Text>
        <InputField
          label="First Name *"
          value={form.firstName}
          error={errors.firstName}
          onChangeText={(v) => updateForm("firstName", v)}
        />
        <InputField
          label="Last Name *"
          value={form.lastName}
          error={errors.lastName}
          onChangeText={(v) => updateForm("lastName", v)}
        />
        <InputField
          label="Mobile Number *"
          value={form.mobileNo}
          keyboardType="numeric"
          maxLength={10}
          error={errors.mobileNo}
          onChangeText={(v) => updateForm("mobileNo", v)}
        />
        <InputField
          label="Email *"
          value={form.emailStr}
          keyboardType="email-address"
          error={errors.emailStr}
          onChangeText={(v) => updateForm("emailStr", v)}
        />
        <InputField
          label="GST Number"
          value={form.gstNo}
          onChangeText={(v) => updateForm("gstNo", v)}
          maxLength={15}
          placeholder="09AAACH7409R1ZZ"
        />
        <InputField
          label="Alternate Contact Name"
          value={form.alternateContactName}
          onChangeText={(v) => updateForm("alternateContactName", v)}
        />
        <InputField
          label="Alternate Contact Number"
          value={form.alternateContactNumber}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(v) => updateForm("alternateContactNumber", v)}
        />
      </View>

      {/* PRACTICE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Information</Text>
        <InputField
          label="Billing Entity Name *"
          value={form.billingEntityName}
          error={errors.billingEntityName}
          onChangeText={(v) => updateForm("billingEntityName", v)}
        />
        <DropdownField
          label="Type of Hospital / Clinic *"
          value={form.typeOfHospitalClinic}
          options={dropdowns.hospitalTypes}
          error={errors.typeOfHospitalClinic}
          openDropdown={openDropdown === "hospitalType"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "hospitalType" ? null : "hospitalType")
          }
          onSelect={(value) => updateForm("typeOfHospitalClinic", value)}
        />
        <DropdownField
          label="Stream of Practice *"
          // value={form.practiceId}
          options={dropdowns.streams}
          error={errors.practiceId}
          openDropdown={openDropdown === "practice"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "practice" ? null : "practice")
          }
          onSelect={(value) => updateForm("practiceId", value)}
        />
        <DropdownField
          label="Speciality *"
          // value={form.specialityId}
          options={dropdowns.specialities}
          error={errors.specialityId}
          openDropdown={openDropdown === "speciality"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "speciality" ? null : "speciality")
          }
          onSelect={(value) => updateForm("specialityId", value)}
          disabled={!form.practiceId}
        />
      </View>

      {/* ADDRESS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <InputField
          label="House/Plot Number *"
          value={form.housePlotNo}
          error={errors.housePlotNo}
          onChangeText={(v) => updateForm("housePlotNo", v)}
          placeholder="10-111"
        />
        <InputField
          label="Area *"
          value={form.area}
          error={errors.area}
          onChangeText={(v) => updateForm("area", v)}
          placeholder="Test Area"
        />
        <InputField
          label="Street Address *"
          value={form.street}
          error={errors.street}
          onChangeText={(v) => updateForm("street", v)}
        />
        <DropdownField
          label="State *"
          value={form.state}
          options={dropdowns.states}
          error={errors.state}
          openDropdown={openDropdown === "state"}
          onToggle={() =>
            setOpenDropdown(openDropdown === "state" ? null : "state")
          }
          onSelect={(value) => updateForm("state", value)}
        />
        <InputField
          label="City *"
          value={form.city}
          error={errors.city}
          onChangeText={(v) => updateForm("city", v)}
        />
        <InputField
          label="ZIP Code *"
          value={form.zipCode}
          keyboardType="numeric"
          maxLength={6}
          error={errors.zipCode}
          onChangeText={(v) => updateForm("zipCode", v)}
        />
        <InputField
          label="Country"
          value={form.country}
          onChangeText={(v) => updateForm("country", v)}
          editable={false}
        />
      </View>

      {/* LOCATION COORDINATES - Optional/Hidden */}
      {(form.latitude || form.longitude) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Coordinates</Text>
          <InputField
            label="Latitude"
            value={form.latitude}
            keyboardType="numeric"
            onChangeText={(v) => updateForm("latitude", v)}
            editable={false}
          />
          <InputField
            label="Longitude"
            value={form.longitude}
            keyboardType="numeric"
            onChangeText={(v) => updateForm("longitude", v)}
            editable={false}
          />
        </View>
      )}

      {/* HIDDEN IDs - For submission */}
      <View style={{ display: 'none' }}>
        <Text>Doctor ID: {form.doctorId}</Text>
        <Text>Lead ID: {form.leadId}</Text>
        <Text>Agent ID: {form.agentId}</Text>
        <Text>Coupon ID: {form.couponId}</Text>
      </View>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Pre-Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginVertical: 24,
  },

  section: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 14,
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
