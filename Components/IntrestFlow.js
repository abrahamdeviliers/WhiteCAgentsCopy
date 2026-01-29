import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import axios from 'axios';
import OptionSelector from "./OptionSelector";
import PlanSelector from "./PlanSelector";
import PreOrderForm from "./PreOrderForm";

export default function InterestFlow({ leadData, planData, sessionToken, onClose }) {
  const [step, setStep] = useState("DETAILS");
  const [category, setCategory] = useState(null);
  
  // ✅ Dropdown state for PreOrderForm
  const [dropdowns, setDropdowns] = useState({
    streams: [],
    specialities: [],
    states: [] // Will be populated
  });

  // ✅ India States (from formApi.txt)
  const indiaStates = [
    { key: "AP", name: "Andhra Pradesh" },
    { key: "KA", name: "Karnataka" },
    // ... add all states from previous response
  ];

  // ✅ Fetch dropdowns on mount
  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      // Practice Streams API ✅
      const streamsRes = await axios.get(
        "https://svcdev.whitecoats.com/onBoarding/contentPractice/getAll",
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      
      const streams = streamsRes.data.practices
        .filter(p => p.isActive)
        .map(p => ({
          value: p.practiceId,
          label: p.streamOfPractice
        }));

      setDropdowns({
        streams,
        specialities: [],
        states: indiaStates
      });

      // Auto-load specialities if practiceId exists
      if (planData?.practiceId) {
        fetchSpecialities(planData.practiceId);
      }
    } catch (error) {
      console.log("Dropdown fetch error:", error);
    }
  };

  const fetchSpecialities = async (practiceId) => {
    try {
      const res = await axios.get(
        `https://svcdev.whitecoats.com/onBoarding/contentSpeciality/get/${practiceId}`,
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
      
      const specialities = res.data.specialities.map(s => ({
        value: s.specialityId,
        label: s.specialityName
      }));
      
      setDropdowns(prev => ({ ...prev, specialities }));
    } catch (error) {
      console.log("Specialities error:", error);
    }
  };

  // ✅ Practice change handler
  const handlePracticeChange = useCallback(async (practiceId) => {
    if (practiceId) {
      await fetchSpecialities(practiceId);
    } else {
      setDropdowns(prev => ({ ...prev, specialities: [] }));
    }
  }, []);

  // ✅ Pre-order submit handler
  const handlePreOrderSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "https://svcdev.whitecoats.com/agent/updateLeadInfo",
        formData,
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      if (response.data.serviceResponse.status === "Y") {
        Alert.alert("Success", "Pre-order form submitted successfully!");
        onClose();
      } else {
        Alert.alert("Error", response.data.serviceResponse.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit form");
    }
  };

  return (
    <View style={styles.container}>
      {step === "DETAILS" && (
        <>
          <Text style={styles.header}>Set Interest</Text>

          <Pressable
            style={styles.card}
            onPress={() => setStep("PRE_ORDER_TYPE")}
          >
            <Text style={styles.cardText}>Pre Order Form Details</Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => setStep("AGENT_TYPE")}
          >
            <Text style={styles.cardText}>
              Agent Interested Update Limit
            </Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.back}>Close</Text>
          </Pressable>
        </>
      )}

      {step === "PRE_ORDER_TYPE" && (
        <OptionSelector
          title="Pre Order Form Details"
          onSelect={opt => {
            setCategory(opt);
            setStep("PRE_ORDER_FORM");
          }}
          onBack={() => setStep("DETAILS")}
        />
      )}

      {step === "PRE_ORDER_FORM" && planData && (
        <PreOrderForm
          category={category}
          leadData={leadData}
          planData={planData}
          dropdowns={dropdowns}           // ✅ Pass dropdowns
          sessionToken={sessionToken}     // ✅ Pass token
          onPracticeChange={handlePracticeChange}  // ✅ Practice handler
          onBack={() => setStep("PRE_ORDER_TYPE")}
          onSubmit={handlePreOrderSubmit}        // ✅ Submit handler
          onClose={onClose}
        />
      )}

      {step === "AGENT_TYPE" && (
        <OptionSelector
          title="Agent Interested Update Limit"
          onSelect={opt => {
            setCategory(opt);
            setStep("PLAN");
          }}
          onBack={() => setStep("DETAILS")}
        />
      )}

      {step === "PLAN" && (
        <PlanSelector
          category={category}
          leadData={leadData}
          onBack={() => setStep("AGENT_TYPE")}
          onConfirm={() => onClose()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // ✅ CRITICAL
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    width: "100%",              // ✅ allow full width
  },

  header: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    marginBottom: 12,
  },

  cardText: {
    fontWeight: "600",
    textAlign: "center",
  },

  back: {
    textAlign: "center",
    marginTop: 18,
    color: "#64748B",
  },
});

