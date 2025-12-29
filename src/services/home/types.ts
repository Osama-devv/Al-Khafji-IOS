export interface IApiResponse<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
}

export interface IHomeResponse {
  slug: string;
  navBarTitle: string;
  components: IComponent[];
}

export interface IComponent {
  alias: string;
  properties: IComponentProperties;
}

export interface IComponentProperties {
  heading?: string;
  title?: string;
  description?: string;
  cta?: ICTA | string;
  navigationsMenus?: INavigationMenu[];
  featuredResidences?: any[]; // Replace `any` with your residence type if available
  fromLabel?: string;
  events?: IEventCategoryOrItem[];
  mediaCentres?: IMediaCentreItem[];
  cards?: ICard[];
  icon?: any;
}

export interface INavigationMenu {
  alias: string;
  properties: {
    label: string;
    svg?: any;
    cta: string;
  };
}

export interface ICTA {
  text: string;
  href: string;
  isExternal: boolean;
  target?: string;
}

export interface IEventCategoryOrItem {
  alias: string;
  properties: IEventCategoryProperties | IEventItemProperties;
}

export interface IEventCategoryProperties {
  slug: string;
  displayText: string;
  mobileIcon?: any;
  description: string;
  locationsTabLabel?: string;
  eventsTabLabel?: string;
}

export interface IEventItemProperties {
  slug: string;
  eventCategory: {
    alias: string;
    properties: IEventCategoryProperties;
  };
  isPopular: boolean;
  heading: string;
  thumbnailImage?: any;
  thumbnailDescription?: string;
  dateInfo?: string;
  locationInfo?: string;
  appComponents?: IAppComponent[];
  mobileHeroBannerImage?: any;
  similarEventsCaption?: string;
  similarEventsHeading?: string;
  viewAllCta?: string;
}

export interface IAppComponent {
  alias: string;
  properties: {
    heading?: string;
    description?: string;
    readMoreText?: string;
    readmoreTextLogoOptional?: any;
    keyValues?: IKeyValue[];
    cta1?: string;
    Cta2?: string;
    priceFromLabel?: string;
    price?: string;
    ticketCta?: string;
    title?: string;
    image?: any;
  };
}

export interface IKeyValue {
  alias: string;
  properties: {
    heading: string;
    description: string;
  };
}

export interface IMediaCentreItem {
  alias: string;
  properties: IMediaCentreProperties;
}

export interface IMediaCentreProperties {
  slug: string;
  mediaCentreCategory: {
    alias: string;
    properties: {
      slug: string;
      displayText: string;
    };
  };
  heading?: string;
  date: string;
  thumbnailDescription?: string;
  thumbnailImage?: any;
  heroBannerWebImage?: any;
  appComponents?: IAppComponent[];
  detailHeroBannerImage?: any;
  similarMediaCentreCaption?: string;
  similarEventsHeading?: string;
  viewAllCta?: string;
}

export interface ICard {
  alias: string;
  properties: {
    title: string;
    description?: string;
    image?: any;
    svg?: any;
  };
}
