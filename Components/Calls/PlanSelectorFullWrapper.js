import React, { useContext } from "react";
import { View } from "react-native";
import { PlanContext } from "../../Context/PlanContext";

import PlanSelectorFull from "./PlanSelectorFull";

export default function PlanSelectorFullWrapper({ onClose }) {
  const { planResponse } = useContext(PlanContext);

  if (!planResponse?.planCategory) return null;

  return (
    <View style={{ flex: 1 }}>
      <PlanSelectorFull
        category={null}   // or a default category if required
        onBack={onClose}  // or remove if not needed
        onClose={onClose}
      />
    </View>
  );
}
