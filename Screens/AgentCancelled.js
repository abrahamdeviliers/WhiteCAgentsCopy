import { View, FlatList, Modal , StyleSheet , TouchableOpacity , ScrollView } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";
import InterestFlow from "../Components/Calls/IntrestFlow";
import { Ionicons } from "@expo/vector-icons";

function AgentCancelled() {
  const { user, sessionToken } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [showInterest, setShowInterest] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    if (!user?.agentId || !sessionToken) return;

    async function getData() {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/getRenewalListing",
        { agentId: user.agentId, cancelled: true },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      setData(res.data.renewalListing || []);
    }

    getData();
  }, [user, sessionToken]);

  async function fetchPlanData(item) {
    try {
      const res = await axios.post(
        "https://svcdev.whitecoats.com/agent/planListing",
        {
          leadId: item.leadId,
          doctorId: item.doctorId,
          agentId: user.agentId,
          showAllPlans: false,
        },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      setPlanData(res.data);
      setSelectedItem(item);
      setShowInterest(true);
    } catch (err) {
      console.log("PLAN API ERROR:", err);
    }
  }

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={item => String(item.subscriptionId)}
        renderItem={({ item }) => (
          <ExpandableCard
            header={item.planName}
            subHeader={`Valid till ${item.endDate}`}
            badgeText="Cancelled"
            showInterest
            onInterestPress={() => fetchPlanData(item)}
            rows={[
              { label: "Subscription ID", value: item.subscriptionId },
              { label: "Doctor ID", value: item.doctorId },
              { label: "Start Date", value: item.startDate },
              { label: "End Date", value: item.endDate },
            ]}
          />
        )}
      />

      {/* INTEREST FLOW MODAL */}
     {/* INTEREST FLOW MODAL */}
<Modal
  visible={showInterest}
  transparent
  animationType="slide"
  onRequestClose={() => setShowInterest(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {/* Close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setShowInterest(false)}
      >
        <Ionicons name="close" size={22} color="#0F172A" />
      </TouchableOpacity>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {selectedItem && (
          <InterestFlow
            leadData={selectedItem}
            planData={planData}
            sessionToken={sessionToken}
            onClose={() => setShowInterest(false)}
          />
        )}
      </ScrollView>
    </View>
  </View>
</Modal>


    </>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",   // 👈 bottom sheet style
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    maxHeight: "90%",            // 👈 scroll-safe
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
  },

  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    padding: 6,
  },
});

export default AgentCancelled;
