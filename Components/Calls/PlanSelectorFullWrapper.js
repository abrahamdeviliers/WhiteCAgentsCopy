// import React, { useContext } from "react";
// import { View , ScrollView} from "react-native";
// import { PlanContext } from "../../Context/PlanContext";

// import PlanSelectorFull from "./PlanSelectorFull";

// export default function PlanSelectorFullWrapper({ onClose, onBack, planData  }) {
//   const { planResponse } = useContext(PlanContext);

//   if (!planResponse?.planCategory) return null;

//   return (
//     <View style={{ flex: 1 }}>
      
//         <PlanSelectorFull
//           category={null}   // or a default category if required
//           onBack={onClose}  // or remove if not needed
//           onClose={onClose}
//         />
     
//     </View>
//   );
// }

import React, { useContext } from "react";
import { View } from "react-native";
import { PlanContext } from "../../Context/PlanContext";
import PlanSelectorFull from "./PlanSelectorFull";

export default function PlanSelectorFullWrapper({ onClose, onBack, planData }) {
  const { planResponse } = useContext(PlanContext);
  
  // ✅ Use prop FIRST, then fallback to context
  const finalPlanData = planData || planResponse;

  // ✅ Check final data
  if (!finalPlanData?.planCategory || finalPlanData.planCategory.length === 0) {
    console.log(" No plan data available");
    console.log("planData:", planData?.planCategory?.length);
    console.log("planResponse:", planResponse?.planCategory?.length);
    return null;
  }

  console.log("✅ Rendering PlanSelectorFull with", finalPlanData.planCategory.length, "categories");

  return (
    <View style={{ flex: 1 }}>
      <PlanSelectorFull
        onBack={onBack || onClose}
        onClose={onClose}
      />
    </View>
  );
}
