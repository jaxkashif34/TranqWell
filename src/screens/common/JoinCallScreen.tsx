import { View, StyleSheet, LogBox } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AppState, logDailyEvent, Orientation } from "~utils";
import Daily, {
  DailyCall,
  DailyEvent,
  DailyEventObject,
  DailyEventObjectAppMessage,
} from "@daily-co/react-native-daily-js";
import {
  CallObjectContext,
  useAppDispatch,
  useAppSelector,
  useOrientation,
} from "~hooks";
import { CallPanel, Tray } from "~components";
import {
  setCallObjectState,
  setInCallState,
  setIsOnCallScreen,
  toggleTabBar,
} from "~redux";
import { theme } from "~assets";
import { selectUiState } from "~helpers";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
let callObject;
export const JoinCallScreen = ({ navigation, route }) => {
  const { meeting, user } = route.params;
  const { callObject: callObjects } = useAppSelector(selectUiState);
  const [appState, setAppState] = useState(AppState.Idle);
  const [roomUrl, setRoomUrl] = useState<string | undefined>(undefined);
  const [callObjectt, setCallObject] = useState<DailyCall | null>(null);
  if (!callObjects) {
    callObject = callObjectt ?? callObjects;
  }
  // const setCallObject = (value) => {
  //   dispatch(setCallObjectState(value));
  // };
  const orientation = useOrientation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleTabBar(false));
    dispatch(setIsOnCallScreen(true));
    window.isCallScreenActive = true;
    if (meeting.link) {
      setRoomUrl(meeting.link);
    }
    return () => {
      dispatch(setIsOnCallScreen(false));
      dispatch(toggleTabBar(true));
      window.isCallScreenActive = false;
      setRoomUrl(undefined);
    };
  }, [meeting.link]);

  useEffect(() => {
    return () => {
      setAppState(AppState.Leaving);
      callObject.leave();
    };
  }, []);

  /**
   * Attach lifecycle event handlers.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    const events: DailyEvent[] = ["joined-meeting", "left-meeting", "error"];

    function handleNewMeetingState(event?: DailyEventObject) {
      logDailyEvent(event);
      switch (callObject?.meetingState()) {
        case "joined-meeting":
          setAppState(AppState.Joined);
          dispatch(setInCallState({ meeting, inCall: true }));
          break;
        case "left-meeting":
          callObject?.destroy().then(() => {
            setRoomUrl(undefined);
            setCallObject(null);
            dispatch(setCallObjectState(null));
            setAppState(AppState.Idle);
            dispatch(setInCallState({ meeting, inCall: false }));
          });
          break;
        case "error":
          setAppState(AppState.Error);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleNewMeetingState);
    }

    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleNewMeetingState);
      }
    };
  }, [callObject]);

  /**
   * Listen for app messages from other call participants.
   * These only show up in the console.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event?: DailyEventObjectAppMessage) {
      if (event) {
        logDailyEvent(event);
        console.log(`received app message from ${event.fromId}: `, event.data);
      }
    }

    callObject.on("app-message", handleAppMessage);

    return function cleanup() {
      callObject.off("app-message", handleAppMessage);
    };
  }, [callObject]);

  /**
   * Join a call as soon as a callObject is created.
   * This effect must happen *after* the event handlers are attached, above.
   */
  useEffect(() => {
    if (!callObject || !roomUrl) {
      return;
    }
    console.log("Joining call", { roomUrl });
    callObject.join({ url: roomUrl }).catch((_) => {
      // Doing nothing here since we handle fatal join errors in another way,
      // via our listener attached to the 'error' event
    });
    setAppState(AppState.Joining);
  }, [callObject, roomUrl]);

  /**
   * Create the callObject as soon as we have a roomUrl.
   * This will trigger the call starting.
   */
  useEffect(() => {
    if (!roomUrl) {
      return;
    }
    const newCallObject = Daily.createCallObject({
      /*dailyConfig: {
        // Point to a specific version of the call-machine bundle
        // @ts-ignore
        callObjectBundleUrlOverride: 'https://b.staging.daily.co/call-ui/0a8807ac0fc0147c996b6db8d8b4c17f640dcd47/static/call-machine-object-bundle.js'
      }*/
    });
    setCallObject(newCallObject);
    dispatch(setCallObjectState(callObject));
  }, [roomUrl]);

  /**
   * Leave the current call.
   * If we're in the error state (AppState.Error), we've already "left", so just
   * clean up our state.
   */
  const leaveCall = useCallback(() => {
    if (!callObject) {
      return;
    }
    if (appState === AppState.Error) {
      callObject.destroy().then(() => {
        setRoomUrl(undefined);
        setCallObject(null);
        dispatch(setCallObjectState(null));
        setAppState(AppState.Idle);
        dispatch(setInCallState({ meeting, inCall: false }));
        dispatch(setIsOnCallScreen(false));
        window.isCallScreenActive = false;
      });
    } else {
      setAppState(AppState.Leaving);
      callObject.leave();
      navigation.goBack();
      dispatch(setInCallState({ meeting, inCall: false }));
      dispatch(setIsOnCallScreen(false));
      window.isCallScreenActive = false;
      dispatch(setCallObjectState(null));
    }
  }, [callObject, appState]);

  const showCallPanel = [
    AppState.Joining,
    AppState.Joined,
    AppState.Error,
  ].includes(appState);
  const enableCallButtons = [AppState.Joined, AppState.Error].includes(
    appState
  );

  return (
    <CallObjectContext.Provider value={callObject}>
      {showCallPanel && (
        <View
          style={[
            styles.callContainerBase,
            orientation === Orientation.Landscape
              ? styles.callContainerLandscape
              : null,
          ]}
        >
          <CallPanel
            roomUrl={roomUrl || ""}
            navigation={navigation}
            meeting={meeting}
            variant="manager"
            user={user}
          />
          <Tray
            onClickLeaveCall={leaveCall}
            disabled={!enableCallButtons}
            meeting={meeting}
            variant="manager"
          />
        </View>
      )}
    </CallObjectContext.Provider>
  );
};

const styles = StyleSheet.create({
  callContainerBase: {
    flex: 1,
  },
  callContainerLandscape: {
    flexDirection: "row",
  },
});
