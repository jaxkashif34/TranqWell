import { Dropdown as BaseDropDown } from 'react-native-element-dropdown';
import React, { useReducer } from 'react';
import { SText, SView } from '~base';
import { styles } from './styles';
import { theme } from '~assets';
import { AntDesign } from '@expo/vector-icons';
import { MeetingFrequency, MeetingStateType } from '~types';

const data = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Alternative Days', value: 'Alternative Days' },
  { label: '3 Days a Week', value: '3 Days a Week' },
];

type FrequencyType = {
  frequencyFocus: boolean;
  frequencyValue: null | MeetingFrequency | string;
};

type Props = {
  setState: React.Dispatch<Partial<MeetingStateType>>;
};

export const FrequencyDropDown = ({ setState }: Props) => {
  const [{ frequencyValue, frequencyFocus }, setFrequency] = useReducer(
    (current: FrequencyType, update: Partial<FrequencyType>) => ({
      ...current,
      ...update,
    }),
    {
      frequencyValue: null,
      frequencyFocus: false,
    }
  );

  return (
    <SView style={styles.container}>
      <BaseDropDown
        style={[
          styles.dropdown,
          frequencyFocus && {
            borderColor: theme.colors.manager,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!frequencyFocus ? 'Select Frequency' : '...'}
        value={frequencyValue}
        onFocus={() => setFrequency({ frequencyFocus: true })}
        onBlur={() => setFrequency({ frequencyFocus: false })}
        onChange={({ value }) => {
          setFrequency({
            frequencyFocus: false,
            frequencyValue: value,
          });
          setState({ frequency: value });
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={frequencyFocus ? theme.colors.manager : 'black'}
            name="Safety"
            size={20}
          />
        )}
        renderItem={(item) => {
          return (
            <SView
              className={`p-2 rounded-lg ${
                frequencyValue === item.value ? 'bg-manager' : 'bg-current'
              }`}
            >
              <SText
                className={`tracking-wider  ${
                  frequencyValue === item.value ? 'text-white' : 'text-black'
                }`}
              >
                {item.label}
              </SText>
            </SView>
          );
        }}
        containerStyle={{ borderRadius: 8 }}
      />
    </SView>
  );
};
