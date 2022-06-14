import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather, FontAwesome } from '@expo/vector-icons';

import MapView, { Marker, Callout, PROVIDER_GOOGLE, EventUserLocation, Region } from 'react-native-maps';
import { useRouter } from '../components/routes/Router';
import { getCurrentPositionAsync, LocationObjectCoords, useForegroundPermissions } from 'expo-location';

export default function MapPage() {
  const [locationStatus, requestLocation] = useForegroundPermissions();

  useEffect(() => {
    if (!locationStatus?.granted)
      requestLocation()
  }, [])

  if (locationStatus?.granted) {
    return <MapPageComponent />
  }
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

function usePosition() {
  const [coords, setCoords] = useState<LocationObjectCoords>();
  useEffect(() => {
    getCurrentPositionAsync().then((pos) => {
      setCoords(pos.coords);
    })
  }, []);

  return coords;
}

function MapPageComponent() {
  const [ followUserLocation, setFollowUserLocation ] = useState(true);

  const navigation = useRouter();
  const map = useRef<MapView>(null);
  
  const userCoords = usePosition();

  const [ region, setRegion ] = useState<Region>({
    latitude: userCoords?.latitude ?? -19.9331392,
    longitude: userCoords?.longitude ?? -43.9370872,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  function handleProfileClick() {
    navigation.navigate("profile");
  }

  function handleAddButtonClick() {
    navigation.navigate("feedback");
  }

  const userLocationChanged = (event: EventUserLocation) => {
    if (followUserLocation){
      const newRegion = event.nativeEvent.coordinate;
      const regionObj = {
        ...region,
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      };
      setRegion(regionObj);

      animateToRegion(regionObj);
    }
  }

  const animateToRegion = (region: Region) => {
    map.current?.animateToRegion({latitude: region.latitude, longitude: region.longitude,
        latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta}, 1000);
  }

  const regionChanged = (region: Region) => {
    if (followUserLocation){
      setRegion({
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

        customMapStyle={[
          {
            elementType: "labels",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.neighborhood",
            stylers: [
              {
                visibility: "off"
              }
            ]
          }
        ]}
        style={styles.mapStyle}
        region={region}
      >
        <Marker
          coordinate={{
            latitude: -19.9331390,
            longitude: -43.9370870
          }}
        >
          <View>
            <FontAwesome color="#c80815" size={35} name="exclamation"/>
          </View>
          <Callout tooltip={true} onPress={() => { }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Buraco</Text>
              <View style={styles.likesSpan}>
                <Feather name='heart' />
                <Text>8</Text>
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.profileContainer}>
        <Button
          onPress={handleProfileClick}
          title="Perfil"
        />
      </View>

      <View style={styles.addFeedbackContainer}>
        <Button
          onPress={handleAddButtonClick}
          title="Adicionar"
          color="#00A86B"
        />
      </View>

      <View style={styles.followContainer} >
        <Button
          onPress={()=>setFollowUserLocation(true)}
          title="Seguir"
          color="#AC6AB9"
        />
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