import { IloginCTA } from "@reducers/startup/startup-slice";

export interface IStartupResponse {
  introSlides: IIntroSlides[];
  homeCountDownTimer: IHomeCountDownTimer[];
  socialLinks: ISocialLinks;
  languages: ILanguage[];
  menuList: IMenu[];
  footer: IFooter[];
  subscriber: ISubscriber;
  aboutUsLink: string;
  resourcesLink: string;
  dictionary: IDictionary;
  appShuttleCommonFields: IAppShuttleFields;
  primaryText?: string;
  loginCTA?: IloginCTA | undefined;
}

export interface ISubscriber {
  primary: string;
  secondary: string;
  frck: string;
}
export interface ISection {
  id: number;
  title: string;
}

export interface IIntroSlides {
  backgroundImage: string;
  title: string;
  description: string;
}

export interface ISocialLinks {
  facebook: string;
  s: string;
  linkedin: string;
  youtube: string;
}

export interface ILanguage {
  code: string;
  name: string;
}

export interface IMenu {
  name: string;
  url: string;
}

export interface IFooter {
  slug: string;
  navBarTitle: string;
}

export interface IHomeCountDownTimer {
  label: string;
  time: string;
}

interface IValidations {
  firstNameValid: string;
  firstNameLengthMin: string;
  firstNameLengthMax: string;
  firstNameRequired: string;
  lastNameValid: string;
  lastNameLengthMin: string;
  lastNameLengthMax: string;
  lastNameRequired: string;
  numberRequired: string;
  numberValid: string;
  emailRequired: string;
  emailValid: string;
  messageRequired: string;
  inquiryRequired: string;
  numberMinLength: string;
  numberMaxLength: string;
  firstNameSpaces: string;
  lastNameSpaces: string;
  titleTypeRequired: string;
}

interface IPlaceholders {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  message: string;
  heading: string;
  inquiry: string;
}

interface ILabels {
  valueMessage: string;
  number: string;
  message: string;
  characters: string;
  submit: string;
  viewAll: string;
  viewMore: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  search: string;
  english: string;
  arabic: string;
  ok: string;
  speaker: string;
  backTo: string;
  scheduledEvents:string,
  resetAll: string;
  apply: string;
  organizer: string;
  corePartners: string;
  participatingPartners: string;
  mediaPartners: string;
  signUpForNewsLetter: string;
  modalTitle: string;
  modalMessage: string;
  modalWarning: string;
  venueMapTitle: string;
  cultureSummit: string;
  programHighlights: string;
  time: string;
  location: string;
  type: string;
  addEvent: string;
  category: string;
  firstName: string;
  lastName: string;
  email: string;
  inquiry: string;
  addedEventToCalender: string;
  eventSuccessMessage: string;
  eventErrorMessage: string;
  eventSuccessTitle: string;
  eventErrorTitle: string;
  notificationsNoData: string;
  speakers: string;
  somethingWentWrong: string;
  permissionNotGranted: string;
  error: string;
  noInternet: string;
  tryAgain: string;
  noRecordsFound: string;
  locationCard: string;
  typeCard: string;
  timeCard: string;
  maximumCapacity: string;
  gmt: string;
  watchLive: string;
  watchReplay: string;
  skip: string;
  next: string;
  back: string;
  chatWithSpeaker: string;
  clickToUpload: string;
  interestFormMessage: string;
  speakerFormMessage: string;
  contactFormMessage: string;
  codeOfConduct: string;
  register: string;
  unRegister: string;
  soldOut: string;
  logOut: string;
  capacity: string;
  confirm: string;
  otpDescription: string;
  enterTheCode: string;
  facilitator: string;
  caseType: string;
  duplicateNewsletter: string;
  didntRecOtp:string;
  getNewOtp:string;
  requestNewOtp:string;
  submitOtpCta:string;
  timer:number;
  invalidOtp: string
  loginUrl:string
  forgetUrl:string;
  hideSpeakers:boolean;
  hideProgramme:boolean;
  sessionTitle: string;
  sessiondesc: string;
  chatUnavailable:string;
  loginErrorMsg:string;
  chatPlaceholderText:string;
  duplicateEntryError:string;
  otpAlreadyGeneratedError:string;
}

interface IScreens {
  home: string;
  programs: string;
  speakers: string;
  notifications: string;
  more: string;
  aboutUs: string;
  partners: string;
  contactInfo: string;
  resources: string;
  speakerRegistration: string;
  programme: string;
  filter: string;
  hotels: string;
  shuttles: string;
  registerYourInterest: string;
  savedItems: String;
  workshops: String;
  profile: string;
  bookmarks: string;
  favoriteSpeakers: string;
  login: string;
  chat: string;
  chatSettings:string;
  message:string;
  moreDescription: string;
}

export interface IAppShuttleFields {
  timingsLabel: string;
  approximateTravelTimeLabel: string;
  stopLabel: string;
}

export interface IDictionary {
  validations: IValidations;
  placeholders: IPlaceholders;
  labels: ILabels;
  screens: IScreens;
  channel: string;
}
