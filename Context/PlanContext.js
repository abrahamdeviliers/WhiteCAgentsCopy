import { createContext, useState } from "react";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [planResponse, setPlanResponse] = useState(null);

  return (
    <PlanContext.Provider value={{ planResponse, setPlanResponse }}>
      {children}
    </PlanContext.Provider>
  );
}
