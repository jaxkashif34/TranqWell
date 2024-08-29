import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type {
  MAuthNavigatorParamsList,
  MAuthScreenProps,
  MHomeNavigatorParamsList,
  TabBarIconProps,
} from '~types';
import { selectUiState } from '~helpers';
import { MHome, MMeetingDetails } from '~screens';
import { useEffect, type FC } from 'react';
import { useAppSelector } from '~hooks';
import { MChatsNavigator } from './MChatsNavigator';
import { MClientsNavigator } from './MClientsNavigator';
import { MMeetingNavigator } from './MMeetingNavigator';
import { MReminderNavigator } from './MReminderNavigator';
import { TabBarButton } from '~components';

const Tab = createBottomTabNavigator<MHomeNavigatorParamsList>();

export const MHomeNavigator: FC<
  MAuthScreenProps<MAuthNavigatorParamsList, 'MHomeNavigator'>
> = ({ navigation }) => {
  const { isShowTabBar } = useAppSelector(selectUiState);
  // useEffect(()=>{
  //   console.log(navigation.getState().routeNames)
  // },[])
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      initialRouteName="MHome"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: (props: TabBarIconProps) => (
          <TabBarButton {...props} route={route} isManager />
        ),
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          ...(!isShowTabBar && { display: 'none' }),
          borderTopColor: 'transparent',
          height: 60,
        },
      })}
    >
      <Tab.Screen name="MReminderNavigator" component={MReminderNavigator} />
      <Tab.Screen name="MChatNavigator" component={MChatsNavigator} />
      <Tab.Screen name="MHome" component={MHome} />
      <Tab.Screen name="MMeetingNavigator" component={MMeetingNavigator} />
      <Tab.Screen name="MClientsNavigator" component={MClientsNavigator} />
    </Tab.Navigator>
  );
};
