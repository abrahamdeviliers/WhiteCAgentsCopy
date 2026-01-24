import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
function SearchLead(){

    return(

      <View  style = {{flex : 1 , width : '100%'}}>
     
        <DateRangePicker 
        showMobile = {true}
        />
     
      </View>   

    )
}

export default SearchLead