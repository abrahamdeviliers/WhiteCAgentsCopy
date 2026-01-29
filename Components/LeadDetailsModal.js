import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function LeadDetailsModal({ visible, data, onClose }) {
  if (!data) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
        <View style={styles.overlay}>
          <View style={styles.card}>
            <Pressable style={styles.close} onPress={onClose}>
              <Ionicons name="close" size={22} />
            </Pressable>

            <Text style={styles.title}>
              Details of Lead ID: {data.leadId}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* ===== LEAD DETAILS GRID ===== */}
              <View style={styles.grid}>
                <GridRow label="Lead ID" value={data.leadId} />
                <GridRow label="Agent ID" value={data.agentId} />
                <GridRow label="Agent Name" value={data.agentName} />
                <GridRow label="Agent Mobile" value={data.agentMobile} />
                <GridRow label="Agent Emp ID" value={data.agentEmpId} />
                <GridRow label="Email" value={data.email} />
                <GridRow label="Street" value={data.street} />
                <GridRow label="Area" value={data.area} />
                <GridRow label="ZIP Code" value={data.zip_Code} />
                <GridRow label="State" value={data.state} />
                <GridRow label="Country" value={data.country} />
                <GridRow label="Name" value={data.name} />
                <GridRow label="Lead Source" value={data.leadSource} />
              </View>

              {/* ===== POST OUTBOUND CALL STATUS ===== */}
              <Text style={styles.sectionTitle}>
                Post Outbound Call Status
              </Text>

             <View style={styles.grid}>
              <GridRow label="S No" value={data?.call?.sno} />
              <GridRow label="Call ID" value={data?.call?.callId} />
              <GridRow label="Lead ID" value={data?.call?.leadId} />
              <GridRow label="Agent ID" value={data?.call?.agentId} />
              <GridRow label="Call Type" value={data?.call?.callType} />
              <GridRow label="Call Purpose" value={data?.call?.callPurpose} />
              <GridRow label="Outbound Call Status" value={data?.call?.outboundStatus} />
              <GridRow label="Call Result" value={data?.call?.callResult} />
              <GridRow label="Call Duration" value={data?.call?.duration} />
              <GridRow label="Subject" value={data?.call?.subject} />
              <GridRow label="Description" value={data?.call?.description} />
              <GridRow label="Call Start Time" value={data?.call?.startTime} />
              <GridRow label="Lead Status" value={data?.call?.leadStatus} />
              <GridRow label="Name" value={data?.call?.name} />
              <GridRow label="Mobile No." value={data?.call?.mobile} />
              <GridRow label="Specialization" value={data?.call?.specialization} />
              <GridRow label="City" value={data?.call?.city} />
              <GridRow label="State" value={data?.call?.state} />
              <GridRow label="Lead Sale Type" value={data?.call?.leadSaleType} />
              <GridRow label="Zoho Lead ID" value={data?.call?.zohoLeadId} />
              <GridRow label="Call Status" value={data?.call?.callStatus} />
            </View>
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

/* ================= GRID ROW ================= */

function GridRow({ label, value }) {
  return (
    <View style={styles.gridRow}>
      <Text style={styles.gridLabel}>{label}</Text>
      <Text style={styles.gridValue}>{value ?? "-"}</Text>
    </View>
  );
}

/* ================= TABLE HEADER ================= */

function TableHeader() {
  const columns = [
    "S No",
    "Call ID",
    "Lead ID",
    "Agent ID",
    "Call Type",
    "Call Purpose",
    "Outbound Call Status",
    "Call Result",
    "Call Duration",
    "Subject",
    "Description",
    "Call Start Time",
    "Lead Status",
    "Name",
    "Mobile No.",
    "Specialization",
    "City",
    "State",
    "Lead Sale Type",
    "Zoho Lead ID",
    "Call Status",
  ];

  return (
    <View style={styles.tableRow}>
      {columns.map((col, index) => (
        <View key={index} style={styles.tableCell}>
          <Text style={styles.tableHeaderText}>{col}</Text>
        </View>
      ))}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "95%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
  },
  close: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  /* GRID */
  grid: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  gridRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridLabel: {
    width: "40%",
    backgroundColor: "#EAFBFF",
    padding: 10,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  gridValue: {
    width: "60%",
    padding: 10,
    fontSize: 13,
    fontWeight: "500",
  },

  /* SECTION */
  sectionTitle: {
    marginTop: 18,
    marginBottom: 8,
    backgroundColor: "#9BE9FF",
    padding: 10,
    fontWeight: "700",
    borderRadius: 8,
  },

  /* TABLE */
  table: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#EAFBFF",
  },
  tableCell: {
    padding: 10,
    minWidth: 120,
    borderRightWidth: 1,
    borderColor: "#E2E8F0",
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "700",
  },
  tableWrapper: {
  maxHeight: 220,   
},
});
