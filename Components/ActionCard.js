import { TouchableOpacity , Text , StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function  ActionCard ({ icon, title , onPress }){
    return(

        <TouchableOpacity activeOpacity={0.8} style={styles.actionCard} onPress = {onPress}> 
            <Ionicons name={icon} size={24} color="#2980b9" />
            <Text style={styles.actionText}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
        </TouchableOpacity>

    )
};

const styles = StyleSheet.create({
     actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 10
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#34495e"
  }
})

export default ActionCard