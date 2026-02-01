import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const PRE_ORDER_OPTIONS = ["B2C", "B2B", "B2D", "Premium"];

export default function PreOrderType({ onSelect, onNext, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pre Order Form Details</Text>

      {PRE_ORDER_OPTIONS.map(opt => (
        <Pressable
          key={opt}
          style={styles.option}
          onPress={() => {
            onSelect(opt);
            onNext();
          }}
        >
          <Text>{opt}</Text>
        </Pressable>
      ))}

      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  header: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  option: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    marginBottom: 10,
  },

  back: {
    textAlign: "center",
    marginTop: 16,
    color: "#64748B",
  },
});
