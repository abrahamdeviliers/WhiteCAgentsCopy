import React, { useContext } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";

import { AuthContext } from "../Context/AuthContext";

// Screens
import LoginScreen from "../Screens/LoginScreen";
import Dashboard from "../Screens/Dashboard";
import BottomTabs from "./BottomTabs";
import Intrested from "../Screens/Intrested";
import AgentCancelled from "../Screens/AgentCancelled";
import SimpleTabs from "../Screens/search/SimpleTabs";
import Subscribed from "../Screens/Subscribed";
import RejectedSubscription from "../Screens/RejectedSubscription";
import Coupon from "../Screens/Coupon";
import Renewels from "../Screens/Renewels";
import ManualPayment from "../Screens/ManualPayment";
import Profile from "../Screens/Profile";
import NewLead from "../Screens/NewLead";

const Stack = createNativeStackNavigator();

/* ---------- HEADER TITLE HANDLER ---------- */
function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Dashboard";
    case "calls":
      return "Calls History";
    case "Payment":
      return "Payments";
    default:
      return "Dashboard";
  }
}

/* ---------- APP NAVIGATOR ---------- */
function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  // Show loader while restoring login
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* --------- NOT LOGGED IN --------- */}
        {!user && (
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}

        {/* --------- LOGGED IN --------- */}
        {user && (
          <>
            <Stack.Screen
              name="Bottomtabs"
              component={BottomTabs}
              options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#fff" },
                headerShadowVisible: false,
              })}
            />

            <Stack.Screen name="intrested" component={Intrested} />
            <Stack.Screen name="search" component={SimpleTabs} />
            <Stack.Screen name="subscribed" component={Subscribed} />
            <Stack.Screen
              name="RejectedSubscriptions"
              component={RejectedSubscription}
            />
            <Stack.Screen name="Coupons" component={Coupon} />
            <Stack.Screen name="Renewals" component={Renewels} />
            <Stack.Screen
              name="AgentCancelled"
              component={AgentCancelled}
            />
            <Stack.Screen
              name="manualpayment"
              component={ManualPayment}
            />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="newlead" component={NewLead} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
