import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Button, Pressable } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';

import MapView, { Marker, Callout, PROVIDER_GOOGLE, EventUserLocation, Region } from 'react-native-maps';
import { useRouter } from '../components/routes/Router';
import { getCurrentPositionAsync, LocationObjectCoords, useForegroundPermissions } from 'expo-location';
import { mapCustomStyles } from '../utils/mapUtils';
import { usePosition } from '../hooks/usePosition';
import { useListaFeedbacks } from '../services/feedbackServices';

export default function MapPage() {
  const [locationStatus, requestLocation] = useForegroundPermissions();

  useEffect(() => {
    if (!locationStatus?.granted)
      requestLocation()
  }, [])

  if (locationStatus?.granted) {
    return <MapPageComponent />
  }
  else if (!locationStatus)
    return <View></View>
  else {
    return (
      <View style={styles.requestPermitionContainer}>
        <Button
          onPress={requestLocation}
          title="Você precisa liberar permissão de localização para utilizar o app"
        />
      </View>
    )
  }

}

function MapPageComponent() {
  const [followUserLocation, setFollowUserLocation] = useState(true);

  const navigation = useRouter();
  const map = useRef<MapView>(null);

  const userCoords = usePosition();

  const regionRef = useRef<Region>({
    latitude: userCoords?.latitude ?? -19.9331392,
    longitude: userCoords?.longitude ?? -43.9370872,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const lstFeedbacks = useListaFeedbacks();

  function handleProfileClick() {
    navigation.navigate("profile");
  }

  function handleAddButtonClick() {
    navigation.navigate("feedback");
  }

  function handleCalloutButtonClick(idFeedback: number) {
    navigation.navigate(`feedback/${idFeedback}`);
  }

  const userLocationChanged = (event: EventUserLocation) => {
    if (followUserLocation) {
      const newRegion = event.nativeEvent.coordinate;
      const regionObj = {
        ...regionRef.current,
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      };
      regionRef.current = (regionObj);

      animateToRegion(regionObj);
    }
  }

  const animateToRegion = (region: Region) => {
    map.current?.animateToRegion({
      latitude: region.latitude, longitude: region.longitude,
      latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta
    }, 1000);
  }

  const regionChanged = (region: Region) => {
    if (followUserLocation) {
      regionRef.current = ({
        longitudeDelta: region.longitudeDelta,
        latitudeDelta: region.latitudeDelta,
        latitude: region.latitude,
        longitude: region.longitude
      });

    }
  }

  const onDrag = () => {
    setFollowUserLocation(false);
    return false;
  }



  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map}
        showsUserLocation
        showsCompass={true}
        showsIndoorLevelPicker

        showsMyLocationButton={false}
        onUserLocationChange={(event) => followUserLocation && userLocationChanged(event)}
        onRegionChange={regionChanged}
        followsUserLocation={followUserLocation}

        onMoveShouldSetResponder={onDrag}

        customMapStyle={mapCustomStyles}
        style={styles.mapStyle}
        region={regionRef.current}
      >
        {
          lstFeedbacks.map(feedback => (
            <Marker
              coordinate={{
                latitude: Number(feedback.y),
                longitude: Number(feedback.x)
              }}
              key={feedback.id_feedback}
            >
              <View>
                <FontAwesome color="#c80815" size={35} name="exclamation-triangle" />
              </View>
              <Callout tooltip={true} onPress={() => handleCalloutButtonClick(feedback.id_feedback)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{feedback.tipo}</Text>
                  <View style={styles.likesSpan}>
                    <Feather name='heart' />
                    <Text>{feedback.score}</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>

      {/* <View style={styles.profileContainer}>
        <Button
          onPress={handleProfileClick}
          title="Perfil"
        />
      </View> */}

      <View style={styles.addFeedbackContainer}>
        <Pressable onPress={handleAddButtonClick}>
          <RectButton style={styles.addFeedbackButton}>
            <Feather name='plus' color="#FFF" size={35} />
          </RectButton>
        </Pressable>
      </View>

      <View style={styles.followContainer} >
        <Pressable onPress={() => setFollowUserLocation(true)}>
          <RectButton style={styles.followButton}>
            <FontAwesome name='street-view' color="#FFF" />
          </RectButton>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  requestPermitionContainer: {
    marginTop: 50
  },

  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row'
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
  },

  likesSpan: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  profileContainer: {
    position: 'absolute',
    bottom: 10,
    left: 5,

    elevation: 3,
  },
  addFeedbackContainer: {
    position: 'absolute',
    bottom: 10,
    right: Dimensions.get('window').width / 2 - 75 / 2,

    elevation: 3,
  },
  followContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,

    elevation: 3,
  },
  followButton: {
    borderRadius: 35,
    height: 35,
    width: 35,

    backgroundColor: '#AC6AB9',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  profileButton: {
    borderRadius: 50,
    height: 50,
    width: 50,

    padding: 10,

    backgroundColor: '#AC6AB9',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  addFeedbackButton: {
    borderRadius: 75,
    height: 75,
    width: 75,

    backgroundColor: '#00A86B',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  }
});