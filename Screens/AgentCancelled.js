import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";
import InterestRoot from "../Components/Calls/InterestRoot"; // ✅ Changed to InterestRoot

function AgentCancelled() {
  const { user, sessionToken } = useContext(AuthContext);

  const [data, setData] = useState([]);
  
  // Step-based flow (exact Renewels pattern)
  const [step, setStep] = useState("LIST"); // LIST | INTEREST_ROOT
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  // Fetch cancelled renewals on mount
  useEffect(() => {
    if (!user?.agentId || !sessionToken) return;

    async function getData() {
      try {
        const res = await axios.post(
          "https://svcdev.whitecoats.com/agent/getRenewalListing",
          { agentId: user.agentId, cancelled: true },
          { headers: { Authorization: `Bearer ${sessionToken}` } }
        );
        setData(res.data.renewalListing || []);
        setStep("LIST"); // Ensure list view
      } catch (err) {
        console.log("Error fetching cancelled renewals:", err);
      }
    }

    getData();
  }, [user, sessionToken]);

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
      setStep("INTEREST_ROOT"); // ✅ Switch to InterestRoot (no modal needed)
    } catch (err) {
      console.log("PLAN API ERROR:", err);
    }
  }

  /* ---------------- STEP 1: CANCELLED RENEWALS LIST ---------------- */
  if (step === "LIST") {
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.subscriptionId)}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ExpandableCard
            header={item.planName}
            subHeader={`Valid till ${item.endDate}`}
            badgeText="Cancelled"
            showInterest={true} // ✅ Enable interest button
            onInterestPress={() => handleSetInterest(item)} // ✅ Opens InterestRoot
            rows={[
              { label: "Subscription ID", value: item.subscriptionId },
              { label: "Doctor ID", value: item.doctorId },
              { label: "Start Date", value: item.startDate },
              { label: "End Date", value: item.endDate },
            ]}
          />
        )}
      />
    );
  }

  /* ---------------- STEP 2: INTEREST ROOT (handles its own flow) ---------------- */
  return (
    <View style={{ flex: 1 }}>
      <InterestRoot
        leadData={selectedItem}
        planData={planData}
        dropdowns={{}} // Add dropdowns if needed
        onClose={() => setStep("LIST")} // ✅ Back to cancelled renewals list
      />
    </View>
  );
}

export default AgentCancelled;
