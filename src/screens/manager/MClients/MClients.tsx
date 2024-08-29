import React, { useEffect, useMemo, useState, type FC } from "react";
import type { MAuthScreenProps, MClientsNavigatorParamsList } from "~types";
import { ClientsUser, GradientLayout, ScreenLoader } from "~components";
import { SButton, SText, STextInput, SView } from "~base";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { selectManagerState } from "~helpers";
import { Toast } from "~utils";

import { useAppDispatch, useAppSelector } from "~hooks";
import { getLinkedCustomers } from "~redux";

export const MClients: FC<
  MAuthScreenProps<MClientsNavigatorParamsList, "MClients">
> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { manager, linkedCustomers } = useAppSelector(selectManagerState);

  const filteredCustomers = useMemo(() => {
    if (!linkedCustomers) return [];
    return linkedCustomers.customers.filter((customer) => {
      return customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, linkedCustomers]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getLinkedCustomers(manager.user_id));
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <GradientLayout hideBottomCircle variant="manager">
      <Toast />
      <SView className="flex flex-row items-center mt-2 space-x-3 px-4 -z-50">
        <Ionicons
          name="arrow-back"
          size={26}
          color="black"
          style={{
            padding: 3,
            borderRadius: 5,
          }}
          onPress={navigation.goBack}
        />
        <SText className="font-osBold text-lg">Go Back</SText>
      </SView>

      <SView className="flex-1 mt-5 -z-50">
        <SView className="px-4">
          <SView className="flex-row border-manager border rounded-xl px-2 bg-white">
            <STextInput
              className="h-10 flex-1 placeholder:font-osRegular"
              placeholder="Search"
              onChangeText={(text) => setSearchQuery(text)}
            />
            <SButton variant="text">
              <Octicons name="search" size={24} color="black" />
            </SButton>
          </SView>
        </SView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 3, marginTop: 10 }}
        >
          {loading ? (
            <ScreenLoader />
          ) : (
            filteredCustomers.map((user) => (
              <ClientsUser
                user={user}
                key={user.id}
                onPress={() => navigation.navigate("MClientProfile", { user })}
              />
            ))
          )}
        </ScrollView>
      </SView>
    </GradientLayout>
  );
};
