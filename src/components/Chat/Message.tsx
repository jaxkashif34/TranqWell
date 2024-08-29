import React from "react";
import { SText, SView } from "~base";

type Props = {
  text: string;
  time: string;
  isYou: boolean;
  variant?: "customer" | "manager";
};

export const Message = ({ isYou, text, time, variant }: Props) => {
  return (
    <SView className={`flex ${isYou ? "items-end" : "items-start"} px-4 my-2 `}>
      <SView
        className={`rounded-lg p-3 max-w-[90%] space-y-2 ${
          isYou
            ? `rounded-tr-none bg-${variant ?? "customer"}`
            : "bg-white rounded-tl-none"
        }`}
      >
        <SText>{text}</SText>
        <SText
          className={`text-xs lowercase ${isYou ? "text-right" : "text-left"}`}
        >
          {time ?? "11:22 AM"}
        </SText>
      </SView>
    </SView>
  );
};
