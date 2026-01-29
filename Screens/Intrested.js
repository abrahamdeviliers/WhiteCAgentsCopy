import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import DateRangePicker from "../Components/DateRangePicker";
import ExpandableCard from "../Components/ExpandableCard";

function Intrested() {
  const { sessionToken } = useContext(AuthContext);

  const [interested, setInterested] = useState([]);
  const [message, setMessage] = useState("");

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    interestStatus: "",
  });

  async function getData() {
    try {
      setMessage("");          // reset message
      setInterested([]);       // reset list

      const res = await axios.post(
        "http://svcdev.whitecoats.com/agent/getInterestedListing",
        {
          agentId: 119,
          fromDate: filters.startDate,
          toDate: filters.endDate,
          interestStatus: filters.interestStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      // 👇 STATUS HANDLING
      if (res.data?.serviceResponse?.status === "N") {
        setMessage(res.data.serviceResponse.message);
        setInterested([]);
        return;
      }

      setInterested(res.data.interestedListing || []);
    } catch (err) {
      console.log("Error fetching interested list", err);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <DateRangePicker
        showStartDate
        showEndDate
        showInterestedStatus
        onStartDateChange={(val) =>
          setFilters(prev => ({ ...prev, startDate: val }))
        }
        onEndDateChange={(val) =>
          setFilters(prev => ({ ...prev, endDate: val }))
        }
        onInterestedChange={(val) =>
          setFilters(prev => ({ ...prev, interestStatus: val }))
        }
        onSubmit={getData}
      />

      {/* ✅ EMPTY / STATUS MESSAGE */}
      {message ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>{message}</Text>
        </View>
      ) : (
        interested.map(item => (
          <ExpandableCard
            key={item.interestedId}
            header={item.planName}
            subHeader={item.name}
            badgeText={item.interestStatus}
            amount={`₹ ${item.orderPrice}`}
            rows={[
              { label: "Mobile No", value: item.mobileNo },
              { label: "Speciality", value: item.specialityName },
              { label: "Stream", value: item.streamOfPracticeName },
              { label: "Duration", value: `${item.durationInMonths} months` },
              { label: "From Date", value: item.fromDate },
              { label: "To Date", value: item.toDate },
            ]}
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

export default Intrested;
