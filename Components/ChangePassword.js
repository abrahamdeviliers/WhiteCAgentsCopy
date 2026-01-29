import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

function ChangePassword({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePass, setRetypePass] = useState("");

  const { user } = useContext(AuthContext);
  const Agent_Id = user?.agentId;

  async function handleChangePassword() {
    if (newPassword !== retypePass) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.patch(
        `https://svcdev.whitecoats.com/agent/changePassword/${Agent_Id}`,
        {
          currentPassword: oldPassword,
          newPassword,
        }
      );
      alert("Password updated");
      onClose();
    } catch (error) {
      alert("Failed to update password");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Change Password</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <TextInput
          placeholder="Current password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
          onChangeText={setOldPassword}
        />

        <TextInput
          placeholder="New password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
          onChangeText={setNewPassword}
        />

        <TextInput
          placeholder="Confirm new password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
          onChangeText={setRetypePass}
        />

        {/* Action */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
          <Text style={styles.saveText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
  },
  saveBtn: {
    backgroundColor: "#10A6A0",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChangePassword;
