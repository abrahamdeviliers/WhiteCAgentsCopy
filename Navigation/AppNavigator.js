import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import BottomTabs from './BottomTabs';
import Intrested from '../Screens/Intrested';
import AgentCancelled from '../Screens/AgentCancelled';
import SimpleTabs from '../Screens/search/SimpleTabs';
import Subscribed from '../Screens/Subscribed';
import RejectedSubscription from '../Screens/RejectedSubscription';
import Coupon from '../Screens/Coupon';
import Renewels from '../Screens/Renewels';
import ManualPayment from '../Screens/ManualPayment';
import Profile from '../Screens/Profile';
const stack = createNativeStackNavigator()
function AppNavigator(){

    return (

        <NavigationContainer>

            <stack.Navigator>

                <stack.Screen 
                name='login'
                component={ LoginScreen }
                options={{headerShown : false}}
                />

                <stack.Screen 
                name='Bottomtabs'
                component={ BottomTabs }
                />

                <stack.Screen name="intrested" component={ Intrested }  />

                <stack.Screen name="search" component={ SimpleTabs  }  />

                <stack.Screen name="subscribed" component={  Subscribed  }  />

                <stack.Screen name="RejectedSubscriptions" component={ RejectedSubscription } />

                <stack.Screen name="Coupons"  component={ Coupon  }  />

                <stack.Screen name="Renewals" component={ Renewels }  />

                <stack.Screen name="AgentCancelled" component={ AgentCancelled }  />

                <stack.Screen name="manualpayment" component={ ManualPayment  }  />

                <stack.Screen name='profile' component={ Profile } />

            </stack.Navigator>

        </NavigationContainer>

    )
}

export default AppNavigator