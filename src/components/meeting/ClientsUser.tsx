import React, { useState } from "react";
import { SButton, SCheckBox, SText, SView } from "~base";
import { theme } from "~assets";
import { BaseUser } from "~types";
import { UserImage } from "../other/UserImage";

type Props = {
  user: BaseUser;
  onPress: () => void;
};

export const ClientsUser = ({ user, onPress }: Props) => {
  const [isShow, setShow] = useState(false);
  return (
    <SButton
      className={`flex flex-row items-center 
            space-x-5 py-2 justify-start border-t border-b px-2 ${
              isShow ? "border-manager" : "border-gray-300 border-t-transparent"
            }`}
      variant="text"
      onPress={onPress}
      style={{
        backgroundColor: isShow ? "rgba(255,157,89,0.1)" : "transparent",
      }}
      key={user.id}
    >
      <SView className="bg-orange-200 flex-1">
        {/* <SCheckBox
          className={`rounded-lg w-7 h-7 ${isShow ? 'block' : 'hidden'}`}
          value={isShow}
          color={theme.colors.manager}
          onValueChange={(e) => {
            setShow(!isShow);
            if (e === false) {
              setSelectedUser(null);
            }
          }}
        /> */}
      </SView>

      <SView className="flex flex-row space-x-2 items-center flex-[20]">
        <UserImage data={user} size={55} />
        <SText className="font-osSemibold text-lg">{user.name}</SText>
      </SView>
    </SButton>
  );
};
