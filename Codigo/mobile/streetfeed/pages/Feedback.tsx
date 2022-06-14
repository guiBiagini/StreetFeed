import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "../components/routes/Router";

import { FontAwesome } from '@expo/vector-icons';
import ViewFeedback from "./feedback/ViewFeedback";
import CreateFeedback from "./feedback/CreateFeedback";

export function Feedback() {

    const { goBack, route } = useRouter();
    const idFeedback: string | undefined = route.split("/")[1];
    
    return (
        <View>
            <View style={styles.header}>
                <Pressable onPress={goBack}>
                    <FontAwesome
                        name="arrow-left"
                        color="#FFF"
                        size={30}
                    />
                </Pressable>
            </View>
            {
                (idFeedback && !isNaN(Number(idFeedback))) ? (
                    <ViewFeedback 
                        idFeedback={Number(idFeedback)}
                    />
                ) : (
                    <CreateFeedback />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: Dimensions.get('window').width,
        flexDirection: "row",
        backgroundColor: '#00A86B',
        alignItems: 'center',
        padding: 10
    }
})