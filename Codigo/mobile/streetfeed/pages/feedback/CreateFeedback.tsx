import { LocationObjectCoords } from "expo-location";
import { useRef, useState } from "react";
import { Button, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { usePosition } from "../../hooks/usePosition";
import { mapCustomStyles } from "../../utils/mapUtils";


import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useRouter } from "../../components/routes/Router";
import { CadastrarFeedback } from "../../services/feedbackServices";

interface ICreateFeedbackComponentProps {
    coords: LocationObjectCoords
}
type tipoFeedback = "Buraco" | "Rua Íngrime" | "Rua Estreita";
const tipoFeedbackArray: Array<tipoFeedback> = ["Buraco", "Rua Íngrime", "Rua Estreita"];

export default function CreateFeedback() {

    const coords = usePosition();

    if (coords) {
        return (
            <CreateFeedbackComponent coords={coords} />
        )
    }
    else {
        return (
            <View />
        )
    }
}

function CreateFeedbackComponent(props: ICreateFeedbackComponentProps) {

    const { goBack } = useRouter();

    const [feedbackCoords, setFeedbackCoords] = useState({
        x: props.coords.longitude,
        y: props.coords.latitude
    });
    const [tipo, setTipo] = useState<tipoFeedback>("Buraco");
    const descricaoRef = useRef("");

    function handleFormSubmit() {
        CadastrarFeedback({
            descricao: descricaoRef.current,
            tipo,
            x: String(feedbackCoords.x),
            y: String(feedbackCoords.y)
        }).then(()=>{
            goBack();
        })
    }

    return (
        <View>
            <MapView
                style={styles.minimap}
                initialRegion={{
                    latitude: feedbackCoords.y,
                    longitude: feedbackCoords.x,
                    latitudeDelta: 0.0020,
                    longitudeDelta: 0.0020,
                }}
                showsUserLocation
                onPress={event => {
                    setFeedbackCoords({
                        x: event.nativeEvent.coordinate.longitude,
                        y: event.nativeEvent.coordinate.latitude
                    })
                }}

                customMapStyle={mapCustomStyles}
            >
                <Marker
                    coordinate={{
                        latitude: feedbackCoords.y,
                        longitude: feedbackCoords.x,
                    }}
                    anchor={{
                        x: .5,
                        y: .5
                    }}
                >
                    <View>
                        <FontAwesome color="#c80815" size={35} name="exclamation-triangle" />
                    </View>
                </Marker>
            </MapView>
            <View style={styles.form}>
                <View>
                    <View>
                        <TextInput
                            style={styles.input}
                            multiline
                            numberOfLines={2}
                            placeholder="Descrição"
                            onChangeText={ text => descricaoRef.current = text }
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Tipo de feedback</Text>
                        {
                            tipoFeedbackArray.map(tipoFeedback => (
                                <TouchableOpacity 
                                    activeOpacity={.4} 
                                    onPress={() => setTipo(tipoFeedback)}
                                    key={tipoFeedback}
                                >
                                    <Text style={{
                                        ...styles.option,
                                        ...(tipo===tipoFeedback?styles.selected:{})
                                    }}>{tipoFeedback}</Text>

                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <Button
                    onPress={handleFormSubmit}
                    title="Criar Feedback"
                    color="#00A86B"
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    minimap: {
        height: 200
    },
    form: {
        height: Dimensions.get("window").height - 200 - 50,
        justifyContent: "space-between",
        padding: 10
    },
    label: {
        color: '#8fa7b3',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    option: {
        padding: 20,
        fontSize: 22,
        fontWeight: "900",
    },
    selected: {
        backgroundColor: "#d3e2e6"
    }
});