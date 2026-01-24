import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Dashboard from "../Screens/Dashboard"
import Calls from "../Screens/Calls"
import PaymentAttempts from "../Screens/PaymentAttempts"
import More from "../Screens/More"
import { useState } from "react"
import MoreMenu from "../Components/MoreMenu"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import CustomTabBar from "../CustomTabbar/CustomTabBar"

const Tab = createBottomTabNavigator()

function BottomTabs(){

    const [ showMenu , setShowMenu ] = useState(false)

    const navigation = useNavigation()
    return(


        <>
        <Tab.Navigator screenOptions={ ({ route }) => ({
            headerShown : false,
            tabBarStyle : {
                height : 70,
                // borderTopLeftRadius : 24,
                // borderTopRightRadius : 24
                borderRadius : 100
            },
            tabBarIcon : ( {color , size } ) => {
                let icon = 'home-outline';

                if(route.name === 'Home') icon = 'home-outline';
                if (route.name === 'calls') icon = 'call-outline';
                if (route.name === 'Payment Attempts') icon = 'wallet-outline';
                if (route.name === 'More') icon = 'menu-outline';

                return <Ionicons name={icon} size={size} color={color} />;
            },
            
        })
        
        }

        tabBar = { (props) => <CustomTabBar
            {...props}
            onMorePress={() => setShowMenu(true)}
          />}
        >

            <Tab.Screen name ='Home' component={ Dashboard }  />

            <Tab.Screen  name="calls" component={ Calls }  />

            <Tab.Screen name="Payment" component={ PaymentAttempts }  />

            <Tab.Screen name="More"  
            
            component={ Dashboard } 
            
            listeners={{
                tabPress : (e) => {
                    e.preventDefault();
                    setShowMenu(true)
                }
            }}
            />

            
        </Tab.Navigator>

        <MoreMenu 
        visible={showMenu}
        onClose={ () => setShowMenu(false)}
        onNavigate={ (screen) => {
            setShowMenu(false)
            navigation.navigate(screen)
        } }
        />
        </>

    )
}

export default BottomTabs