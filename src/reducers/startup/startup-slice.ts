import { createSlice } from '@reduxjs/toolkit';
import { startupApi } from '@services/startup/startupApi';
import {
    IAppShuttleFields,
    IDictionary,
    IFooter,
    IHomeCountDownTimer,
    ILanguage,
    IMenu,
    ISection,
    ISocialLinks,
    IStartupResponse,
    ISubscriber,
} from '@services/startup/types';
// import { IApiResponse } from '@services/home/types';
import { LanguageEnum } from '@appTypes/enums';

export interface StartupState {
    introSlides: IIntroSlide[];
    footer?: IFooter[];
    labels?: {
        [key: string]: string;
    };
    options: IOptions;
    deviceInfo: IDeviceInfo;
    showExitDialog?: boolean;
    homeCountDownTimer?: IHomeCountDownTimer[];
    socialLinks?: ISocialLinks;
    languages?: ILanguage[];
    menuList?: IMenu[];
    subscriber?: ISubscriber;
    aboutUsLink: string;
    resourcesLink: string;
    // dictionary: IDictionary;
    appShuttleCommonFields?: IAppShuttleFields;
    primaryText?: string;
    // loginCTA:IloginCTA | undefined;
    moreSections: ISection[];
}
export interface IloginCTA {
    Text: string;
    href: string;
    isAnchorBlank?: boolean;
}
export interface IIntroSlide {
    id?: number;
    backgroundImage: string;
    title: string;
    description: string;
}

export interface IDeviceInfo {
    deviceId: string;
    deviceName: string;
    deviceOS: string;
}
export interface IOptions {
    isLanguage?: boolean;
    language?: LanguageEnum;
    showIntroSlides?: boolean;
    isLanguageProcessing?: boolean;
    isNoInternet?: boolean;
    isTokenExpired?: boolean;
}

const initialState: StartupState = {
    deviceInfo: {
        deviceId: '',
        deviceName: '',
        deviceOS: '',
    },
    introSlides: [],
    options: {
        isLanguage: true,
        language: LanguageEnum.EN,
        showIntroSlides: true,
        isLanguageProcessing: false,
        isNoInternet: false,
        isTokenExpired: false,
    },
    showExitDialog: false,
    homeCountDownTimer: [],
    aboutUsLink: '',
    resourcesLink: '',
    // dictionary: {
    //     labels: {},
    //     validations: {},
    //     placeholders: {},
    //     screens: {},
    // },
    moreSections: [],
};

export const startupSlice = createSlice({
  name: 'startup',
  initialState,
  reducers: {
    setStartupOptions: (
      state: StartupState,
      {payload}: {payload: IOptions},
    ) => {
      state.options = {...state.options, ...payload};
    },
    setStartupLanguage: (
      state: StartupState,
      {payload}: {payload: any | undefined},
    ) => {
      state.options.language = payload;
    },
    setStartupDeviceInfo: (
      state: StartupState,
      {payload}: {payload: IDeviceInfo},
    ) => {
      state.deviceInfo = payload;
    },
    setIsTokenExpired: (state: StartupState, {payload}: {payload: boolean}) => {
      state.options.isTokenExpired = payload;
    },
    setShowExitDialog: (state: StartupState, {payload}: {payload: boolean}) => {
      state.showExitDialog = payload;
    },
    setHomeCountDownTimer: (
      state: StartupState,
      {payload}: {payload: IHomeCountDownTimer[]},
    ) => {
      state.homeCountDownTimer = payload;
    },
    setMoreSections: (state, {payload}) => {
      state.moreSections = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      startupApi.endpoints.startup.matchFulfilled,
      (state, {payload}: {payload: any}) => {
        const data = payload?.data;
        // Map new API response shape into startup state
        // components -> moreSections
        if (data?.components) {
          state.moreSections = data.components;
        } else if (data?.more?.sections) {
          state.moreSections = data.more.sections;
        }

        // footer
        if (data?.footer) {
          state.footer = data.footer;
        }

        // culture -> startup language
        if (data?.culture) {
          state.options.language = data?.culture === 'ar' ? LanguageEnum.AR : LanguageEnum.EN;
        }

        // languages/contentTypes (fallback)
        if (data?.languages) {
          state.languages = data.languages;
        } else if (data?.contentTypes) {
          // contentTypes may not be language objects; only set if it matches expected shape
          // keep existing languages if contentTypes is not the same structure
        }

        // preserve other fields if present
        // subscriber, aboutUsLink, resourcesLink, dictionary, etc. can be mapped here if available
        if (data?.subscriber) state.subscriber = data.subscriber;
        if (data?.aboutUsLink) state.aboutUsLink = data.aboutUsLink;
        if (data?.resourcesLink) state.resourcesLink = data.resourcesLink;
      },
    );
  },
});

export default startupSlice.reducer;
export const {
    setStartupOptions,
    setStartupLanguage,
    setStartupDeviceInfo,
    setShowExitDialog,
} = startupSlice.actions;
