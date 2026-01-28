import { TouchableOpacity , Text , StyleSheet } from "react-native"

function TabBuuton( { label , active , onPress }){
        return(
            
            <TouchableOpacity
            onPress={ onPress }
            style = {[
                styles.tab,
                active && styles.activeTab
            ]}
            activeOpacity={0.8}
            >
                <Text
                style = {[
                    styles.text,
                    active && styles.activeText
                ]}
                > 
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

const styles = StyleSheet.create({
    tab : {
        flex: 1,                 
        paddingVertical: 14,
        alignItems: 'center',
    },
    activeTab : {
        backgroundColor: '#4FC3F7',
    },
    text : {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
    },
    activeText : {
        color: '#FFFFFF',
    }
})
export default TabBuuton