import { View, Button, ScrollView } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import DateRangePicker from "../Components/DateRangePicker";
import ExpandableCard from "../Components/ExpandableCard";

function Intrested() {
  const { sessionToken } = useContext(AuthContext);
  const [interested, setInterested] = useState([]);

  async function getData() {
    try {
      const res = await axios.post(
        "http://svcdev.whitecoats.com/agent/getInterestedListing",
        {
          agentId: 119,
          fromDate: "2025-01-01",
          toDate: "2026-01-09",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      setInterested(res.data.interestedListing);
    } catch (err) {
      console.log("Error fetching interested list", err);
    }
  }

  return (
    <ScrollView>
      <DateRangePicker
        showStartDate={true}
        showEndDate={true}
        showInterestedStatus={true}

        onSubmit={getData}
      />

      {/* <Button title="Get Data" onPress={getData} /> */}

      {interested.map(item => (
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
      ))}
    </ScrollView>
  );
}

export default Intrested;
