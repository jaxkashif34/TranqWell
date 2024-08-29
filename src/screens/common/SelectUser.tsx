import type { RootScreenProps } from '~types';
import type { FC } from 'react';
import React from 'react';
import { GradientLayout, AuthHeader } from '~components';
import { SText, SView, SButton } from '~base';
import { useAppDispatch } from '~hooks';
import { updateRole } from '~redux';
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const SelectUser: FC<RootScreenProps<'SelectUser'>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then((value) => {
        setChannels(value ?? []);
      });
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // messaging()
    //   .getToken()
    //   .then((token) => {
    //     // console.log({ token });
    //   });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Initial Notification', remoteMessage.notification);
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened', remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      schedulePushNotification(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-around',
    //   }}
    // >
    //   <Text>Your expo push token: {expoPushToken}</Text>
    //   <Text>{`Channels: ${JSON.stringify(
    //     channels.map((c) => c.id),
    //     null,
    //     2
    //   )}`}</Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>
    //       Title: {notification && notification.request.content.title}{' '}
    //     </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>
    //       Data:{' '}
    //       {notification && JSON.stringify(notification.request.content.data)}
    //     </Text>
    //   </View>
    //   <Button
    //     title="Press to schedule a notification"
    //   />
    // </View>
    <GradientLayout isSelectUserScreen>
      <SView className="px-4 py-4">
        <AuthHeader hideBackBtn />
        <SView className="flex gap-y-4 mb-2 px-2 pt-28 ">
          <SText className="font-osBold text-2xl">Find Your Fit</SText>
          <SText className="text-lg font-osLight tracking-wide">
            Welcome! Please identify your role. Are you a{' '}
            <SText className="font-osSemibold">Customer</SText> or a{' '}
            <SText className="font-osSemibold">Case Manager</SText>? Choose the
            role that best fits you for a personalized experience.
          </SText>
        </SView>
        <SView className="mt-8">
          <SButton
            variant="customer"
            onPress={() => {
              dispatch(updateRole('Customer'));
              navigation.navigate('CGetStarted');
            }}
          >
            <SText className="font-osBold text-white text-lg uppercase">
              Customer
            </SText>
          </SButton>

          <SText className="text-center font-osBold text-xl my-5">OR</SText>

          <SButton
            variant="manager"
            onPress={() => {
              dispatch(updateRole('CaseManager'));
              navigation.navigate('MGetStarted');
            }}
          >
            <SText className="font-osBold text-white text-lg uppercase">
              Case Manager
            </SText>
          </SButton>
        </SView>
      </SView>
    </GradientLayout>
  );
};

async function schedulePushNotification(
  content: FirebaseMessagingTypes.RemoteMessage
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: content.notification.title,
      body: content.notification.body,
      data: content.data,
    },
    trigger: { seconds: 0 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default channel',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
