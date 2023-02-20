import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function MapScreen({ route }) {
  const longitude = route.params.item.longitude;
  const latitude = route.params.item.latitude;
  const name = route.params.item.name;
  const location = route.params.item.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType="standard"
      >
        <Marker
          title={name}
          coordinate={{ latitude: latitude, longitude: longitude }}
          description={location}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
