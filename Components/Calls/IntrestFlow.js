import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import { PlanContext } from "../../Context/PlanContext";

export default function AgentInterestFlow({
  category,     // "B2C" | "B2B" | "B2D" | "Premium"
  onBack,
  onClose,
}) {
  const { planResponse } = useContext(PlanContext);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // 🔥 CORE LOGIC: category → plans
  const plansForCategory = useMemo(() => {
    if (!planResponse?.planCategory) return [];

    const categoryObj = planResponse.planCategory.find(
      (c) => c.categoryName === category
    );

    return categoryObj?.plan || [];
  }, [planResponse, category]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} Plans</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {plansForCategory.map((plan) => {
          const pricing = plan.planPricing?.[0] || {};
          const total =
            Number(pricing.amount || 0) +
            Number(pricing.gstAmount || 0);

          return (
            <Pressable
              key={plan.planId}
              style={[
                styles.planCard,
                selectedPlan?.planId === plan.planId &&
                  styles.selected,
              ]}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text style={styles.planName}>{plan.planName}</Text>

              <Text style={styles.price}>
                ₹ {pricing.amount} + GST ({pricing.gstAmount})
              </Text>

              <Text style={styles.total}>
                Total: ₹ {total}
              </Text>
            </Pressable>
          );
        })}

        {!plansForCategory.length && (
          <Text style={styles.empty}>No plans available</Text>
        )}
      </ScrollView>

      {/* CONFIRM */}
      <Pressable
        style={[
          styles.confirmBtn,
          !selectedPlan && { opacity: 0.5 },
        ]}
        disabled={!selectedPlan}
        onPress={() => {
          console.log("SELECTED PLAN:", selectedPlan);
          onClose();
        }}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </Pressable>

      {/* BACK */}
      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  planCard: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  selected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },

  planName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    color: "#475569",
  },

  total: {
    marginTop: 6,
    fontWeight: "600",
  },

  confirmBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  confirmText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  back: {
    textAlign: "center",
    marginTop: 14,
    color: "#64748B",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748B",
  },
});
