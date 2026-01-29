import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import DateRangePicker from "../Components/DateRangePicker";

import { AuthContext } from "../Context/AuthContext";

import CallDetailsCard from "../Components/Calls/CallDetailsCard";

function Calls() {
  const { user, sessionToken } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    mobile: "",
    agentId: "",
    interestedStatus: "",
  });

  const [callsData, setCallsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 API CALL
  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://svcdev.whitecoats.com/agent/getCallListing",
        {
          agentId: user.agentId,
          // fromDate: filters.startDate,
          // toDate: filters.endDate,
          // mobile: filters.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      setCallsData(response.data.postOutBoundCall || []);
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Render each call item
  function renderItem({ item }) {
    return <CallDetailsCard data={item} />;
  }

  return (
    <View style={styles.container}>
      {/* 🔹 FILTER COMPONENT */}
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
          setFilters((prev) => ({ ...prev, mobile: val }))
        }
        onInterestedStatusChange={(val) =>
          setFilters((prev) => ({ ...prev, interestedStatus: val }))
        }
        onSubmit={handleSubmit}
      />

      {/* 🔹 LOADING */}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {/* 🔹 CALL LIST */}
      {!loading && (
        <FlatList
          data={callsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ marginLeft : 10 , marginRight : 10 ,  paddingBottom: 120 , marginTop : 10}}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No calls found</Text>
          }
        />
      )}
    </View>
  );
}

export default Calls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#777",
  },

});
