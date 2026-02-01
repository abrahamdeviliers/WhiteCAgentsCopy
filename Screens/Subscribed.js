import {  View , Text  ,  Button, ScrollView} from "react-native"
import DateRangePicker from "../Components/DateRangePicker"
import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import ExpandableCard from "../Components/ExpandableCard"
import { useState } from "react"

function Subscribed(){

    const { sessionToken }  = useContext(AuthContext)

    const [message, setMessage] = useState('');

    const { user } = useContext(AuthContext)

    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        mobile: '',
    });

    const [ data , setData] = useState([])

    async function getData(){

        let k = await axios.post('https://svcdev.whitecoats.com/agent/getSubscribedListing',
            {
                // "fromDate": "2025-01-01",
                // "toDate": "2026-01-31",
                agentId: user.agentId,
                fromDate: filters.startDate,
                toDate: filters.endDate,
            },
            {
                headers : {
                    Authorization : `Bearer ${sessionToken}`
                }
            }
        )
        console.log(k.data)
       if (k.data?.serviceResponse?.status === 'N') {
        setData([]);
        setMessage(k.data.serviceResponse.message);
        } else {
        setData(k.data.paymentAttempts || []);
        setMessage('');
        }
    }

    return(
        <ScrollView>
        <View>
            <DateRangePicker 
            showStartDate = {true}
            showEndDate = {true}
            showMobile = {true}
            onStartDateChange={(val) =>
            setFilters((prev) => ({ ...prev, startDate: val }))
            }
            onEndDateChange={(val) =>
            setFilters((prev) => ({ ...prev, endDate: val }))
            }
            onSubmit={getData}
            />
            
            {message ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>
                {message}
                </Text>
            </View>
            ) : null}

            {/* <Button title="Get Data" onPress={getData} /> */}

            {data.map(item => (
        <ExpandableCard
          key={item.paymentId}
          header={item.planName}
          subHeader={item.doctorName}
          badgeText={item.status}
          amount={`₹ ${item.amount.toLocaleString("en-IN")}`}
          invoiceURL={item.invoiceURL}
          showUpload={true}
          rows={[
            { label: "Mobile No", value: item.mobileNo },
            { label: "Speciality", value: item.specialityName },
            { label: "Stream", value: item.streamOfPracticeName },
            { label: "Duration", value: `${item.durationInMonths} months` },
            { label: "Start Date", value: item.startDate },
            { label: "End Date", value: item.endDate },
            { label: "Subscribed On", value: item.subscribedOn },
            { label: "Payment ID", value: item.paymentId },
            { label: "Order ID", value: item.orderId },
          ]}
        />
      ))}
        </View>
        </ScrollView>

    )
}

export default Subscribed