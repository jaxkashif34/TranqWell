export const CHomeTabsScreens = {
  CChatsNavigator: 'CChatsNavigator',
  CReminders: 'CReminders',
  CHome: 'CHome',
  CEventNavigator: 'CEventNavigator',
  CChatNavigator: 'CChatNavigator',
} as const;

export const CEventsScreens = {
  CEvents: 'CEvents',
  CEventDetails: 'CEventDetails',
} as const;

export const CChatsScreens = {
  CChats: 'CChats',
  CChat: 'CChat',
  CChatDetails: 'CChatDetails',
} as const;

export const CHomeNavigators = {
  CProfileNavigator: 'CProfileNavigator',
  CHomeNavigator: 'CHomeNavigator',
  CCaseManagerNavigator: 'CCaseManagerNavigator',
  CChatsNavigator: 'CChatsNavigator',
  CTribeNavigator: 'CTribeNavigator',
  CEventNavigator: 'CEventNavigator',
  CCouncilorNavigator: 'CCouncilorNavigator',
  ...CHomeTabsScreens,
} as const;

export const UnAuthCScreens = {
  CGetStarted: 'CGetStarted',
  CSignIn: 'CSignIn',
  CSignUp: 'CSignUp',
  CForgotPassword: 'CForgotPassword',
} as const;
