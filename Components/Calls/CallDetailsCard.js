import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import InterestFlow from "./IntrestFlow";
import axios from 'axios'
import { AuthContext } from "../../Context/AuthContext";
import BottomSheetModal from "../BottomSheetModal";
import { PlanContext } from "../../Context/PlanContext";
import PlanSelectorFull from "./PlanSelectorFull";
import PlanSelectorFullWrapper from "./PlanSelectorFullWrapper";
import InterestRoot from "./InterestRoot";
import { dropdowns } from "../../DropdownData/DropDownData";


export default function CallDetailsCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showInterest, setShowInterest] = useState(false);
  const [planData , setPlanData] = useState(null)

  const { setPlanResponse } = useContext(PlanContext);

  const { sessionToken }  = useContext(AuthContext)

  const { user } =  useContext(AuthContext)

 async function fetchPlanData() {
  try {
    const res = await axios.post(
      "https://svcdev.whitecoats.com/agent/planListing",
      {
        leadId: data.leadId,
        doctorId: 10366,
        agentId: user.agentId,
        showAllPlans: false,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    // 🔥 SAVE FULL RESPONSE
    setPlanResponse(res.data);
    setShowInterest(true);

  } catch (err) {
    console.log("PLAN API ERROR:", err);
  }
}



  const initials = data.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* -------- ROW CARD -------- */}
      <Pressable style={styles.rowCard} onPress={() => setShowDetails(true)}>
        <View style={styles.middle}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.subText}>{data.callPurpose}</Text>
          </View>
        </View>

        <Ionicons
          name="information-circle-outline"
          size={22}
          color="#64748B"
        />
      </Pressable>

      {/* -------- DETAILS MODAL -------- */}
      <Modal visible={showDetails} transparent animationType="fade">
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowDetails(false)}
          >
            <Pressable style={styles.modalCard}>
              {/* CLOSE BUTTON */}
              <Pressable
                style={styles.closeBtn}
                onPress={() => setShowDetails(false)}
              >
                <Ionicons name="close" size={22} color="#000000" />
              </Pressable>

              <Text style={styles.modalTitle}>Call Details</Text>

              <Detail label="Name" value={data.name} />
              <Detail label="Mobile" value={data.mobileNo} />
              <Detail label="Email" value={data.emailStr} />
              <Detail label="Lead Status" value={data.leadStatus} />
              <Detail label="Call Purpose" value={data.callPurpose} />
              <Detail label="Call Result" value={data.callResult} />
              <Detail label="Doctor ID" value={data.doctorId} />
              <Detail label="Practice" value={data.practiceName} />

              <View style={styles.divider} />

              <Pressable
                style={styles.interestBtn}
                onPress={() => {
                  setShowDetails(false);
                  fetchPlanData()
                }}
              >
                <Ionicons name="star-outline" size={18} color="#fff" />
                <Text style={styles.interestText}>Set Interest</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </BlurView>
      </Modal>

      {/* -------- INTEREST FLOW MODAL -------- */}
      <Modal visible={showInterest} transparent animationType="fade">
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.modalOverlay}>
            {/* CLOSE BUTTON */}
            <Pressable
              style={styles.closeBtnFloating}
              onPress={() => setShowInterest(false)}
            >
              <Ionicons name="close" size={26} color="#fff" />
            </Pressable>
            <BottomSheetModal onClose={() => setShowInterest(false)}>
              {/* <PlanSelectorFullWrapper
                onClose={() => setShowInterest(false)}
              /> */}
              <InterestRoot
                onClose={() => setShowInterest(false)}
                leadData={data}
                dropdowns={dropdowns}
              />
            </BottomSheetModal>
          </View>
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

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  rowCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 15,
    color: "#0F172A",
  },

  subText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
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

  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    color : 'black',
    backgroundColor: "#fff",
  },

  closeBtnFloating: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 20,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  detailLabel: {
    color: "#64748B",
    fontSize: 13,
  },

  detailValue: {
    fontWeight: "500",
    maxWidth: "55%",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  interestBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
  },

  interestText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
  },
});
