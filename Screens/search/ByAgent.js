import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
function ByAgent(){

    return (

        <View style = {{flex : 1 , width : '100%'}}>

           <DateRangePicker 
           showStartDate = {true}
           showEndDate = {true}
           showAgentId = {true}
           />
        </View>
    )
}


export default ByAgent