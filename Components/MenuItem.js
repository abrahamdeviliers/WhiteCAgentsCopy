import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity , StyleSheet , Text } from "react-native"
function MenuItem( { icon , label , danger , onPress }){

    return (
        <TouchableOpacity  style = {styles.item} onPress={onPress} >

            <Ionicons 
            name={icon}
            size={20}
            color={ danger ? '#EF4444' : '#111' }
            />
            <Text style = { [styles.label , danger && { color : '#EF4444' }] }>
                {label}
            </Text>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    item : {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    label : {
        marginLeft: 12,
        fontSize: 15,
        fontWeight: '500',
    }
})

export default MenuItem