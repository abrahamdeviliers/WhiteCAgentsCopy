import { View , Text }  from 'react-native'
import DateRangePicker from '../../Components/DateRangePicker'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import ExpandableCard from '../../Components/ExpandableCard'
import LeadDetailsModal from '../../Components/LeadDetailsModal'

const normalizedLeads = (apiData = []) =>
  apiData.map(item => ({
    leadId: item.leadId,
    name: item.name,
    mobile: item.mobile,
    email: item.email,
    city: item.city,
    state: item.state,
    country: item.country,
    area: item.area,
    street: item.street,
    zip: item.zip_Code,
    leadStatus: item.lead_Status,
    specialization: item.specialization,
  }));

function SearchLead(){

  const [ leadDetails , setLeadDetails ] = useState([])


  const [ leadsAllData , setLeadsAllData ]  = useState([])

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);

  const [loadingLead, setLoadingLead] = useState(false);


  const { sessionToken } = useContext(AuthContext)

  const { user } = useContext(AuthContext)

  const [ filters , setFilters] = useState({
    mobile : '',
  })

 async function getData() {

  console.log("Token:", sessionToken);
  console.log("Agent ID:", user?.agentId);
  console.log("Mobile:", filters.mobile);

  try {
    console.log("Submit clicked"); // 👈 add this

    const res = await axios.post(
      'http://3.108.248.132:8090/WhiteCoatsCore/lead/searchLead',
      {
        agentId: user?.agentId,
        mobile: filters.mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    console.log("API success:", res.data);

    const list = normalizedLeads(res.data.searchLeadReq || []);
    setLeadDetails(list);
  } catch (error) {
    console.log("API error:", error.response?.data || error.message);
  }

}

 const fetchLeadDetails = async (leadId) => {
  try {
    setLoadingLead(true);

    const res = await axios.post(
      'http://3.108.248.132:8090/WhiteCoatsCore/lead/searchLeadDetails',
      { 
        agentId : user?.agentId,
        leadId
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    setLeadsAllData(res.data);
    setModalVisible(true);

    console.log('api fetcg succesfully fetchLeadDetails')
    console.log("fetchLeadDetails",res.data)
  } catch (err) {
    Alert.alert("Error", "Failed to load lead details");
    console.log(err.response?.data || err.message);
  } finally {
    setLoadingLead(false);
  }
};

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
                  key={item.leadId}
                  header={item.name}
                  subHeader={item.mobile}
                  badgeText={item.leadStatus}
                  rows={[
                    { label: "Email", value: item.email },
                    { label: "City", value: item.city },
                    { label: "State", value: item.state },
                    { label: "Specialization", value: item.specialization ?? "N/A" },
                  ]}
                onInfo={() => fetchLeadDetails(item.leadId)}                />
               ))
             ) : <Text style= {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}> no results </Text>
          }


          <LeadDetailsModal
          visible={modalVisible}
          data={leadsAllData}
          onClose={() => {
            setModalVisible(false);
            setSelectedLead(null);
          }}
        />
        
      </View>   

    )
}

export default SearchLead