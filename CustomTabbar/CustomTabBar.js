import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const TABS = [
  { name: "Home", icon: "home-outline" },
  { name: "calls", icon: "call-outline" },
  { name: "Payment", icon: "wallet-outline" },
  {name : 'profile' , icon : 'person-circle-outline'},
  { name: "More", icon: "menu-outline" },
];

export default function CustomTabBar({
  state,
  navigation,
  onMorePress,
}) {
  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = state.index;
  }, [state.index]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withSpring(isFocused ? 1.1 : 1),
              },
            ],
          }));

          const onPress = () => {
            if (tab.name === "More") {
              onMorePress();
            } else {
              navigation.navigate(tab.name);
            }
          };

          return (
            <Pressable key={tab.name} onPress={onPress} style={styles.tab}>
              <Animated.View
                style={[
                  styles.iconWrapper,
                  isFocused && styles.active,
                  animatedStyle,
                ]}
              >
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={isFocused ? "#fff" : "#444"}
                />
              </Animated.View>

              {/* TEXT SPACE IS ALWAYS RESERVED */}
              <Text
                style={[
                  styles.label,
                  { opacity: isFocused ? 0 : 1 },
                ]}
              >
                {tab.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 40,
    width: "92%",
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#6A4CFF",
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    color: "#444",
  },
});
