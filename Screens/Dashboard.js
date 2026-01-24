import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { View , Text , StyleSheet , ScrollView}  from 'react-native'
import StatCard from "../Components/StatCard"
import ActionCard from "../Components/ActionCard"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../Context/AuthContext"
import { useContext } from "react"
function Dashboard(){

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View>

            <View style={styles.header}>
                <Text style={styles.welcome}>Welcome </Text>
                <Text style={styles.subTitle}>
                    { user ? user.name : 'Agent Dashboard'}
                </Text>
            </View>

            <View style={styles.statsRow}>
                <StatCard
                icon="people"
                label="Total Leads"
                value="128"
                color="#1abc9c"
                
                />
                
                <StatCard
                icon="card"
                label="Subscriptions"
                value="76"
                color="#3498db"
                />
            </View>


            <View style={styles.statsRow}>
                <StatCard
                icon="close-circle"
                label="Cancelled"
                value="12"
                color="#e74c3c"
                />
                <StatCard
                icon="time"
                label="Pending"
                value="8"
                color="#f39c12"
                />
            </View>

            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <ActionCard icon="search" title="Search Lead / Doctor"  onPress = { () => navigation.navigate('search')}/>
            <ActionCard icon="wallet" title="Manual Payment"  onPress = { () => navigation.navigate('manualpayment')}/>
            <ActionCard icon="refresh-circle" title="Renewals" onPress = { () => navigation.navigate('Renewals')}/>
            <ActionCard icon="pricetag" title="Coupons" onPress = { () => navigation.navigate('Coupons')}/>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f6fa",
        padding: 16
    },
    stats : {
        flexDirection : 'row',
        borderColor : 'black',
        borderWidth : 2,
        gap : 10
    },
     statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
    border : {
        gap : 10
    },
    header: {
    marginBottom: 20
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50"
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#7f8c8d"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 14,
    color: "#2c3e50"
  },
})

export default Dashboard