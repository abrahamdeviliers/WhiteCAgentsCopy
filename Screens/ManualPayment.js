import { View , Text , StyleSheet , TouchableOpacity} from "react-native"
import { useState } from "react"
import TabBuuton from "../Components/TabButton"
import SearchLead from "./search/SearchLead"
import NewLead from "./NewLead"
import SearchLeadDoc from "./ManualPayment/SearchLeadDoc"

function ManualPayment(){

    const [ activeTab , setActiveTabs ] = useState(0)

    return (

        <View style = { styles.container }>

            <View style = { styles.tabBar}>

                <TabBuuton 
                label='search lead/doctor'
                active={ activeTab === 0}
                onPress={ () =>setActiveTabs(0) }
                />

                <TabBuuton 
                label='Add Lead'
                active={ activeTab === 1}
                onPress={ () => setActiveTabs(1) }
                />
            </View>


            <View style = { styles.content}>

                {activeTab === 0 && <SearchLeadDoc />}

                {activeTab === 1 && <NewLead />}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    tabBar: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#EAF6FB',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})

export default ManualPayment