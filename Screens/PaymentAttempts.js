import { ScrollView, View , Text } from 'react-native';
import ExpandableCard from '../Components/ExpandableCard';
import DateRangePicker from '../Components/DateRangePicker';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'
import { useState } from 'react';

function PaymentAttempts() {

  const [ paymentAttempts , setPaymentAttempts ] = useState([])

  const { sessionToken } = useContext(AuthContext)

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    mobile: "",
  });

  async function getDate(){

    let k = await axios.post('http://svcdev.whitecoats.com/emp/paymentAttemptsListing',
      {
        fromDate : filters.startDate,
        toDate : filters.endDate,
        mobileNo : filters.mobile,
      },
      {
        headers : {
          Authorization : `Bearer ${sessionToken}`
        }
      }
    )

    console.log(k.data)

    setPaymentAttempts(k.data.paymentAttempts)
  }
  return (
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
        onMobileChange={(val) =>
          setFilters((prev) => ({ ...prev, mobile: val }))
        }
        onSubmit={getDate}

      />
     <ScrollView style = {{ paddingBottom : 120 }}>
     { paymentAttempts ? (
     paymentAttempts.map((item, index) => (
      <ExpandableCard
        key={item.orderId ?? index}
        header={item.doctorName}
        subHeader={item.mobileNo}
        amount={`₹ ${item.amount}`}
        badgeText="Attempted"
        rows={[
          { label: 'Plan', value: item.planName },
          { label: 'Order ID', value: item.orderId },
          { label: 'Interested ID', value: item.interestedId },
          { label: 'Duration', value: `${item.durationInMonths} months` },
          { label: 'Attempted On', value: item.attemptedOn },
          { label: 'Payment ID', value: item.paymentId ?? 'N/A' },
        ]}
      />
    ))
  ) : <Text style= {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}> no results </Text>
  }
    </ScrollView>
    </View>
  );
}

export default PaymentAttempts;
