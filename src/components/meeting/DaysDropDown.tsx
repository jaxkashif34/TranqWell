import Checkbox from 'expo-checkbox';
import React, { useReducer } from 'react';
import { SText, SView } from '~base';
import { styles } from './styles';
import { theme } from '~assets';
import { AntDesign } from '@expo/vector-icons';
import { MultiSelect as BaseMultiSelect } from 'react-native-element-dropdown';
import { MeetingDays, MeetingStateType } from '~types';

const allDays = [
  { label: 'Mon', value: '1' },
  { label: 'Tue', value: '2' },
  { label: 'Wed', value: '3' },
  { label: 'Thur', value: '4' },
  { label: 'Fri', value: '5' },
  { label: 'Sat', value: '6' },
  { label: 'Sun', value: '0' },
];

type DaysType = {
  dyaChecked: boolean;
  daysValue: null | (MeetingDays | string)[];
};

type Props = {
  setState: React.Dispatch<Partial<MeetingStateType>>;
};

export const DaysDropDown = ({ setState }: Props) => {
  const [{ daysValue, dyaChecked }, setDays] = useReducer(
    (current: DaysType, update: Partial<DaysType>) => ({
      ...current,
      ...update,
    }),
    {
      daysValue: [],
      dyaChecked: false,
    }
  );
  return (
    <SView style={styles.container}>
      <BaseMultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, { color: 'white' }]}
        iconStyle={styles.iconStyle}
        data={allDays}
        labelField="label"
        valueField="value"
        placeholder="Select Days"
        value={daysValue}
        onChange={(item) => {
          setDays({ daysValue: item, dyaChecked: !dyaChecked });
          setState({ days: item });
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        selectedStyle={styles.selectedStyle}
        renderItem={({ value, label }) => (
          <SView
            className={`p-2 rounded-lg flex flex-row items-center space-x-2 ${
              daysValue.includes(value) ? 'bg-manager' : ''
            }`}
          >
            <Checkbox
              value={daysValue.includes(value)}
              color={theme.colors.manager}
              style={{
                borderWidth: 2,
                borderColor: daysValue.includes(value) ? 'white' : 'black',
                backgroundColor: daysValue.includes(value)
                  ? theme.colors.manager
                  : 'white',
              }}
              onValueChange={(e) => {
                setDays({ dyaChecked: e });
              }}
            />
            <SText
              className={`tracking-wider ${
                daysValue.includes(value) ? 'text-white' : 'text-black'
              }`}
            >
              {label}
            </SText>
          </SView>
        )}
      />
    </SView>
  );
};
