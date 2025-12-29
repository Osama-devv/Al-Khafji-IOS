import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Source } from 'react-native-fast-image';
import { LanguageEnum } from './enums';
import { FC, JSX } from 'react';
import { SvgProps } from 'react-native-svg';

export interface IAppStack { }
export interface IBottomSheet {
  children?: React.ReactNode;
  show: boolean;
  snapPoints: Array<string | number>;
  onSheetOpened?: () => void;
  onSheetClosed?: () => void;
  sheetHeaderText?: string;
  sheetHeaderDescription?: string;
  index?: number;
  leftIcon?: any;
  bgColor?: string;
  appLanguage?: LanguageEnum;
  rightIcon?: any,
  rightIconPress?: () => void;
  leftIconPress?: () => void;
  centerHeader?: boolean;
  FooterComponent?: React.ReactNode;
  backgroundImage?: ImageSourcePropType;
  headerBackgroundColor?: string;
  hideHeaderSeparator?: boolean;
}

export interface IButtonProps {
  title: string; // Button text
  onPress?: () => void; // Press handler
  backgroundColor?: string; // Button background color
  borderColor?: string; // Button border color
  borderWidth?: number; // Button border width
  textColor?: string; // Text color
  activeBg?: boolean; // Apply background color when active
  activeBorder?: boolean; // Apply border when active
  innerBorder?: boolean;
  innerBorderColor?: string;
  style?: StyleProp<ViewStyle>; // Additional container styles
}
export interface HeaderProps {
  title: string;
  onIconPress?: () => void;
  showBadge?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  icon?: number | Source | undefined
  appLanguage: LanguageEnum
  transparent?: boolean

}
export type IUserOrNull = IUser | null;

export interface IUser {
  id?: number;
  uid?: string,
  firstName?: string;
  lastName?: string;
  number?: string;
  email?: string;
  token?: string;
  chatEnabled?: boolean;
  userType?: string;
}


export interface IExperienceProps {
  svg?: any;
  title?: string;
  backgroundColor?: string;
}

export interface IBadgeProps {
  title?: string;
  icon?: number | Source | undefined;
  appLanguage: LanguageEnum;
  textColor?: string;
  borderColor?: string;
}

export interface IMoreCardProps {
  title: string;
  subtitle?: string;
  svg?: any;
  fullWidth?: boolean;
  backgroundColor?: string;
  pattern?: ImageSourcePropType,
  onPress?: () => void;
}

export interface ICustomInputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  isReadOnly?: boolean;
  onChangeText: (text: string, error?: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string | false | undefined;
  isRegisterInterest?: boolean;
}

export interface ICustomTextArea {
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  headerPlacholder?: string;
  errorMessage?: string;

  InputLeftElement?: React.ReactNode;
  InputRightElement?: React.ReactNode;

  value?: string;
  onChangeText?: (text: string) => void;

  isReadOnly?: boolean;
  keyboardType?: any; // you can also use KeyboardTypeOptions
  onPress?: () => void;
  isFocused?: boolean;

  multiline?: boolean;
  numberOfLines?: number;
  maxLimit?: number;
  height?: number;

  enablesReturnKeyAutomatically?: boolean;
}
export interface GalleryItem {
  image: string | number;
  title?: string;
  subtitle?: string;
}

export interface IBottomCardProps {
  title?: string;
  onPress?: () => void;
  variant?: 'normal' | 'radio';
  svg?: any;
  isSelected?: boolean;
}
export interface MaterialCardItem {
  id: number | string;
  title: string;
  image: string | number;
}

export interface MaterialCardListProps {
  data: MaterialCardItem[];
}

export interface AmenityItem {
  id: number | string;
  title: string;
  icon?: FC<SvgProps>;
}

export interface AmenitiesListProps {
  data: AmenityItem[];
  appLanguage: LanguageEnum;
  iconColor?: string;
}

export interface IDetailsImageSliderProps {
  data: any;
  isRTL: boolean;
  appLanguage: LanguageEnum;
}

export interface NewsItem {
  id: number;
  badge: string[],
  title: string;
  description: string;
  date: string;
  image: string;
}

