import React, { useState, useCallback, useEffect } from 'react';
import { DailyCall } from '@daily-co/react-native-daily-js';
import { useCallObject, useOrientation } from '~hooks';
import TrayButton from './TrayButton';
import { logDailyEvent } from '~utils';
import { SView } from '~base';
import { Meeting } from '~types';

/**
 * Gets [isCameraMuted, isMicMuted].
 * This function is declared outside Tray() so it's not recreated every render
 * (which would require us to declare it as a useEffect dependency).
 */
function getStreamStates(callObject: DailyCall) {
  let isCameraMuted = false,
    isMicMuted = false,
    isShareScreenOff = false;
  if (
    callObject &&
    callObject.participants() &&
    callObject.participants().local
  ) {
    const localParticipant = callObject.participants().local;
    isCameraMuted = !callObject.localVideo();
    isMicMuted = !callObject.localAudio();
    isShareScreenOff = ['blocked', 'off'].includes(
      localParticipant.tracks.screenVideo.state
    );
  }
  return [isCameraMuted, isMicMuted, isShareScreenOff];
}

type Props = {
  onClickLeaveCall: () => void;
  disabled: boolean;
  meeting: Meeting;
  variant: 'manager' | 'customer';
};

export const TRAY_HEIGHT = 90;

export const Tray = ({
  disabled,
  onClickLeaveCall,
  meeting,
  variant,
}: Props) => {
  const callObject = useCallObject();
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [isShareScreenOff, setShareScreenOff] = useState(false);
  const orientation = useOrientation();

  const toggleCamera = useCallback(() => {
    callObject?.setLocalVideo(isCameraMuted);
  }, [callObject, isCameraMuted]);

  const toggleMic = useCallback(() => {
    callObject?.setLocalAudio(isMicMuted);
  }, [callObject, isMicMuted]);

  const toggleScreenShare = useCallback(() => {
    if (isShareScreenOff) {
      callObject?.startScreenShare();
    } else {
      callObject?.stopScreenShare();
    }
  }, [callObject, isShareScreenOff]);

  /**
   * Start listening for participant changes when callObject is set (i.e. when the component mounts).
   * This event will capture any changes to your audio/video mute state.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }

    const handleNewParticipantsState = (event?: any) => {
      event && logDailyEvent(event);
      const [cameraMuted, micMuted, shareScreenOff] =
        getStreamStates(callObject);
      setCameraMuted(cameraMuted);
      setMicMuted(micMuted);
      setShareScreenOff(shareScreenOff);
    };

    // Use initial state
    handleNewParticipantsState();

    // Listen for changes in state
    callObject.on('participant-updated', handleNewParticipantsState);

    // Stop listening for changes in state
    return function cleanup() {
      callObject.off('participant-updated', handleNewParticipantsState);
    };
  }, [callObject]);

  return (
    <SView className="flex flex-row justify-between items-center py-5 bg-slate-800 px-4">
      <TrayButton
        disabled={disabled}
        onPress={toggleMic}
        muted={isMicMuted}
        type="mic"
      />
      <TrayButton
        disabled={disabled}
        onPress={toggleCamera}
        muted={isCameraMuted}
        type="camera"
      />
      <TrayButton
        disabled={disabled}
        onPress={toggleScreenShare}
        muted={isShareScreenOff}
        type="screenShare"
      />
      <TrayButton disabled={disabled} onPress={onClickLeaveCall} type="leave" />
    </SView>
  );
};
