import { View , Text, ScrollView } from "react-native"
import DateRangePicker from "../Components/DateRangePicker"
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useState } from "react";
import ExpandableCard from "../Components/ExpandableCard";

function Renewels(){

    const [mobile , setMobile ]  = useState('')

    const [ renewals , setRenewels ]  = useState([])

    const { sessionToken } = useContext(AuthContext)

    async function getData(){
        
        let k = await axios.post('https://svcdev.whitecoats.com/agent/getRenewalListing',
            {
                mobileNo : mobile,
                agentId : 119
            },
            {
                headers : {
                    Authorization : ` Bearer ${sessionToken}`
                }
            }
        )

        console.log(k.data)
        setRenewels(k.data.renewalListing)
    }

    return(

        <>
        <DateRangePicker 
            showMobile = {true}
            onMobileChange = { (val) => setMobile(val)}
            onSubmit = {getData}
        />
        <ScrollView>
        {renewals.map((item, index) => (
        <ExpandableCard
          key={index}
          header={item.name}
          subHeader={item.specialityName}
          badgeText={item.planName}
          amount={`#${item.subscriptionId}`}
          rows={[
            { label : 'DoctorId' , value : item.doctorId},
            { label: "Mobile", value: item.mobile },
            { label: "Start Date", value: item.startDate },
            { label: "End Date", value: item.endDate },
            { label : 'PlanId' , value : item.planId},
            { label : 'planPricingId' , value : item.planPricingId},
            { label : 'practiceId' , value : item.practiceId},
            { label : 'specialityId' , value : item.specialityId},
            { label : 'specialityName' , value : item.specialityName},
            { label : 'subscriptionId' , value : item.subscriptionId},
            { label : 'subscriptionOrderId' , value : item.subscriptionOrderId},
          ]}
        />
      ))}
      </ScrollView>
        </>
    )
}

export default Renewels