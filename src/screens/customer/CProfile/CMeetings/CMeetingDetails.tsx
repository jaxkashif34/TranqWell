import { TextInput, ScrollView } from "react-native";
import React, { type FC } from "react";
import type { AuthCustomerScreenProps } from "~types";
import { SafeAreaView } from "react-native-safe-area-context";
import { SButton, SImage, SText, SView } from "~base";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { theme } from "~assets";
import { Divider, UserImage } from "~components";
import { Path, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { selectCustomerState } from "~helpers";

export const CMeetingDetails: FC<
  AuthCustomerScreenProps<"CMeetingDetails">
> = ({ navigation, route }) => {
  const meeting = route.params.meeting;
  const { customer } = useSelector(selectCustomerState);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-row items-center justify-between mt-2">
        <SView className="flex flex-row items-center space-x-3 px-4">
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
          <SText className="font-osBold text-lg">Meeting Details</SText>
        </SView>
        <SView className="flex flex-row space-x-3 justify-end px-4">
          <SButton
            className={`bg-white h-10 w-10 rounded-lg border border-customer`}
            variant="text"
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </SButton>
        </SView>
      </SView>

      <SView className="flex-1">
        <SView className="pt-6 pb-3 space-y-6 px-4 flex-[3]">
          <TextInput
            multiline
            numberOfLines={2}
            value={meeting.title}
            editable={false}
            spellCheck={false}
            style={{
              borderColor: theme.colors.customer,
              borderWidth: 2,
              borderRadius: 5,
              padding: 5,
              fontSize: 20,
              fontFamily: "osSemibold",
              color: "black",
              textAlignVertical: "top",
            }}
          />

          <ScrollView style={{ flex: 1 }}>
            <TextInput
              multiline
              numberOfLines={15}
              value={meeting.description}
              editable={false}
              spellCheck={false}
              style={{
                borderColor: theme.colors.customer,
                borderWidth: 2,
                borderRadius: 5,
                padding: 10,
                fontSize: 18,
                color: "black",
                textAlignVertical: "top",
              }}
            />
          </ScrollView>
        </SView>
        <Divider />

        <SView className="px-4 py-3">
          <SText className="font-osSemibold text-lg mb-2">
            Invited Members
          </SText>
          <SView className="flex flex-row space-x-2 items-center">
            <UserImage data={meeting.participant_data} size={55} />
            <SText className="font-osSemibold text-lg">
              {meeting.participant_data.name}
            </SText>
          </SView>
        </SView>
        <SView className="px-4 flex-1 justify-end py-2">
          <SButton
            variant="customer"
            onPress={() =>
              navigation.navigate("JoinCallScreen", { meeting, user: customer })
            }
          >
            <SView className="bg-current h-9 w-9 rounded-xl flex items-center justify-center">
              <Svg width={30} height={30} viewBox="0 -50 300 300">
                <Path
                  fill="#00832d"
                  d="m144.822 105.322l24.957 28.527l33.562 21.445l5.838-49.792l-5.838-48.669l-34.205 18.839z"
                />
                <Path
                  fill="#0066da"
                  d="M0 150.66v42.43c0 9.688 7.864 17.554 17.554 17.554h42.43l8.786-32.059l-8.786-27.925l-29.11-8.786z"
                />
                <Path
                  fill="#e94235"
                  d="M59.984 0L0 59.984l30.876 8.765l29.108-8.765l8.626-27.545z"
                />
                <Path fill="#2684fc" d="M.001 150.679h59.983V59.983H.001z" />
                <Path
                  fill="#00ac47"
                  d="M241.659 25.398L203.34 56.834v98.46l38.477 31.558c5.76 4.512 14.186.4 14.186-6.922V32.18c0-7.403-8.627-11.495-14.345-6.781"
                />
                <Path
                  fill="#00ac47"
                  d="M144.822 105.322v45.338H59.984v59.984h125.804c9.69 0 17.553-7.866 17.553-17.554v-37.796z"
                />
                <Path
                  fill="#ffba00"
                  d="M185.788 0H59.984v59.984h84.838v45.338l58.52-48.49V17.555c0-9.69-7.864-17.554-17.554-17.554"
                />
              </Svg>
            </SView>
            <SText className="text-white font-osSemibold text-lg tracking-wider">
              Join Meeting
            </SText>
          </SButton>
        </SView>
      </SView>
    </SafeAreaView>
  );
};
