import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import DateRangePicker from "../Components/DateRangePicker";
import ExpandableCard from "../Components/ExpandableCard";

function RejectedSubscription() {
  const { sessionToken } = useContext(AuthContext);

  const [rejectedList, setRejectedList] = useState([]);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    mobileNo: "", // optional filter
  });

  // Fetch Rejected Subscriptions
  const getRejectedSubscriptions = async () => {
    if (!filters.startDate || !filters.endDate) {
      Alert.alert("Error", "Please select both start and end dates.");
      return;
    }

    try {
      setMessage("");
      setRejectedList([]);

      const res = await axios.post(
        "https://svcdev.whitecoats.com/emp/getManualSubscribedRejectedListing",
        {
          agentId: 119, 
          fromDate: filters.startDate,
          toDate: filters.endDate,
          mobileNo: filters.mobileNo || null,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      const data = res.data;
      if (!data || data.length === 0) {
        setMessage("No rejected subscriptions found.");
        return;
      }

      setRejectedList(
        data.map((item) => ({
          header: item.doctorName || "Unknown Doctor",
          subHeader: item.mobileNo || "-",
          amount: item.amount ? `₹${item.amount}` : "-",
          rows: [
            { label: "Plan Name", value: item.planName || "-" },
            { label: "Subscribed On", value: item.subscribedOn || "-" },
            { label: "Rejected Reason", value: item.rejectReason || "-" },
            { label: "Duration", value: item.durationInMonths ? `${item.durationInMonths} months` : "-" },
            { label: "Coupon Code", value: item.couponCode || "-" },
          ],
          invoiceURL: item.invoiceURL,
          preOrderFormPath: item.preOrderFormPath,
          rejectedId: item.interestedId || item.orderId, // unique key
        }))
      );
    } catch (err) {
      console.log("Error fetching rejected subscriptions:", err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  // Reset action for a card
  const handleReset = (index) => {
    setRejectedList((prev) =>
      prev.map((c, i) => (i === index ? { ...c, rows: [] } : c))
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Filters */}
      <DateRangePicker
        showStartDate
        showEndDate
        showMobile
        onStartDateChange={(val) =>
          setFilters((prev) => ({ ...prev, startDate: val }))
        }
        onEndDateChange={(val) =>
          setFilters((prev) => ({ ...prev, endDate: val }))
        }
        onMobileChange={(val) =>
          setFilters((prev) => ({ ...prev, mobileNo: val }))
        }
        onSubmit={getRejectedSubscriptions}
      />

      {/* Status Message */}
      {message ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      ) : (
        rejectedList.map((item, index) => (
          <ExpandableCard
            key={item.rejectedId || index}
            {...item}
            showReset={true} // reset button for rejected subscription
            onResetPress={() => handleReset(index)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
});

export default RejectedSubscription;
