import { View , Text } from "react-native"
import DateRangePicker from "../Components/DateRangePicker"

function RejectedSubscription(){

    return (

        <>
        <DateRangePicker 
        showStartDate = {true}
        showEndDate = {true}
        showMobile = {true}
        />
        
        </>

    )
}

export default RejectedSubscription