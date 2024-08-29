import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type {
  AuthCustomerParamsList,
  AuthCustomerScreenProps,
  TabBarIconProps,
} from '~types';
import { CHomeTabsScreens, selectUiState } from '~helpers';
import { CHome, CReminders } from '~screens';
import { CEventNavigator } from './CEventNavigator';
import type { FC } from 'react';
import { TabBarButton } from '~components';
import { useAppSelector } from '~hooks';
import { CChatsNavigator } from './CChatsNavigator';
import { CTribeNavigator } from './CTribeNavigator';

const Tab = createBottomTabNavigator<AuthCustomerParamsList>();

export const CHomeNavigator: FC<
  AuthCustomerScreenProps<'CHomeNavigator'>
> = () => {
  const { isShowTabBar } = useAppSelector(selectUiState);
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      initialRouteName={CHomeTabsScreens.CHome}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: (props: TabBarIconProps) => (
          <TabBarButton {...props} route={route} isManager={false} />
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
      <Tab.Screen name={CHomeTabsScreens.CReminders} component={CReminders} />
      <Tab.Screen name="CChatNavigator" component={CChatsNavigator} />
      <Tab.Screen name={CHomeTabsScreens.CHome} component={CHome} />
      <Tab.Screen
        name={CHomeTabsScreens.CEventNavigator}
        component={CEventNavigator}
      />
      <Tab.Screen name="CTribeNavigator" component={CTribeNavigator} />
    </Tab.Navigator>
  );
};
