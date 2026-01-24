import { Text, View } from 'react-native'
import DateRangePicker from '../Components/DateRangePicker'
function Intrested(){

    return (

        <View>

           <DateRangePicker 
            showStartDate = {true}
            showEndDate = {true}
            showInterestedStatus = {true}
            />

        </View>
    )
}

export default Intrested