import { Text, View , StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Ionicons }from '@expo/vector-icons'
import { useContext, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
function LoginScreen( { navigation }){

    const [email , setEmail] = useState('')
 
    const [password , setPassword] = useState('')

    const [ Visible , setVisible ] = useState(false)

    const { setUser , setSessionToken } = useContext(AuthContext)

    async function postData() {

    if (!email || !password) {

      alert("Enter User ID and Password");

      return;

    }

    try {
        const response = await axios.post(
        'https://svcdev.whitecoats.com/agent/login',
        {
            email,
            password,
        },
    {headers: {
      "Content-Type": "application/json",
    },}
        );

      console.log("RAW RESPONSE:", response);

      console.log('status',response.data.serviceResponse.status)

      console.log(response.data.agent[0].agentId)

      console.log('session token',response.data.agent[0].sessionToken )


      const agentId = response.data.agent[0].agentId

      const session_token = response.data.agent[0].sessionToken

      setSessionToken(response.data.agent[0].sessionToken)

    if (response.data.serviceResponse.status === "Y") {
        
        const profileRes = await axios.get(`https://svcdev.whitecoats.com/agent/getAgent/${agentId}`,
            {
                headers : {
                    Authorization : ` Bearer ${session_token}`
                }
            }
        )

        // console.log('profile', profileRes)

        console.log("profile" , profileRes.data.agent[0].name)

        const agent = profileRes.data.agent[0]

        setUser({
            agentId : agent.agentId,
            name: agent.name?.trim() || "",
            email: agent.email,
            mobileNo: agent.mobileNo,
            designation: agent.designation,
            internalEmpId: agent.internalEmpId,
            countryCode: agent.countryCode,
            createdAt: agent.createdAt,
        })

        await AsyncStorage.setItem("sessionToken", session_token);
await AsyncStorage.setItem("user", JSON.stringify({
  agentId: agent.agentId,
  name: agent.name?.trim() || "",
  email: agent.email,
  mobileNo: agent.mobileNo,
  designation: agent.designation,
  internalEmpId: agent.internalEmpId,
  countryCode: agent.countryCode,
  createdAt: agent.createdAt,
}));

setSessionToken(session_token);
setUser({
  agentId: agent.agentId,
  name: agent.name?.trim() || "",
  email: agent.email,
  mobileNo: agent.mobileNo,
  designation: agent.designation,
  internalEmpId: agent.internalEmpId,
  countryCode: agent.countryCode,
  createdAt: agent.createdAt,
});
    } else {
    alert(response.data?.message || "Invalid credentials");
    }
        
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Network Error", "Unable to login");
    }
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor : '#EEF7FB'  }}>
        <View style = { styles.container }>

            <View style = { styles.mainContainer}>
                {/* main container */}

                <View style = { styles.logocont}>
                    {/* logo  container */}

                    <Text style = { styles.brandText}>
                        White<Text style = { styles.coatsfont}>Coats</Text>
                    </Text>

                    <Text style = { styles.textLight }>
                        Lead Tracker for Healthcare Agents
                    </Text>
                </View>

                <View style = { styles.logincont }>
                    {/* login container */}

                    <View>
                        {/* employee id */}

                        <Text style = { styles.label }>Employee Id</Text>

                        <View style = { styles.empcont }>
                            {/* id input field  */}

                            <Ionicons name='person-outline' size={20} color= '#9AA5B1' />
                            <TextInput 
                            placeholder='Enter Email Id'
                            placeholderTextColor='#9AA5B1'
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            style = { styles.inpt}
                            />
                        </View>

                        

                    </View>


                    <View>
                        {/* password */}

                        <Text style = { styles.label }> Passsword </Text>

                        <View style = { styles.passcont}>
                            {/* password input  */}
                            <Ionicons name='lock-closed-outline' size={20} color='#9AA5B1' />

                            <TextInput
                            placeholder='.....'
                            placeholderTextColor='#9AA5B1'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!Visible}   
                            style = { styles.inpt}
                            />

                            {/* eye icon  */}

                            <TouchableOpacity onPress={ () => setVisible(!Visible) }> 
                               <Ionicons  
                                name={ Visible ? 'eye-off-outline' : 'eye-outline'}
                                size={20} 
                                color='#9AA5B1'
                                />
                            </TouchableOpacity>

                        </View>

                    

                    </View>
                  

                  <TouchableOpacity style = { styles.sign } onPress={ postData }>
                      {/* signup button */}
                    
                    <Text style = { styles.signText}> Sign in </Text>

                  </TouchableOpacity>


                  <View style = { styles.forgetPass }>
                    
                    {/* forget password  */}

                    <Text style = { styles.textLight }> Forget Password?</Text>

                  </View>


                </View>

            </View>

            <View style ={ [ styles.forgetPass , styles.supportcont ] } >
                    {/* help text  */}

                    <Text style = { styles.textLight }>
                        Need help logging in?<Text style = { styles.support }>Contact Support </Text>
                    </Text>

                </View>

        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    coatsfont : {
        color : '#22C55E'
    },
    brandText : {

        fontSize : 28,
        fontWeight : '700',
        color : '#1F2933',
    },
    container : {
        flex : 1,
        backgroundColor : '#EEF7FB',
        padding : 16,
        alignItems : 'center'
    },
    mainContainer : {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    empcont : {
        flexDirection : 'row',
        alignItems : 'center',
        borderColor : '#E5E7EB',
        borderWidth : 1.5,
        borderRadius : 10,
        paddingHorizontal: 10,
        height: 48,
        gap: 8,
    },
    passcont : {
        flexDirection : 'row',
        alignItems : 'center',
        borderColor : '#E5E7EB',
        borderWidth : 1.5,
        borderRadius : 10,
        paddingHorizontal: 10,
        height: 48,
        gap: 8,
    },
    logincont : {
       backgroundColor: '#FFFFFF',
        borderRadius: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        padding: 20,
        gap: 16,
        width: '100%',
        maxWidth: 380,
    },
    inpt : {
        flex : 1,
    },
    support : {
        color : '#10A6A0',
        fontWeight : '600'

    },
    sign : {
        borderColor : '#10A6A0',
        backgroundColor : '#10A6A0',
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 10,
        padding : 10
    },
    signText : {
        color : 'white',
    },
    forgetPass : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    textLight : {
        color : '#6B7280'
    },
    logocont : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    label : {
        color : '#1F2933',
        fontSize : 18,
        fontWeight : '600',
        marginBottom : 8
    },
    supportcont : {
        marginTop : 10
    }

})
export default LoginScreen