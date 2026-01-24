import { Ionicons } from "@expo/vector-icons"
import { View , Text , StyleSheet } from "react-native"

function StatCard({ icon, color, value, label }){

    return(
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <Ionicons name={icon} size={26} color={color} />
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 4,
    borderLeftWidth: 5
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8
  },
  statLabel: {
    fontSize: 13,
    color: "#7f8c8d",
    marginTop: 2
  },
   
})

export default StatCard
