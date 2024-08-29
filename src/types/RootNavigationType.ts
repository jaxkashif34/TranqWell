import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AuthCustomerParamsList,
  UnAuthCustomerParamsList,
} from "./CustomerNavigation";
import {
  MAuthNavigatorParamsList,
  UnAuthManagerParamsList,
} from "./ManagerNavigation";
import { Meeting } from "./other";
import { BaseUser } from "./RolesType";

export type RootNavigationParamsList = UnAuthCustomerParamsList &
  AuthCustomerParamsList &
  UnAuthManagerParamsList &
  MAuthNavigatorParamsList & {
    CustomerNavigation: undefined;
    ManagerNavigation: undefined;
    SelectUser: undefined;
    JoinCallScreen: { meeting: Meeting; user: BaseUser };
  };

export type RootScreenProps<T extends keyof RootNavigationParamsList> =
  NativeStackScreenProps<RootNavigationParamsList, T>;
