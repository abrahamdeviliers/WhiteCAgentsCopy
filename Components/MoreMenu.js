import { View , Text , StyleSheet,TouchableOpacity , Pressable , Dimensions  } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MenuItem from './MenuItem';
import { confirmLogout } from '../utils/confirmLogout';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

function MoreMenu( { visible , onClose , onNavigate }){

    const navigation = useNavigation();

    const { logout } = useContext(AuthContext);

    if (!visible) return ;

    return(
        <>
        <Pressable  style = { styles.backdrop}  onPress={onClose}/>
        
        <View style = { styles.menu}>
        
            <MenuItem icon='people-outline' label='Intrested' onPress = { () => onNavigate('intrested') }  />
            <MenuItem icon='search-outline' label='Search ' onPress={ () => onNavigate('search')}  />
            <MenuItem icon= 'add-circle-outline'  label='subscribed' onPress={ () => onNavigate('subscribed')} />
            <MenuItem icon='ban' label='Rejected Subscriptions' onPress={ () => onNavigate('RejectedSubscriptions')} />
            <MenuItem icon='refresh' label='Renewals' onPress={ () => onNavigate('Renewals')}  />
            <MenuItem icon='pricetag-outline' label='Coupons' onPress={ () => onNavigate('Coupons')}  />
            <MenuItem icon='close-circle-outline' label='Agent Cancelled' onPress={ () => onNavigate('AgentCancelled')}  />
            <MenuItem icon='cash-outline'  label='Manual Payment'  onPress={ () => onNavigate('manualpayment')}  />
            <MenuItem icon='person-add-outline'  label='New lead'  onPress={ () => onNavigate('newlead')}  />

            <MenuItem icon="log-out-outline"
             label="Log Out"
             danger 
             onPress={() => {
                 onClose();
                confirmLogout(navigation, logout);
            }}
              />

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    backdrop : {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    menu: {
    position: 'absolute',

    bottom: 110,

    
    right: 12,
    width: SCREEN_WIDTH * 0.48,

    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 25,
    elevation: 25,
  },

})
export default MoreMenu