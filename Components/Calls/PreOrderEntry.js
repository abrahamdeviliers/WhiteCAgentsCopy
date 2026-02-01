import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import PreOrderForm from "./PreOrderForm";

const CATEGORIES = ["B2C", "B2B", "B2D", "Premium"];

export default function PreOrderEntry({
  leadData,
  dropdowns,
  onClose,
}) {
  const [category, setCategory] = useState(null);

  // STEP 1 — CATEGORY SELECTION
  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pre Order Form Details</Text>

        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={styles.option}
            onPress={() => setCategory(c)}
          >
            <Text style={styles.optionText}>{c}</Text>
          </Pressable>
        ))}

        <Pressable onPress={onClose}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  // STEP 2 — FORM
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => setCategory(null)}
        style={styles.formBack}
      >
        <Text style={styles.back}>← Back</Text>
      </Pressable>

      <PreOrderForm
        planData={{ category }}   // pass only what form needs
        leadData={leadData}
        dropdowns={dropdowns}
      />
    </View>
  );
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
