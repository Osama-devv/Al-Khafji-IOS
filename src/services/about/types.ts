export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export interface IMoreResponse {
  slug: string;
  navBarTitle: string;
  components: Component[];
}

export type Component =
  | MobileHeroBanner
  | HeadingDescriptionWithCta
  | MobileFeaturedDistricts
  | MobileFeaturedCommunity
  | HeadingWithTwoCardsWithItems
  | MobileFeaturedMediaCentres
  | FeaturedAmenities
  | HeadingBgImageWithCards;

export interface MobileHeroBanner {
  alias: 'mobileHeroBanner';
  properties: {
    title?: string;
    image?: {
      src?: string;
    };
  };
}

export interface HeadingDescriptionWithCta {
  alias: 'headingDescriptionWithCta';
  properties: {
    heading: string;
    description: string;
    readMoreText: string;
    readLessText:string
    slug: string;
    children?: HeadingDescriptionChild[];
  };
}

export interface HeadingDescriptionChild {
  heading: string;
  description: string;
  countriesConnectivity?: CountryConnectivity[];
}

export interface CountryConnectivity {
  alias: 'countriesWithFlightConnectivityInfo';
  properties: {
    countryName: string;
    countryDescription: string;
    connectivityInfo: TitleDescriptionSvgWithImage[];
  };
}

export interface TitleDescriptionSvgWithImage {
  alias: 'titleDescriptionSvgWithImage';
  properties: {
    title: string;
    description: string;
    tooltipText: string;
  };
}

export interface MobileFeaturedDistricts {
  alias: 'mobileFeaturedDistricts';
  properties: {
    title: string;
    featuredItems: any[]; // Empty array, can type later if known
  };
}

export interface MobileFeaturedCommunity {
  alias: 'mobileFeaturedCommunity';
  properties: {
    title: string;
    communities: any | null;
  };
}

export interface HeadingWithTwoCardsWithItems {
  alias: 'headingWithTwoCardsWithItems';
  properties: {
    heading: string;
    children: HeadingWithTwoCardsChild[];
  };
}

export interface HeadingWithTwoCardsChild {
  heading: string;
  description: string;
  slug?: string;
  images?: any[];
  children?: HeadingWithTwoCardsGrandChild[];
}

export interface HeadingWithTwoCardsGrandChild {
  content?: HeadingAndDescription[];
  imageWithDescription?: DateHeadingWithImage[];
}

export interface HeadingAndDescription {
  alias: 'headingAndDescription';
  properties: {
    heading: string;
    description: string;
  };
}

export interface DateHeadingWithImage {
  alias: 'dateHeadingWithImage';
  properties: {
    date: string;
    heading: string;
    description: string;
    number: string;
  };
}

export interface MobileFeaturedMediaCentres {
  alias: 'mobileFeaturedMediaCentres';
  properties: {
    title: string;
    mediaCentres: MediaCentreItem[];
    cta: string;
    slug: string;
  };
}

export interface MediaCentreItem {
  alias: 'mediaCentreItem';
  properties: {
    slug: string;
    mediaCentreCategory: MediaCentreCategory;
    heading: string;
    date: string;
    thumbnailDescription: string;
    thumbnailImage: {
      src: string;
      alt: string;
    };
    appComponents: AppComponent[];
    similarMediaCentreCaption: string;
    similarEventsHeading: string;
    viewAllCta: string;
  };
}

export interface MediaCentreCategory {
  alias: 'mediaCentreCategory';
  properties: {
    slug: string;
    displayText: string;
  };
}

export type AppComponent =
  | DescriptionWithIndentedText
  | TitleDetailDescriptionWithImage;

export interface DescriptionWithIndentedText {
  alias: 'descriptionWithIndentedText';
  properties: {
    description: string;
  };
}

export interface TitleDetailDescriptionWithImage {
  alias: 'titleDetailDescriptionWithImage';
  properties: {
    title: string;
    description: string;
  };
}

export interface FeaturedAmenities {
  alias: 'featuredAmenities';
  properties: {
    heading: string;
    amenties: any;
    cta: string;
    slug: string;
  };
}

export interface AmenityItem {
  alias: 'amenityItem';
  properties: {
    title: string;
    description: string;
  };
}

export interface HeadingBgImageWithCards {
  alias: 'headingBgImageWithCards';
  properties: {
    heading: string;
    backgroundImage?: {
      src?: string;
    };
    projectFeatures: TitleDescriptionWithImage[];
  };
}

export interface TitleDescriptionWithImage {
  alias: 'titleDescriptionWithImage';
  properties: {
    title?: string;
    Description?: string;
  };
}
