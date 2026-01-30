import { View, FlatList } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";

function AgentCancelled() {
  const { user, sessionToken } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.agentId || !sessionToken) return; // ✅ SAFETY

    async function getData() {
      try {
        const res = await axios.post(
          "https://svcdev.whitecoats.com/agent/getRenewalListing",
          {
            agentId: user.agentId,
            cancelled: true,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`, // ✅ REQUIRED
            },
          }
        );

        console.log("API response:", res.data.renewalListing);
        setData(res.data.renewalListing);
      } catch (error) {
        console.error("API error:", error.response?.data || error.message);
      }
    }

    getData();
  }, [user, sessionToken]); 

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.subscriptionId)}
      renderItem={({ item }) => (
        <ExpandableCard
          header={item.planName}
          subHeader={`Valid till ${item.endDate}`}
          badgeText="Cancelled"
        showInterest={true} 
          rows={[
            { label: "Subscription ID", value: item.subscriptionId },
            { label: "Order ID", value: item.subscriptionOrderId },
            { label: "Doctor ID", value: item.doctorId },
            { label: "Plan Name", value: item.planName },
            { label: "Start Date", value: item.startDate },
            { label: "End Date", value: item.endDate },
          ]}
        />
      )}
    />
  );
}

export default AgentCancelled;
