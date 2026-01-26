import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

const SPECIALIZATIONS = [
  { label: "Doctor", value: "Doctor" },
  { label: "Allopathy", value: "Allopathy" },
  { label: "Homeopathy", value: "Homeopathy" },
  { label: "Ayurveda", value: "Ayurveda" },
  { label: "PT", value: "PT" },
  { label: "Yoga", value: "Yoga" },
  { label: "Siddha", value: "Siddha" },
  { label: "Unani", value: "Unani" },
  { label: "Veterinary", value: "Veterinary" },
  { label: "Nutrition and Dietetics", value: "Nutrition" },
  { label: "Acupuncture", value: "Acupuncture" },
];

function NewLead() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    specialization: "",
  });

  const [showSpecModal, setShowSpecModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* FIRST NAME */}
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          placeholder="Enter First Name"
          style={styles.input}
          value={form.firstName}
          onChangeText={(val) =>
            setForm((p) => ({ ...p, firstName: val }))
          }
        />

        {/* LAST NAME */}
        <Text style={styles.label}>Last Name *</Text>
        <TextInput
          placeholder="Enter Last Name"
          style={styles.input}
          value={form.lastName}
          onChangeText={(val) =>
            setForm((p) => ({ ...p, lastName: val }))
          }
        />

        {/* MOBILE */}
        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          style={styles.input}
          value={form.mobile}
          onChangeText={(val) =>
            setForm((p) => ({ ...p, mobile: val }))
          }
        />

        {/* EMAIL */}
        <Text style={styles.label}>Email *</Text>
        <TextInput
          placeholder="Enter Email"
          keyboardType="email-address"
          style={styles.input}
          value={form.email}
          onChangeText={(val) =>
            setForm((p) => ({ ...p, email: val }))
          }
        />

        {/* SPECIALIZATION (NO PICKER) */}
        <Text style={styles.label}>Specialization *</Text>
        <Pressable
          style={styles.selectInput}
          onPress={() => setShowSpecModal(true)}
        >
          <Text
            style={[
              styles.selectText,
              !form.specialization && { color: "#9CA3AF" },
            ]}
          >
            {form.specialization || "-- Select --"}
          </Text>
        </Pressable>

        {/* SUBMIT */}
        <Pressable style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>

      {/* SPECIALIZATION MODAL */}
      <Modal
        visible={showSpecModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Select Specialization
            </Text>

            <ScrollView>
              {SPECIALIZATIONS.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.option}
                  onPress={() => {
                    setForm((p) => ({
                      ...p,
                      specialization: item.value,
                    }));
                    setShowSpecModal(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Pressable
              style={styles.cancelBtn}
              onPress={() => setShowSpecModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default NewLead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    elevation: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },
  selectInput: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  selectText: {
    fontSize: 14,
    color: "#111827",
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 15,
    color: "#111827",
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    color: "#EF4444",
    fontWeight: "700",
  },
});
