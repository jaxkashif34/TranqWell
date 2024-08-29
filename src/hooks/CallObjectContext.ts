import React from 'react';
import { DailyCall } from '@daily-co/react-native-daily-js';

export const CallObjectContext = React.createContext<DailyCall | null>(null);
