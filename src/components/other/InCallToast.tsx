import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { SButton, SText, SView } from "~base";
import { selectUiState } from "~helpers";
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const InCallToast = () => {
  const { userRole, userCall, isOnCallScreen } = useSelector(selectUiState);
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse()); // Repeat the animation
    };

    pulse();
  }, [opacityValue]);
  const navigation = useNavigation<any>();
  return userCall.inCall && !window?.isCallScreenActive ? (
    <SafeAreaView style={{ paddingHorizontal: 15 }}>
      <SView
        className={`bg-white p-1 rounded-lg border mt-1 border-${
          userRole === "CaseManager" ? "manager" : "customer"
        } pl-2`}
      >
        <SButton
          onPress={() =>
            navigation.navigate("JoinCallScreen", { meeting: userCall.meeting })
          }
        >
          <Animated.View style={[styles.circle, { opacity: opacityValue }]}>
            <Ionicons
              name="call-outline"
              size={20}
              color="black"
              style={{ marginRight: 3 }}
            />
            <SText className="font-osSemibold text-lg tracking-wider">
              {userCall.meeting.participant_data.name}
            </SText>
          </Animated.View>
        </SButton>
      </SView>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  circle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // width: 100,
    // height: 100,
    // borderRadius: 50,
    // backgroundColor: "blue",
  },
});

export default InCallToast;
