import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SubmitEvent,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import LocationSvg from "../../assets/Images/svg/LocationSvg";
import TrashSvg from "../../assets/Images/svg/TrashSvg";
import CameraSvg from "../../assets/Images/svg/CameraSvg";

export default function CreatePostsScreen() {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const width = Dimensions.get("window").width - 16 * 2;
    setDimensions(width);
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onPress={keyboardHide}>
        <View>
          <View
            style={{
              ...styles.content,
              width: dimensions,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              // style={styles.btn}
              // onPress={formSubmit}
              type={SubmitEvent}
            >
              <CameraSvg />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoAction}>Load Photo</Text>
          <View>
            <TextInput
              style={styles.inputName}
              placeholder="Name..."
              onFocus={() => {
                setShowKeyboard(true);
              }}
            />
          </View>
          <View style={styles.locationContainer}>
            <LocationSvg style={styles.positionLogo} />
            <TextInput
              style={styles.inputLocation}
              placeholder="Location..."
              onFocus={() => {
                setShowKeyboard(true);
              }}
            />
          </View>
          {!showKeyboard && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              // onPress={formSubmit}
              type={SubmitEvent}
            >
              <Text style={styles.btnTitle}>Publish</Text>
            </TouchableOpacity>
          )}
        </View>
        {!showKeyboard && (
          <View style={styles.btnTrash}>
            <TouchableOpacity
              activeOpacity={0.7}
              // onPress={formSubmit}
              type={SubmitEvent}
            >
              <View>
                <TrashSvg />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  photoAction: {
    marginTop: 8,
    marginBottom: 48,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputName: {
    paddingBottom: 15,
    marginBottom: 32,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationContainer: { position: "relative" },
  positionLogo: { position: "absolute", top: -3, left: 1 },

  inputLocation: {
    paddingBottom: 15,
    marginBottom: 32,
    paddingLeft: 32,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  btn: {
    backgroundColor: "#F6F6F6",
    height: 51,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: { color: "#BDBDBD", fontSize: 16, lineHeight: 19 },
  btnTrash: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
