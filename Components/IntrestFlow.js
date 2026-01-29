import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import OptionSelector from "./OptionSelector";
import PlanSelector from "./PlanSelector";
import PreOrderForm from "./PreOrderForm";

export default function InterestFlow({ data, onClose }) {
  const [step, setStep] = useState("DETAILS");
  const [category, setCategory] = useState(null);

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

      {/* 🔹 PRE ORDER FLOW */}
      {step === "PRE_ORDER_TYPE" && (
        <OptionSelector
          title="Pre Order Form Details"
          onSelect={opt => {
            setCategory(opt);
            setStep("PRE_ORDER_FORM"); // ✅ FORM, NOT PLAN
          }}
          onBack={() => setStep("DETAILS")}
        />
      )}

      {step === "PRE_ORDER_FORM" && (
        <PreOrderForm
          category={category}
          leadData={data}
          onBack={() => setStep("PRE_ORDER_TYPE")}
          onClose={onClose}
        />
      )}

      {/* 🔹 AGENT INTEREST FLOW */}
      {step === "AGENT_TYPE" && (
        <OptionSelector
          title="Agent Interested Update Limit"
          onSelect={opt => {
            setCategory(opt);
            setStep("PLAN"); // ✅ ONLY HERE
          }}
          onBack={() => setStep("DETAILS")}
        />
      )}

      {step === "PLAN" && (
        <PlanSelector
          category={category}
          onBack={() => setStep("AGENT_TYPE")}
          onConfirm={plan => {
            console.log("FINAL PLAN:", category, plan);
            onClose();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    width: "90%",
    alignSelf: "center",
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
