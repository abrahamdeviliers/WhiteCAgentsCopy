import React, { useContext, useState } from "react";
import { View } from "react-native";
import { PlanContext } from "../../Context/PlanContext";

import OptionSelector from "./OptionSelector";
import PlanSelectorFull from "./PlanSelectorFull";

export default function PlanSelectorFullWrapper({ onClose }) {
  const { planResponse } = useContext(PlanContext);
  const [step, setStep] = useState("CATEGORY");
  const [category, setCategory] = useState(null);

  if (!planResponse?.planCategory) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* STEP 1 – CATEGORY */}
      {step === "CATEGORY" && (
        <OptionSelector
          title="Select Category"
          onSelect={(val) => {
            setCategory(val);
            setStep("PLAN");
          }}
          onBack={onClose}
        />
      )}

      {/* STEP 2 – PLAN SELECTOR */}
      {step === "PLAN" && (
        <PlanSelectorFull
          category={category}
          onBack={() => setStep("CATEGORY")}
          onClose={onClose}
        />
      )}
    </View>
  );
}
