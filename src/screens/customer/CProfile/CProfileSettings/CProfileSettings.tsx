import React, { type FC } from "react";
import { SettingNavigationCard, SettingToggleCard } from "~components";
import { SText, SView, SButton, SScrollView, SModel } from "~base";
import type { AuthCustomerScreenProps } from "~types";
import { useAppDispatch } from "~hooks";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { logOutCustomer, resetRole, resetState } from "~redux";

export const CProfileSettings: FC<
  AuthCustomerScreenProps<"CProfileSettings">
> = ({ navigation }) => {
  const [visible, setModalVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(resetState());
    dispatch(logOutCustomer());
    dispatch(resetRole());
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-row items-center space-x-3 px-3 mt-3">
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={{
            padding: 3,
            borderRadius: 5,
          }}
          onPress={navigation.goBack}
        />
        <SText className="font-osBold text-lg">Settings</SText>
      </SView>
      <SView className="px-4 py-4 flex-1">
        <SScrollView className="pb-4">
          <SettingToggleCard
            heading="Push Notification"
            text="Enable or disable notifications to easily manage your app alerts and updates"
            icon={<Feather name="bell" size={33} color="black" />}
            variant="customer"
          />
          <SettingNavigationCard
            heading="Change Password"
            text="Update your password anytime to improve and strengthen your account security"
            icon={<Feather name="lock" size={33} color="black" />}
            onPress={() => navigation.navigate("CChangePassword")}
            variant="customer"
          />
          <SettingNavigationCard
            heading="Terms of Use"
            text="Review and agree to the Terms of Use to understand your rights and responsibilities"
            icon={<Feather name="file-text" size={33} color="black" />}
            onPress={() => navigation.navigate("CChangePassword")}
            variant="customer"
          />
          <SettingNavigationCard
            heading="Delete Profile"
            text="Delete your profile to permanently remove your account and all associated data"
            icon={<Feather name="trash-2" size={33} color="black" />}
            onPress={() => navigation.navigate("CDeleteProfile")}
            variant="customer"
          />
        </SScrollView>
        <SModel visible={visible} setModalVisible={setModalVisible}>
          <SText className="text-2xl font-osSemibold tracking-wide text-center">
            Sign Out?
          </SText>
          <SText className="text-lg text-center leading-6 my-5">
            Are you sure you want to sign out of this application?
          </SText>
          <SView className="mt-4 flex flex-row">
            <SButton
              variant="customer"
              onPress={handleLogout}
              className="flex-auto mr-2 rounded-lg"
            >
              <SText className="font-osSemibold text-white text-center text-lg">
                SAVE
              </SText>
            </SButton>

            <SButton
              variant="outline"
              onPress={() => setModalVisible(false)}
              className="flex-auto ml-2 rounded-lg"
            >
              <SText className="font-osSemibold text-center text-lg">
                CANCEL
              </SText>
            </SButton>
          </SView>
        </SModel>
        <SButton variant="customer" onPress={() => setModalVisible(true)}>
          <SText className="text-white font-osBold tracking-wide">
            SIGN OUT
          </SText>
        </SButton>
      </SView>
    </SafeAreaView>
  );
};
