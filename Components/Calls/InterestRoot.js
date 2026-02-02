import React, { useState, useContext, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { PlanContext } from "../../Context/PlanContext"; // ✅ Add PlanContext
import PlanSelectorFullWrapper from "./PlanSelectorFullWrapper";
import PreOrderForm from "./PreOrderForm";

const CATEGORIES = ["B2C", "B2B", "B2D", "Premium"];

export default function InterestRoot({
  leadData,
  planData,
  dropdowns,
  onClose,
}) {
  const [step, setStep] = useState("CHOICE"); 
  // CHOICE | AGENT_LIMIT | PREORDER_CATEGORY | PREORDER_FORM

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { setPlanResponse } = useContext(PlanContext); 
  // ✅ Sync planData prop to PlanContext when component mounts
  useEffect(() => {
    if (planData?.planCategory) {
      console.log("🔄 InterestRoot: Syncing planData to PlanContext");
      setPlanResponse(planData);
    }
  }, [planData, setPlanResponse]);

  /* ---------------- CHOICE ---------------- */
  if (step === "CHOICE") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Set Interest</Text>

        <Pressable
          style={styles.option}
          onPress={() => setStep("PREORDER_CATEGORY")}
        >
          <Text style={styles.optionText}>Pre Order Form Details</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => setStep("AGENT_LIMIT")}
        >
          <Text style={styles.optionText}>Agent Interested Update Limit</Text>
        </Pressable>
      </View>
    );
  }

  /* ---------------- AGENT LIMIT ---------------- */
  if (step === "AGENT_LIMIT") {
    return (
      <View style={{flex: 1}}>
        {/* ✅ PlanContext is now populated, PlanSelectorFullWrapper will render */}
        <PlanSelectorFullWrapper
          onClose={onClose}
          onBack={() => setStep("CHOICE")}
        />
      </View>
    );
  }

  /* ---------------- PREORDER CATEGORY ---------------- */
  if (step === "PREORDER_CATEGORY") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pre Order Form Details</Text>

        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={styles.option}
            onPress={() => {
              setSelectedCategory(c);
              setStep("PREORDER_FORM");
            }}
          >
            <Text style={styles.optionText}>{c}</Text>
          </Pressable>
        ))}

        <Pressable onPress={() => setStep("CHOICE")}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  /* ---------------- PREORDER FORM ---------------- */
  if (step === "PREORDER_FORM") {
    return (
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => setStep("PREORDER_CATEGORY")}
          style={styles.formBack}
        >
          <Text style={styles.back}>← Back</Text>
        </Pressable>

        <PreOrderForm
          planData={planData}
          leadData={leadData}
          dropdowns={dropdowns}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  option: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  back: {
    textAlign: "center",
    marginTop: 18,
    color: "#64748B",
  },

  formBack: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
