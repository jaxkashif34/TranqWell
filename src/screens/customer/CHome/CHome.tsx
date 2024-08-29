import React, { useEffect, useState, type FC } from "react";
import { savedImages } from "~assets";
import { SButton, SImage, SText, STextInput, SView } from "~base";
import {
  AuthCustomerParamsList,
  AuthCustomerScreenProps,
  ButtonVariants,
} from "~types";
import { Octicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, Linking, Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import axios from "axios";
import { hexToRGBA } from "~helpers";

const homeNavigationCards: {
  id: number;
  variant: ButtonVariants;
  imageUrl: number;
  title: string;
  route: keyof AuthCustomerParamsList;
}[] = [
  {
    id: 1,
    variant: "manager",
    imageUrl: savedImages.profile,
    title: "My Profile",
    route: "CProfileNavigator",
  },
  {
    id: 2,
    variant: "alert",
    imageUrl: savedImages.manager,
    title: "Case Manager",
    route: "CCaseManagerNavigator",
  },
  {
    id: 3,
    variant: "customer",
    imageUrl: savedImages.chat,
    title: "Chat with Friends",
    route: "CChatNavigator",
  },
  {
    id: 4,
    variant: "warning",
    imageUrl: savedImages.tribe,
    title: "My Tribe",
    route: "CTribeNavigator",
  },
  {
    id: 5,
    variant: "alert",
    imageUrl: savedImages.event,
    title: "My Wellness",
    route: "CEventNavigator",
  },
  {
    id: 6,
    variant: "disabled",
    imageUrl: savedImages.councilor,
    title: "My Councilor",
    route: "CCouncilorNavigator",
  },
];

export const CHome: FC<AuthCustomerScreenProps<"CHome">> = ({ navigation }) => {
  const handleMakeCAll = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:911");
    } else {
      Linking.openURL("telprompt:911");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="px-4 py-6 flex space-y-4">
        <SView className="h-12 w-32">
          <SImage
            source={savedImages.brandLogo}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </SView>

        <SView className="flex flex-row space-x-3">
          <SView className="flex-1 flex-row border-customer border rounded-xl px-2">
            <STextInput
              className="h-10 flex-1 placeholder:font-osRegular"
              placeholder="Search"
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
          <SButton
            className="border-customer border rounded-xl w-10"
            variant="text"
          >
            <Feather name="filter" size={24} color="black" />
          </SButton>
        </SView>

        <SView className="flex space-y-1">
          <SText className="font-osBold tracking-wider text-lg">Home</SText>
          <SView className="flex flex-row flex-wrap gap-4 justify-center">
            {homeNavigationCards.map((card) => {
              return (
                <SButton
                  variant={card.variant}
                  key={card.id}
                  className="px-2 py-4 basis-[45%]"
                  disabled={card.variant === "disabled"}
                  activeOpacity={card.variant === "disabled" ? 1 : 0.5}
                  onPress={() => {
                    if (card.variant === "disabled") return;
                    // @ts-expect-error
                    navigation.navigate(card.route);
                  }}
                >
                  <SView className="flex justify-center space-y-1">
                    <SView
                      className={`h-20 w-36 rounded-xl flex justify-center items-center ${
                        card.variant === "disabled" ? "relative" : "relative"
                      }`}
                    >
                      <SImage
                        className="rounded-xl"
                        source={card.imageUrl}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "contain",
                          borderRadius: 20,
                        }}
                      />
                      {card.variant === "disabled" && (
                        <BlurView
                          intensity={50}
                          tint="dark"
                          style={styles.container}
                        >
                          <SText className="font-osSemibold text-white">
                            coming soon
                          </SText>
                        </BlurView>
                      )}
                    </SView>
                    <SText className="font-osSemibold">{card.title}</SText>
                  </SView>
                </SButton>
              );
            })}
          </SView>
        </SView>
        <SView className="">
          <SButton
            variant="attention"
            className="mt-[7%]"
            onPress={handleMakeCAll}
          >
            <SText className="text-white font-osBold text-lg uppercase">
              ! Save our Souls
            </SText>
          </SButton>
        </SView>
      </SView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
