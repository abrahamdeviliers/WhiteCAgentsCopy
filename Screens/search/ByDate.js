import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
import axios from 'axios'
import { useContext , useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import ExpandableCard from '../../Components/ExpandableCard'
import { ScrollView } from 'react-native'

function ByDate(){

    const { sessionToken } = useContext(AuthContext)

    const [ data , setData] = useState([])

     const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
    });


    async function getData(){

        let k = await axios.post('http://3.108.248.132:8090/WhiteCoatsCore/lead/getDisposition',
            {
                // fromDate : "2026-01-01",
                // toDate : "2026-01-31"
                fromDate : filters.startDate,
                toDate : filters.endDate,
            },
            {
                headers :{ 
                  Authorization : `Bearer ${sessionToken}`
                }
            },
        )

        console.log(k.data)

        setData(k.data.PostOutBoundCallStatus)

    }

    return(

        <View style = {{flex : 1 , width : '100%'}}>

        <View >
            <DateRangePicker
            showStartDate = {true}
            showEndDate = {true}
            onStartDateChange={(val) =>
                setFilters((prev) => ({ ...prev, startDate: val }))
            }
            onEndDateChange={(val) =>
                setFilters((prev) => ({ ...prev, endDate: val }))
            }
            onSubmit={getData}
            />

        </View>

            <ScrollView>
        {data.map((item, index) => (
          <ExpandableCard
            key={index}
            header={item.name}
            subHeader={item.specialization}
            badgeText={item.leadStatus}
            amount={`${item.callDuration} min`}
            rows={[
              { label: 'Mobile No', value: item.mobileNo },
              { label: 'Call Purpose', value: item.callPurpose },
              { label: 'Call Result', value: item.callResult },
              { label: 'Call Status', value: item.callStatus },
              { label: 'Created At', value: item.createdAt },
            ]}
          />
        ))}
      </ScrollView>
        </View>
    )

}

export default ByDate