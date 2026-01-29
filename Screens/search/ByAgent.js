import { View, ScrollView, Text } from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import ExpandableCard from '../../Components/ExpandableCard'

function ByAgent() {

  const { sessionToken } = useContext(AuthContext)

  const [data, setData] = useState([])

  const [error, setError] = useState(null)
  
  const [loading, setLoading] = useState(false)

  async function getData() {
    try {
      setLoading(true)
      setError(null)
      setData([])

      const res = await axios.post(
        'http://3.108.248.132:8090/WhiteCoatsCore/lead/getDisposition',
        {
          fromDate: '2026-01-01',
          toDate: '2026-01-31',
          internalEmpId: '156',
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      )

      const apiData = res.data?.PostOutBoundCallStatus
      const serviceResponse = res.data?.serviceResponse

      
      if (serviceResponse?.status === 'N') {
        setError(serviceResponse.message || 'No records found')
        return
      }

      
      setData(apiData || [])
    } catch (err) {
      console.log('API ERROR ', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <DateRangePicker
        showStartDate
        showEndDate
        showAgentId
        onSubmit={getData}
      />

      {/* LOADING */}
      {loading && (
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#64748B' }}>
            Loading...
          </Text>
        </View>
      )}

      {/* ERROR MESSAGE */}
      {!loading && error && (
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            {error}
          </Text>
        </View>
      )}

      {/* DATA */}
      {!loading && !error && (
        <ScrollView>
          {data.map((item, index) => (
            <ExpandableCard
              key={index}
              header={item.name}
              subHeader={item.specialization}
              badgeText={item.leadStatus}
              amount={`${item.callDuration}s`}
              rows={[
                { label: 'Call ID', value: item.callId },
                { label: 'Lead ID', value: item.leadId },
                { label: 'Call Purpose', value: item.callPurpose },
                { label: 'Call Result', value: item.callResult },
                { label: 'Mobile No', value: item.mobileNo },
              ]}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default ByAgent
