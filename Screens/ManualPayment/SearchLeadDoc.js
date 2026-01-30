import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList , ScrollView } from 'react-native';
import DateRangePicker from '../../Components/DateRangePicker';
import ExpandableCard from '../../Components/ExpandableCard';
import InterestFlow from '../../Components/Calls/IntrestFlow';
import { Ionicons } from '@expo/vector-icons';

function SearchLeadDoc() {
  const { sessionToken, user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [showInterest, setShowInterest] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  // fetch doctor data
  async function getData(mobile) {
    try {
      const res = await axios.post(
        'https://svcdev.whitecoats.com/agent/getLeadDoctorByMobile',
        {  mobileNo: "6301830161" },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      console.log(res.data.leadDoctorByMobileNumber);
      setData(res.data.leadDoctorByMobileNumber || []);
    } catch (err) {
      console.log('Error fetching doctor data:', err);
    }
  }

  // fetch plan data for selected doctor when Subscribe button is clicked
  async function handleSubscribe(item) {
    try {
      const res = await axios.post(
        'https://svcdev.whitecoats.com/agent/planListing',
        {
          leadId: item.leadId,
          doctorId: item.doctorId,
          agentId: user.agentId,
          showAllPlans: false,
        },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      setPlanData(res.data);
      setSelectedItem(item);
      setShowInterest(true);
    } catch (err) {
      console.log('PLAN API ERROR:', err);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {/* DATE RANGE + MOBILE FILTER */}
      <DateRangePicker
        showMobile={true}
        onMobileChange={(val) => {}}
        onSubmit={(mobile) => getData(mobile)}
      />

      {/* DOCTOR LIST */}
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.doctorId)}
          renderItem={({ item }) => (
            <ExpandableCard
              header={item.name}
              subHeader={item.mobileNo}
              showSubscribe={true}
              onSubscribePress={() => handleSubscribe(item)}
              rows={[
                { label: 'Email', value: item.email },
                { label: 'Name', value: item.name },
                { label: 'Lead ID', value: item.leadId },
                { label: 'Specialization', value: item.specialization ?? 'N/A' },
                { label: 'Mobile No', value: item.mobileNo ?? 'N/A' },
              ]}
            />
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Text>No results</Text>
        </View>
      )}

      {/* INTEREST FLOW MODAL */}
      <Modal
        visible={showInterest}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInterest(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowInterest(false)}
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </TouchableOpacity>
            <ScrollView
                    contentContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                  >
            {selectedItem && planData && (
              <InterestFlow
                leadData={selectedItem}
                planData={planData}
                sessionToken={sessionToken}
                onClose={() => setShowInterest(false)}
              />
             
            )}
             </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 6,
  },
});

export default SearchLeadDoc;
