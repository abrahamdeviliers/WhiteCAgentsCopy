import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function PlanSelector({
  category,     // "B2C" | "B2B" | "B2D" | "Premium"
  leadData,     // { leadId, doctorId, agentId }
  onBack,
  onConfirm,
}) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadPlans();
  }, [category]);

  const loadPlans = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/planListing",
        {
          leadId: leadData.leadId,
          doctorId: leadData.doctorId,
          agentId: leadData.agentId,
          showAllPlans: false,
        }
      );

      const apiPlans = res.data?.data || [];

      // 🔥 filter by category (B2C / B2B / B2D / Premium)
      const filtered = apiPlans.filter(
        p => p.business_type === category
      );

      // 🔁 map backend → UI
      const mapped = filtered.map(item => ({
        id: item.plan_id,
        name: item.plan_name,
        price: Number(item.amount),
        gst: Number(item.gst_amount),
      }));

      setPlans(mapped);
    } catch (err) {
      console.log("PLAN API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {/* TITLE */}
      <Text style={styles.title}>{category} Plans</Text>

      {/* LOADER */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 30 }}
        />
      )}

      {/* PLANS */}
      {!loading &&
        plans.map(plan => {
          const total = plan.price + plan.gst;

          return (
            <Pressable
              key={plan.id}
              style={[
                styles.plan,
                selected?.id === plan.id && styles.selected,
              ]}
              onPress={() => setSelected(plan)}
            >
              <Text style={styles.planName}>{plan.name}</Text>

              <Text style={styles.price}>
                ₹ {plan.price} + GST ({plan.gst})
              </Text>

              <Text style={styles.total}>
                Total: ₹ {total}
              </Text>
            </Pressable>
          );
        })}

      {/* CONFIRM */}
      <Pressable
        style={[
          styles.confirm,
          !selected && { opacity: 0.5 },
        ]}
        disabled={!selected}
        onPress={() => onConfirm(selected)}
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 18,
  },

  plan: {
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
    color: "#0F172A",
    marginBottom: 4,
  },

  price: {
    fontSize: 14,
    color: "#475569",
  },

  total: {
    marginTop: 6,
    fontWeight: "600",
    color: "#0F172A",
  },

  confirm: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  back: {
    textAlign: "center",
    marginTop: 18,
    color: "#64748B",
    fontSize: 14,
  },
});
