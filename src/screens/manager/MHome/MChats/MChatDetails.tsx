import React, { FC, useEffect } from "react";
import { MAuthScreenProps, MChatNavigatorParamsList } from "~types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SButton,
  SImage,
  SScrollView,
  SText,
  STextInput,
  SView,
  SwitchBtn,
} from "~base";
import { useAppDispatch, useAppSelector } from "~hooks";
import { toggleTabBar } from "~redux";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { theme } from "~assets";
import { getUserImage, getUserName, selectManagerState } from "~helpers";
import { UserImage } from "~components";

export const MChatDetails: FC<
  MAuthScreenProps<MChatNavigatorParamsList, "MChatDetails">
> = ({ navigation, route }) => {
  const { conversation } = route.params;
  const { manager } = useAppSelector(selectManagerState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleTabBar(false));
  }, []);

  const userImage = getUserImage(conversation, manager.user_id);
  const userName = getUserName(conversation, manager.user_id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SView className="flex flex-1 space-y-2 bg-white">
        <SView className="flex flex-row items-center px-4 space-x-2">
          <SButton variant="text" onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color="black"
              style={{
                padding: 3,
                borderRadius: 5,
              }}
            />
          </SButton>

          <SText className="font-osSemibold">Back to Chat</SText>
        </SView>

        <SView className="px-4 space-y-4">
          <SView className="space-y-5 px-2">
            <SView className="p-3 flex items-center space-y-2">
              <SView className="w-24 h-24 rounded-xl mt-4">
                <UserImage
                  data={{ profile_image: userImage, name: userName }}
                  size={"100%"}
                  borderRadius={5}
                />
              </SView>

              <SText className="font-osBold">
                {getUserName(conversation, manager.user_id)}
              </SText>
            </SView>
          </SView>

          <SView className="flex-row border-manager border rounded-xl px-2 bg-white">
            <STextInput
              className="h-12 flex-1 placeholder:font-osRegular"
              placeholder="Search in Chat"
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
        </SView>
        <SView className="p-4 space-y-6 flex-1">
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osSemibold">Notifications</SText>
            <SwitchBtn
              isOn={true}
              onColor={theme.colors.manager}
              offColor={theme.colors.disabled}
              trackOffStyle={{ width: 50, height: 20 }}
              thumbOffStyle={{ width: 20, height: 20 }}
              thumbOnStyle={{ width: 20, height: 20 }}
              trackOnStyle={{ width: 50, height: 20 }}
              onToggle={() => null}
            />
          </SView>
          <SView className="flex flex-row items-center justify-between">
            <SText className="font-osSemibold">Mute Messages</SText>
            <SwitchBtn
              isOn={false}
              onColor={theme.colors.manager}
              offColor={theme.colors.disabled}
              trackOffStyle={{ width: 50, height: 20 }}
              thumbOffStyle={{ width: 20, height: 20 }}
              thumbOnStyle={{ width: 20, height: 20 }}
              trackOnStyle={{ width: 50, height: 20 }}
              onToggle={() => null}
            />
          </SView>

          <SView className="space-y-2">
            <SText className="font-osSemibold">Media</SText>
            <SScrollView horizontal className="space-x-1">
              <SView className="w-28 h-28 rounded-xl">
                <SImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
                  }}
                  className="w-full h-full rounded-xl"
                />
              </SView>
              <SView className="w-28 h-28 rounded-xl">
                <SImage
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                  }}
                  className="w-full h-full rounded-xl"
                />
              </SView>
              <SView className="w-28 h-28 rounded-xl">
                <SImage
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                  }}
                  className="w-full h-full rounded-xl"
                />
              </SView>
              <SView className="w-28 h-28 rounded-xl">
                <SImage
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                  }}
                  className="w-full h-full rounded-xl"
                />
              </SView>
              <SView className="w-28 h-28 rounded-xl">
                <SImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
                  }}
                  className="w-full h-full rounded-xl"
                />
              </SView>
            </SScrollView>
          </SView>
          <SView className="flex-1 justify-end">
            <SButton variant="attention" className="mt-[7%]">
              <SText className="text-white font-osBold text-lg uppercase">
                BLOCK USER
              </SText>
            </SButton>
            <SButton variant="manager" className="mt-[7%]">
              <SText className="text-white font-osBold text-lg uppercase">
                DELETE CHAT
              </SText>
            </SButton>
          </SView>
        </SView>
      </SView>
    </SafeAreaView>
  );
};
