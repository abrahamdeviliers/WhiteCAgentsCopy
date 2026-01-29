import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ChangePassword from "../Components/ChangePassword";

function Profile() {
  
  const { user } = useContext(AuthContext);

  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.loading}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
     
        <SafeAreaView style={styles.container}>
           <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>

            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.designation}>{user.designation}</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.card}>
            <ProfileRow icon="mail-outline" label="Email" value={user.email} />
            <ProfileRow
              icon="call-outline"
              label="Mobile"
              value={`+${user.countryCode} ${user.mobileNo}`}
            />
            <ProfileRow
              icon="briefcase-outline"
              label="Employee ID"
              value={user.internalEmpId}
            />
            <ProfileRow
              icon="shield-checkmark-outline"
              label="Role"
              value={user.designation}
            />
          </View>

          {/* Change Password Button */}
          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => setShowChangePassword(true)}
          >
            <Ionicons name="key-outline" size={20} color="#fff" />
            <Text style={styles.changeBtnText}>Change Password</Text>
          </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>


      {/* Modal */}
      <Modal
        visible={showChangePassword}
        animationType="slide"
        transparent
        onRequestClose={() => setShowChangePassword(false)}
      >
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      </Modal>
    </>
  );
}

function ProfileRow({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={22} color="#10A6A0" />
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 16,
    color: "#6B7280",
  },

  /* Header */
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: "#10A6A0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2933",
  },
  designation: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  /* Rows */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  rowText: {
    marginLeft: 14,
  },
  label: {
    fontSize: 13,
    color: "#6B7280",
  },
  value: {
    fontSize: 16,
    color: "#1F2933",
    fontWeight: "500",
    marginTop: 2,
  },
  changeBtn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#10A6A0",
  paddingVertical: 14,
  borderRadius: 14,
  marginTop: 24,
},
changeBtnText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
  marginLeft: 8,
},

})
export default Profile;
