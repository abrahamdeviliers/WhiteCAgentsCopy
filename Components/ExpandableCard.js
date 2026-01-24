import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function ExpandableCard({
  header,
  subHeader,
  badgeText,
  amount,
  rows = [],
}) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? "-"}</Text>
    </View>
  );
  }

  return (
    // <ScrollView>
    <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.title}>{header}</Text>
            {subHeader && <Text style={styles.sub}>{subHeader}</Text>}
          </View>

          <View style={styles.right}>
            {amount && <Text style={styles.amount}>{amount}</Text>}
            {badgeText && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeText}</Text>
              </View>
            )}
          </View>
        </View>

        {/* DETAILS */}
        {open && (
          <View style={styles.details}>
            {rows.map((row, index) => (
              <Row
                key={index}
                label={row.label}
                value={row.value}
              />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
    // </ScrollView>
  );
}



const styles = StyleSheet.create({
  card: {
    marginTop : 20,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    padding: 16,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  right: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
  },
  sub: {
    marginTop: 4,
    fontSize: 13,
    color: "#7f8c8d",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d35400",
  },
  badge: {
    marginTop: 6,
    backgroundColor: "#fff3cd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: "#856404",
    fontWeight: "700",
  },
  details: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#95a5a6",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
});
