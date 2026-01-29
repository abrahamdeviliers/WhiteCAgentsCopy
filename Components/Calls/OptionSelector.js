import { Text , View , Pressable , StyleSheet } from "react-native";

const OPTIONS = ["B2C", "B2B", "B2D", "Premium"];

export default function OptionSelector({ title, onBack, onSelect }) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>

      {OPTIONS.map(opt => (
        <Pressable key={opt} style={styles.option} onPress={() => onSelect(opt)}>
          <Text style={styles.optionText}>{opt}</Text>
        </Pressable>
      ))}

      <Pressable onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 18,
  },

  option: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563EB",
  },

  back: {
    textAlign: "center",
    marginTop: 18,
    color: "#64748B",
    fontSize: 14,
  },
});