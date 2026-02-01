import { Alert } from "react-native";

export function confirmLogout(navigation, logout) {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          });
        },
      },
    ]
  );
}
