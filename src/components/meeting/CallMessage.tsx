import React from "react";
import { StyleSheet, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { theme } from "~assets";
import { SImage, SText, SView } from "~base";
import { BaseUser, Meeting } from "~types";
import { UserImage } from "../other/UserImage";

type Props = {
  header: string;
  detail?: string | null;
  isError: boolean;
  meeting: Meeting;
  user: BaseUser;
};

export default function CallMessage(props: Props) {
  return (
    <View style={[styles.container, props.isError && styles.errorContainer]}>
      <View style={styles.textRow}>
        {props.isError && (
          <Svg
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 122.89 111.55"
            width={35}
            height={35}
          >
            <Path
              fill="#b71616"
              d="M2.35,84.43,45.29,10.2l.17-.27h0a22.92,22.92,0,0,1,7-7.23A17,17,0,0,1,61.58,0a16.78,16.78,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26c.13.21.25.42.36.64l42.24,73.34.23.44h0a22.22,22.22,0,0,1,2.37,10.19,17.59,17.59,0,0,1-2.16,8.35,16,16,0,0,1-6.94,6.61l-.58.26a21.34,21.34,0,0,1-9.11,1.74v0H17.62c-.23,0-.44,0-.66,0a18.07,18.07,0,0,1-6.2-1.15A16.46,16.46,0,0,1,3,104.26a17.59,17.59,0,0,1-3-9.58,23,23,0,0,1,1.57-8.74,8.24,8.24,0,0,1,.77-1.51Z"
            />
            <Path
              fill="#e21b1b"
              fillRule="evenodd"
              d="M9,88.76l43.15-74.6c5.23-8.25,13.53-8.46,18.87,0l42.44,73.7c3.38,6.81,1.7,16-9.34,15.77H17.62c-7.27.18-12-6.19-8.64-14.87Z"
            />
            <Path
              fill="#fff"
              d="M57.57,82.7a5.51,5.51,0,0,1,3.48-1.58,5.75,5.75,0,0,1,2.4.35,5.82,5.82,0,0,1,2,1.31,5.53,5.53,0,0,1,1.62,3.55,6.05,6.05,0,0,1-.08,1.4,5.54,5.54,0,0,1-5.64,4.6,5.67,5.67,0,0,1-2.27-.52,5.56,5.56,0,0,1-2.82-2.94,5.65,5.65,0,0,1-.35-1.27,5.83,5.83,0,0,1-.06-1.31h0a6.19,6.19,0,0,1,.57-2,4.57,4.57,0,0,1,1.13-1.56Zm8.16-10.24c-.2,4.79-8.31,4.8-8.5,0-.82-8.21-2.92-29.39-2.85-37.1.07-2.38,2-3.79,4.56-4.33a12.83,12.83,0,0,1,5,0c2.61.56,4.65,2,4.65,4.44v.24L65.73,72.46Z"
            />
          </Svg>
        )}

        <SView className="space-y-2">
          <SText className="text-white font-osSemibold">Calling To...</SText>
          <UserImage
            data={
              props.user.id === props.meeting.participant_data.id
                ? props.meeting.organizer_data
                : props.meeting.participant_data
            }
            size={100}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: "cover",
            }}
          />
        </SView>
      </View>

      <SText className="text-lg font-osSemibold text-white">
        {props.user.id === props.meeting.participant_data.id
                ? props.meeting.organizer_data.name
                : props.meeting.participant_data.name}
      </SText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: 'orange',
  },
  errorContainer: {
    backgroundColor: theme.colors.greyLightest,
  },
  text: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.base,
    textAlign: "center",
    color: "white",
  },
  headerText: {
    fontWeight: "bold",
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: 'red',
  },
  errorText: {
    color: theme.colors.red,
    marginLeft: 8,
  },
});
