import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'

function ByDate(){

    return(

        <View style = {{flex : 1 , width : '100%'}}>
            <View >
            
            <DateRangePicker
            showStartDate = {true}
            showEndDate = {true}
            />

            </View>
        </View>
    )

}

export default ByDate