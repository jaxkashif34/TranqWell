import { StatusType } from '~types';

type EventType = {
  id: number;
  organizer_name: string;
  name: string;
  description: string;
  link: string;
  banner_or_image: null | string;
  acknowledged: false;
  time: string | null;
  organizer: number;
};

type EventSliceType = {
  events: EventType[] | null;
  status: StatusType;
};

export { EventSliceType, EventType };
