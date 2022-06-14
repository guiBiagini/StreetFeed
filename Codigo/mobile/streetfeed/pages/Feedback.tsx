import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "../components/routes/Router";

export function Feedback(){
    const { goBack } = useRouter();
    return (
        <View style={styles.container}>
            <Pressable onPress={goBack}>
                <Text>Feedback</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})