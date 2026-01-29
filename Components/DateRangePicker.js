import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  Pressable,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native";

const STATUS_OPTIONS = ["Coupon/SetupCost Approval Pending", "Payment Pending", "Subscribed", "Coupon Approval Pending" ,"SetupCost Approval Pending",
 "Coupon and SetUp Cost Rejected" , "Coupon Rejected" , "SetUp Cost Rejected"
];

function DateRangePicker({
  showStartDate = false,
  showEndDate = false,
  showMobile = false,
  showInterestedStatus = false,
  showAgentId = false,
  onMobileChange,
  onInterestedChange,
  onAgentIdChange,
  onStartDateChange,
  onEndDateChange,

  onSubmit ,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mobile, setMobile] = useState("");
  const [agentId, setAgentId] = useState("");
  const [interestedStatus, setInterestedStatus] = useState("");

  const [activeField, setActiveField] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-GB");
  }

  function onDateChange(event, selectedDate) {
    setShowPicker(false);
    if (!selectedDate) return;

    if (activeField === "start") {
      setStartDate(selectedDate);
      onStartDateChange?.(selectedDate);
    } else {
      setEndDate(selectedDate);
      onEndDateChange?.(selectedDate);
    }
  }

  return (
    <View style={styles.maincont}>

      {/* AGENT ID */}
      {showAgentId && (
        <>
          <Text style={styles.label}>Agent ID</Text>
          <View style={styles.input}>
            <Ionicons name="person-outline" size={18} />
            <TextInput
              placeholder="Enter agent id"
              value={agentId}
              onChangeText={(val) => {
                setAgentId(val);
                onAgentIdChange?.(val);
              }}
              style={styles.mobileInput}
            />
          </View>
        </>
      )}

      {/* START DATE */}
      {showStartDate && (
        <>
          <Text style={styles.label}>Start Date</Text>
          <Pressable
            style={styles.input}
            onPress={() => {
              setActiveField("start");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text style={startDate ? styles.inputText : styles.placeholder}>
              {startDate ? formatDate(startDate) : "From Date"}
            </Text>
          </Pressable>
        </>
      )}

      {/* END DATE */}
      {showEndDate && (
        <>
          <Text style={styles.label}>End Date</Text>
          <Pressable
            style={styles.input}
            onPress={() => {
              setActiveField("end");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text style={endDate ? styles.inputText : styles.placeholder}>
              {endDate ? formatDate(endDate) : "To Date"}
            </Text>
          </Pressable>
        </>
      )}

      {/* MOBILE NUMBER */}
      {showMobile && (
        <>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.input}>
            <Ionicons name="call-outline" size={18} />
            <TextInput
              placeholder="Enter mobile number"
              // keyboardType="number-pad"
              // maxLength={10}
              value={mobile}
              onChangeText={(val) => {
                setMobile(val);
                onMobileChange?.(val);
              }}
              style={styles.mobileInput}
            />
          </View>
        </>
      )}

      {/* INTERESTED STATUS */}
      {showInterestedStatus && (
        <>
          <Text style={styles.label}>Interested Status</Text>

          <Pressable
            style={styles.input}
            onPress={() => setShowStatusOptions(!showStatusOptions)}
          >
            <View style={styles.selectRow}>
              <Text
                style={
                  interestedStatus ? styles.inputText : styles.placeholder
                }
              >
                {interestedStatus || "Interested Status"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </View>
          </Pressable>

          {showStatusOptions && (
            <View style={styles.dropdown}>
              {STATUS_OPTIONS.map((item) => (
                <Pressable
                  key={item}
                  style={styles.option}
                  onPress={() => {
                    setInterestedStatus(item);
                    setShowStatusOptions(false);
                    onInterestedChange?.(item);
                  }}
                >
                  <Text style={styles.inputText}>{item}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </>
      )}

      {/* DATE PICKER */}
      {showPicker && (
        <DateTimePicker
          value={
            activeField === "start"
              ? startDate || new Date()
              : endDate || new Date()
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
        />
      )}

      {/* SUBMIT */}
      {/* <Pressable style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable> */}
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  maincont: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginLeft : 10,
    marginRight : 10,
    marginTop  : 10
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 6,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
  },
  mobileInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
  placeholder: {
    marginLeft: 10,
    fontSize: 14,
    color: "#9CA3AF",
  },
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: 6,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  submitBtn: {
    backgroundColor: "#2563EB",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default DateRangePicker;
