import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import DateRangePicker from '../../Components/DateRangePicker';
import ExpandableCard from '../../Components/ExpandableCard';
import InterestRoot from '../../Components/Calls/InterestRoot'; // ✅ Changed to InterestRoot
import { Ionicons } from '@expo/vector-icons';


function SearchLeadDoc() {
  const { sessionToken, user } = useContext(AuthContext);
  const [mobile, setMobile] = useState(""); // ✅ Add mobile state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Add loading
  
  // Step-based flow
  const [step, setStep] = useState("LIST");
  const [selectedItem, setSelectedItem] = useState(null);
  const [planData, setPlanData] = useState(null);

  // ✅ Fixed: Handle mobile input + loading
  async function getData(searchMobile) {
    if (!searchMobile || searchMobile.trim() === "") {
      console.log("❌ Empty mobile number");
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Searching for mobile:", searchMobile);
      
      const res = await axios.post(
        'https://svcdev.whitecoats.com/agent/getLeadDoctorByMobile',
        { mobileNo: searchMobile }, // ✅ Use searchMobile param
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );

      console.log("✅ Doctors found:", res.data.leadDoctorByMobileNumber);
      setData(res.data.leadDoctorByMobileNumber || []);
      setStep("LIST");
    } catch (err) {
      console.log('❌ Error fetching doctor data:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- STEP 1: DOCTOR LIST ---------------- */
  if (step === "LIST") {
    return (
      <View style={{ flex: 1 }}>
        {/* ✅ Fixed DateRangePicker */}
        <DateRangePicker
          showMobile={true}
          onMobileChange={setMobile} // ✅ Store mobile value
          onSubmit={() => getData(mobile)} // ✅ Pass mobile to getData
          loading={loading} // ✅ Show loading in picker
        />

        {/* DOCTOR LIST */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563EB" />
            <Text style={styles.loadingText}>Searching doctors...</Text>
          </View>
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.doctorId)}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ExpandableCard
                header={item.name}
                subHeader={item.mobileNo}
                showSubscribe={true}
                onSubscribePress={() => handleSubscribe(item)}
                rows={[
                  { label: 'Email', value: item.email || 'N/A' },
                  { label: 'Name', value: item.name },
                  { label: 'Lead ID', value: item.leadId },
                  { label: 'Specialization', value: item.specialization ?? 'N/A' },
                  { label: 'Mobile No', value: item.mobileNo ?? 'N/A' },
                ]}
              />
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#64748B" />
            <Text style={styles.emptyText}>
              {mobile ? `No doctors found for ${mobile}` : "Enter mobile number to search"}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // handleSubscribe function (same as before)
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
      setStep("INTEREST_ROOT");
    } catch (err) {
      console.log('PLAN API ERROR:', err);
    }
  }

  /* ---------------- STEP 2: INTEREST ROOT ---------------- */
  return (
    <View style={{ flex: 1 }}>
      <InterestRoot
        leadData={selectedItem}
        planData={planData}
        dropdowns={{}}
        onClose={() => setStep("LIST")}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
  },
});

export default SearchLeadDoc;
