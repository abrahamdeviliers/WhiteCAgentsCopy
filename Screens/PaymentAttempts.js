import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ExpandableCard from '../Components/ExpandableCard';
import DateRangePicker from '../Components/DateRangePicker';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

function PaymentAttempts() {
  const [paymentAttempts, setPaymentAttempts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { sessionToken } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    mobile: '',
  });

  async function getDate() {
    try {
      const res = await axios.post(
        'http://svcdev.whitecoats.com/emp/paymentAttemptsListing',
        {
          fromDate: filters.startDate,
          toDate: filters.endDate,
          mobileNo: filters.mobile,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      setPaymentAttempts(res.data.paymentAttempts || []);
    } catch (err) {
      console.log(err);
    }
  }

  const VISIBLE_COUNT = 2;
  const visibleCards = paymentAttempts.slice(0, VISIBLE_COUNT);
  const remainingCards = paymentAttempts.slice(VISIBLE_COUNT);

  return (
    <View style={{ flex: 1 }}>
      <DateRangePicker
        showStartDate
        showEndDate
        showMobile
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

      {/* MAIN LIST */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {visibleCards.map((item, index) => (
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
              {
                label: 'Duration',
                value: `${item.durationInMonths} months`,
              },
              { label: 'Attempted On', value: item.attemptedOn },
              { label: 'Payment ID', value: item.paymentId ?? 'N/A' },
            ]}
          />
        ))}

        {remainingCards.length > 0 && (
          <TouchableOpacity
            style={styles.moreBtn}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.moreText}>
              More ({remainingCards.length})
            </Text>
          </TouchableOpacity>
        )}

        {paymentAttempts.length === 0 && (
          <Text style={styles.empty}>No results</Text>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}
    edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>All Payment Attempts</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 40 ,  }}>
            {remainingCards.map((item, index) => (
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
                  {
                    label: 'Duration',
                    value: `${item.durationInMonths} months`,
                  },
                  { label: 'Attempted On', value: item.attemptedOn },
                  { label: 'Payment ID', value: item.paymentId ?? 'N/A' },
                ]}
              />
            ))}
          </ScrollView>
        </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

export default PaymentAttempts;

const styles = StyleSheet.create({
  moreBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 80,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
  },
  moreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#7f8c8d',
  },
  modalHeader: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  close: {
    color: '#e74c3c',
    fontWeight: '700',
  },
});
