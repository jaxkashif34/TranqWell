// import Fonts
import osBold from './fonts/OpenSans-Bold.ttf';
import osBoldItalic from './fonts/OpenSans-BoldItalic.ttf';
import osExtraBold from './fonts/OpenSans-ExtraBold.ttf';
import osExtraBoldItalic from './fonts/OpenSans-ExtraBoldItalic.ttf';
import osItalic from './fonts/OpenSans-Italic.ttf';
import osLight from './fonts/OpenSans-Light.ttf';
import osLightItalic from './fonts/OpenSans-LightItalic.ttf';
import osRegular from './fonts/OpenSans-Regular.ttf';
import osSemibold from './fonts/OpenSans-SemiBold.ttf';
import osSemiboldItalic from './fonts/OpenSans-SemiBoldItalic.ttf';

// import Images
import brandLogo from './images/logo.png';
import logoSvg from './images/logo.svg';
import splashBG from './images/splash-bg.png';
import Profile from './images/profile.png';
import ForumImage from './images/image6.png';
import ProfileImage from './images/profileImage.png';
import manager from './images/casemanager.png';
import chat from './images/chat.png';
import councilor from './images/councilor.png';
import profile from './images/myprofile.png';
import tribe from './images/tribe.png';
import event from './images/event.png';

const savedImages = {
  brandLogo,
  splashBG,
  Profile,
  ForumImage,
  ProfileImage,
  logoSvg,
  manager,
  chat,
  councilor,
  profile,
  tribe,
  event,
};

const savedFonts = {
  osBold,
  osBoldItalic,
  osExtraBold,
  osExtraBoldItalic,
  osItalic,
  osLight,
  osLightItalic,
  osRegular,
  osSemibold,
  osSemiboldItalic,
};
const theme = {
  colors: {
    blueDark: '#121a24',
    green: '#72cc18',
    grey: '#c8d1dc',
    greyDark: '#7b848f',
    greyLight: '#e6eaef',
    greyLightest: '#f7f9fa',
    red: '#e71115',
    white: '#ffffff',
    customer: '#29CBAD',
    warning: '#FEDE33',
    manager: '#FF9D59',
    attention: '#FF3143',
    emergency: '#1DA7FF',
    alert: '#B271FF',
    councilor: '#D6CDCE',
    disabled: '#ADB3BC',
  },
  fontFamily: {
    body: 'OpenSans-Regular',
  },
  fontSize: {
    base: 16,
  },
};
export { savedFonts, savedImages, theme };
