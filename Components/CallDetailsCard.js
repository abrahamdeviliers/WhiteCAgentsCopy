import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function CallDetailsCard({ data }) {
  const [open, setOpen] = useState(false);

  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>

      {/* -------- ROW CARD -------- */}
      <Pressable style={styles.rowCard} onPress={() => setOpen(true)}>
        <View style={styles.middle}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.subText}>{data.type} call</Text>
          </View>
        </View>

        <Ionicons name="information-circle-outline" size={22} />
      </Pressable>

      {/* -------- MODAL -------- */}
      <Modal visible={open} transparent animationType="fade">
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setOpen(false)}
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Call Details</Text>

              <Detail label="Name" value={data.name} />
              <Detail label="Mobile" value={data.mobileNo} />
              <Detail label="Email" value={data.emailStr} />
              <Detail label="Lead Status" value={data.leadStatus} />
              <Detail label="Call Purpose" value={data.callPurpose} />
              <Detail label="Call Result" value={data.callResult} />
              <Detail label="Doctor ID" value={data.doctorId} />
              <Detail label="Practice" value={data.practiceName} />
            </View>
          </Pressable>
        </BlurView>
      </Modal>
      
    </>
  );
}

/* -------- DETAIL ROW -------- */
function Detail({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value ?? "N/A"}</Text>
    </View>
  );
}

/* -------- STYLES (SELF-CONTAINED) -------- */
const styles = StyleSheet.create({
  rowCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  middle: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    fontWeight: "700",
    color: "#2563EB",
  },

  name: {
    fontWeight: "600",
  },

  subText: {
    fontSize: 12,
    color: "#64748B",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  detailLabel: {
    color: "#64748B",
  },

  detailValue: {
    fontWeight: "500",
  },
});
