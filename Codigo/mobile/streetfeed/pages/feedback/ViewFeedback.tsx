import { StyleSheet, Text, View } from "react-native";
import { FontAwesome, Feather, MaterialIcons, Octicons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";
import { mapCustomStyles } from "../../utils/mapUtils";
import { GetFeedback } from "../../services/feedbackServices";

interface IViewFeedbackProps {
    idFeedback: number
}

export default function ViewFeedback(props: IViewFeedbackProps) {

    const feedback = GetFeedback(props.idFeedback);
    const [ latitude, longitude ] = [ Number(feedback.y), Number(feedback.x) ]

    const date = new Date(feedback.createdAt);
    const dateString = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

    return (
        <View>
            <MapView
                style={styles.minimap}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0020,
                    longitudeDelta: 0.0020,
                }}
                showsUserLocation

                customMapStyle={mapCustomStyles}
            >
                <Marker
                    coordinate={{
                        latitude,
                        longitude
                    }}
                    anchor={{
                        x: .5,
                        y: 0
                    }}
                >
                    <View>
                        <FontAwesome color="#c80815" size={35} name="exclamation-triangle" />
                    </View>
                </Marker>
            </MapView>
            <View style={styles.infoDiv}>
                <MaterialIcons color="#333333" name="feedback" size={46} />
                <View style={styles.infoTextDiv}>
                    <Text style={styles.infoTitle}>Tipo de Feedback</Text>
                    <Text style={styles.infoText}>{feedback.tipo}</Text>
                </View>
            </View>
            <View style={styles.infoDiv}>
                <Feather color="#333333" name="heart" size={46} />
                <View style={styles.infoTextDiv}>
                    <Text style={styles.infoTitle}>Confirmações</Text>
                    <Text style={styles.infoText}>{feedback.score}</Text>
                </View>
            </View>
            <View style={styles.infoDiv}>
                <FontAwesome color="#333333" name="user" size={46} />
                <View style={styles.infoTextDiv}>
                    <Text style={styles.infoTitle}>Usuário que registrou</Text>
                    <Text style={styles.infoText}>{feedback.usuario}</Text>
                </View>
            </View>
            <View style={styles.infoDiv}>
                <FontAwesome color="#333333" name="calendar" size={46} />
                <View style={styles.infoTextDiv}>
                    <Text style={styles.infoTitle}>Data de Registro</Text>
                    <Text style={styles.infoText}>{dateString}</Text>
                </View>
            </View>
            <Text style={styles.desciptionSpan}>- {feedback.descricao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    minimap: {
        height: 200
    },
    infoDiv: {
        height: 100,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#CCC",
        flexDirection: "row",
        padding: 25,
        alignItems: "center"
    },
    infoTextDiv: {
        marginLeft: 25
    },
    infoTitle: {
        fontSize: 14,
        color: "#555"
    },
    infoText: {
        fontSize: 22,
        fontWeight: "bold"
    },
    desciptionSpan: {
        padding: 25,
        fontSize: 16,
        fontWeight: "500"
    }
});