import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateRangePicker from "../Components/DateRangePicker";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";
import InterestRoot from "../Components/Calls/InterestRoot";

function Renewels() {
  const [mobile, setMobile] = useState("");
  const [renewals, setRenewals] = useState([]);
  
  // Simple step state (exact InterestRoot pattern)
  const [step, setStep] = useState("LIST"); // LIST | INTEREST_ROOT
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  const { sessionToken, user } = useContext(AuthContext);

  async function getData() {
    try {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/getRenewalListing",
        { mobileNo: mobile, agentId: user.agentId },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      setRenewals(res.data.renewalListing || []);
      setStep("LIST");
    } catch (err) {
      console.log("Error fetching renewals", err);
    }
  }

  async function handleSetInterest(item) {
    try {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/planListing",
        {
          leadId: item.leadId,
          doctorId: item.doctorId,
          agentId: user.agentId,
          showAllPlans: false,
        },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      setPlanData(res.data);
      setSelectedItem(item);
      setStep("INTEREST_ROOT"); // Just switch to InterestRoot
    } catch (err) {
      console.log("PLAN API ERROR:", err);
    }
  }

  /* ---------------- STEP 1: RENEWALS LIST ---------------- */
  if (step === "LIST") {
    return (
      <>
        <DateRangePicker
          showMobile={true}
          onMobileChange={(val) => setMobile(val)}
          onSubmit={getData}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {renewals.map((item, index) => (
            <ExpandableCard
              key={index}
              header={item.name}
              subHeader={item.specialityName}
              badgeText={item.planName}
              amount={`#${item.subscriptionId}`}
              showInterest={true}
              onInterestPress={() => handleSetInterest(item)}
              rows={[
                { label: "DoctorId", value: item.doctorId },
                { label: "Mobile", value: item.mobile },
                { label: "Start Date", value: item.startDate },
                { label: "End Date", value: item.endDate },
                { label: "PlanId", value: item.planId },
                { label: "planPricingId", value: item.planPricingId },
                { label: "practiceId", value: item.practiceId },
                { label: "specialityId", value: item.specialityId },
                { label: "specialityName", value: item.specialityName },
                { label: "subscriptionId", value: item.subscriptionId },
                { label: "subscriptionOrderId", value: item.subscriptionOrderId },
              ]}
            />
          ))}
        </ScrollView>
      </>
    );
  }

  /* ---------------- STEP 2: INTEREST ROOT (handles its own modal) ---------------- */
  return (
    <View style={{ flex: 1 }}>
      <InterestRoot
        leadData={selectedItem}
        planData={planData}
        dropdowns={{}}
        onClose={() => setStep("LIST")} // InterestRoot handles modal + back navigation
      />
    </View>
  );
}


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flex: 1, // Full height for InterestRoot steps
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
  },

  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    padding: 6,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
    zIndex: 10,
  },

  backText: {
    marginLeft: 6,
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default Renewels;
