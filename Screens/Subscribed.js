import {  View , Text } from "react-native"
import DateRangePicker from "../Components/DateRangePicker"

function Subscribed(){

    return(

        <View>

            <DateRangePicker 
            showStartDate = {true}
            showEndDate = {true}
            showMobile = {true}
            />
            
        </View>

    )
}

export default Subscribed