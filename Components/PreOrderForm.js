import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

export default function PreOrderForm({
  category,
  leadData,
  planData,
  onBack,
  onClose,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",

    altName: "",
    altMobile: "",

    billingEntity: "",
    hospitalName: "",
    hospitalType: "",

    stream: "",
    speciality: "",

    houseNo: "",
    street: "",
    area: "",
    city: "",
    state: "",
    zip: "",

    country: "India",
    gst: "",
  });

  // ✅ THIS IS THE FIX
 useEffect(() => {

  console.log("📋 PreOrderForm received:", { planData, leadData });
  if (!planData) return;

  setForm({
    firstName: planData.firstName || "",
    lastName: planData.lastName || "",
    mobile: planData.mobileNo || leadData?.mobileNo || "",
    email: planData.emailStr || leadData?.emailStr || "",
    
    altName: planData.alternateContactName || "",
    altMobile: planData.alternateContactNumber || "",
    
    billingEntity: planData.billingEntityName || "",
    hospitalName: planData.practiceName || "",
    hospitalType: planData.typeOfHospitalClinic || "",
    
    stream: planData.streamOfPracticeName || "",
    speciality: planData.specialization || "",
    
    houseNo: planData.housePlotNo || "",
    street: planData.street || "",
    area: planData.area || "",
    city: planData.city || "",
    state: planData.state || "",
    zip: planData.zipCode || "",
    
    country: planData.country || "India",
    gst: planData.gstNo || "",
  });
}, [planData, leadData]); // ✅ Add leadData here

  const set = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const submit = () => {
    const payload = {
      category,
      leadId: planData?.leadId,
      doctorId: planData?.doctorId,
      agentId: planData?.agentId,
      ...form,
    };

    console.log("✅ PRE ORDER SUBMIT PAYLOAD:", payload);
    onClose();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Pre Order Form Details</Text>
      <Text style={styles.category}>Selected: {category}</Text>

      <Input label="First Name *" value={form.firstName} onChange={v => set("firstName", v)} />
      <Input label="Last Name *" value={form.lastName} onChange={v => set("lastName", v)} />
      <Input label="Mobile *" value={form.mobile} onChange={v => set("mobile", v)} />
      <Input label="Email *" value={form.email} onChange={v => set("email", v)} />

      <Input label="Alternate Contact Name" value={form.altName} onChange={v => set("altName", v)} />
      <Input label="Alternate Contact Number" value={form.altMobile} onChange={v => set("altMobile", v)} />

      <Input label="Billing Entity Name *" value={form.billingEntity} onChange={v => set("billingEntity", v)} />
      <Input label="Hospital / Clinic Name" value={form.hospitalName} onChange={v => set("hospitalName", v)} />
      <Input label="Hospital Type" value={form.hospitalType} onChange={v => set("hospitalType", v)} />

      <Input label="Stream of Practice *" value={form.stream} onChange={v => set("stream", v)} />
      <Input label="Speciality *" value={form.speciality} onChange={v => set("speciality", v)} />

      <Input label="House No / Plot No *" value={form.houseNo} onChange={v => set("houseNo", v)} />
      <Input label="Street *" value={form.street} onChange={v => set("street", v)} />
      <Input label="Area *" value={form.area} onChange={v => set("area", v)} />
      <Input label="City *" value={form.city} onChange={v => set("city", v)} />
      <Input label="State *" value={form.state} onChange={v => set("state", v)} />
      <Input label="ZIP Code *" value={form.zip} onChange={v => set("zip", v)} />

      <Input label="GST Number" value={form.gst} onChange={v => set("gst", v)} />

      <View style={styles.actions}>
        <Pressable onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Pressable onPress={submit} style={styles.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>

      <Pressable onPress={onClose}>
        <Text style={styles.close}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

/* INPUT */
function Input({ label, value, onChange }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.input} />
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  category: { textAlign: "center", color: "#2563EB", marginBottom: 14 },
  label: { fontSize: 12, color: "#64748B" },
  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actions: { flexDirection: "row", marginTop: 16 },
  back: { flex: 1, padding: 14, backgroundColor: "#E5E7EB", marginRight: 8 },
  submit: { flex: 1, padding: 14, backgroundColor: "#2563EB" },
  backText: { textAlign: "center", fontWeight: "600" },
  submitText: { textAlign: "center", color: "#fff", fontWeight: "600" },
  close: { textAlign: "center", marginTop: 18, color: "#EF4444" },
});
