import { BASE_URL } from '~services';
import { Conversation, EventType } from '~types';
export const colorVariants = [
  'manager',
  'emergency',
  'customer',
  'warning',
  'alert',
] as const;

export const getRandomColor = (
  colors = colorVariants,
  range = colorVariants.length
) => colors[Math.floor(Math.random() * range)];
export const eventKeys = (event: EventType) => {
  return {
    id: event.id,
    organizer_name: event.organizer_name,
    name: event.name,
    description: event.description,
    link: event.link,
    banner_or_image: event.banner_or_image,
    acknowledged: event.acknowledged,
    time: event.time,
    organizer: event.organizer,
  };
};

export function hexToRGBA(hex: string, opacity: string = '1') {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
}

export const getUserName = (
  { receiver_details, sender_details }: Conversation,
  user_id: number
) =>
  receiver_details.id === user_id
    ? sender_details.name
    : receiver_details.name ?? 'Dr. John Doe';

export const getUserImage = (
  {
    receiver_details: { profile_image: r_profile_image, id: rid },
    sender_details: { profile_image: c_profile_image },
  }: Conversation,
  user_id: number
) => (rid === user_id ? c_profile_image : r_profile_image);

export const createImage = (profile_image_url: string) =>
  BASE_URL + profile_image_url;
const avatarStyles = [
  'adventurer-neutral',
  'adventurer',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'fun-emoji',
  'icons',
  'identicon',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'rings',
  'thumbs',
];

type messageType = {
  sender_details: { id: number };
  receiver_details: { id: number };
};

export const getOtherUserId = (message: messageType, user_id: number) => {
  return user_id === message.sender_details.id
    ? message.receiver_details.id
    : message.sender_details.id;
};
