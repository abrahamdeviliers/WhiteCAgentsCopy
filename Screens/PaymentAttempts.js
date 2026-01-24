import { View } from 'react-native';
import ExpandableCard from '../Components/ExpandableCard';
import DateRangePicker from '../Components/DateRangePicker';

const paymentAttempts = [
  {
    doctorName: 'Anshul Mishra',
    mobile: '7078830680',
    amount: '₹21240',
    orderId: 10602,
    interestedId: 11884,
    duration: '3 Months',
    paymentId: '-',
    attemptedOn: '11-Sep-2025 07:43 AM',
  },
];

function PaymentAttempts() {
  return (
    <View>
         <DateRangePicker 
        showStartDate = {true}
        showEndDate = {true}
        showMobile = {true}
      />
     
      {paymentAttempts.map((item, index) => (
        <ExpandableCard
          key={index}
          header={item.doctorName}
          subHeader={item.mobile}
          amount={item.amount}
          badgeText="Attempted"
          rows={[
            { label: 'Order ID', value: item.orderId },
            { label: 'Interested ID', value: item.interestedId },
            { label: 'Duration', value: item.duration },
            { label: 'Payment ID', value: item.paymentId },
            { label: 'Attempted On', value: item.attemptedOn },
          ]}
        />
      ))}
    </View>
  );
}

export default PaymentAttempts;
