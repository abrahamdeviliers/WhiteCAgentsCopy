import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import ExpandableCard from '../../Components/ExpandableCard'
function SearchLead(){

  const [ leadDetails , setLeadDetails ] = useState([])

  const { sessionToken } = useContext(AuthContext)

  const [ filters , setFilters] = useState({
    mobile : '',
  })

  async function getData(){

    let k = await axios.post('https://svcdev.whitecoats.com/agent/getLeadDoctorByMobile',
      {
        mobileNo :filters.mobile
      },
      {
        headers : {
          Authorization : `Bearer ${sessionToken}`
        }
      }
    )

    console.log(k.data)
    setLeadDetails(k.data.leadDoctorByMobileNumber)

  }

    return(

      <View  style = {{flex : 1 , width : '100%'}}>
     
        <DateRangePicker 
        showMobile = {true}

        onMobileChange={(val) =>
          setFilters((prev) => ({ ...prev, mobile: val }))
        }

        onSubmit={getData}

        />
        {
          leadDetails ? (
           leadDetails.map((item, index) => (
                 <ExpandableCard
                   key={item.doctorId ?? index}
                   header={item.name}
                   subHeader={item.mobileNo}
                   rows={[
                     { label: 'doctorId', value: item.doctorId },
                     { label: 'email', value: item.email },
                     { label: 'firstName', value: item.firstName },
                     { label: 'lastName', value: `${item.lastName} months` },
                     { label: 'leadId', value: item.leadId },
                     { label: 'specialization', value: item.specialization ?? 'N/A' },
                   ]}
                 />
               ))
             ) : <Text style= {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}> no results </Text>
          }
        
      </View>   

    )
}

export default SearchLead