// types.ts

export interface IApiResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export interface IHomeResponse {
  slug: string;
  navBarTitle: string;
  components: IComponent[];
}

export type IComponent =
  | IImageTitleWithTooltip
  | ITitleWithImageBlockWithPicker
  | IHeadingWithMultipleLinks
  | IHeadingWithImageBlockWithPicker;
  

export interface IImageTitleWithTooltip {
  alias: 'imageTitleWithTootip';
  properties: {
    title: string;
    backgroundImage: {
      src: string;
      alt: string;
    };
    tooltipText: string;
    cta: string;
  };
}

export interface ITitleWithImageBlockWithPicker {
  alias: 'titleWithImageBlockWithPicker';
  properties: {
    heading: string;
    cardBlocks: ICardBlock[];
  };
}
export interface IHeadingWithImageBlockWithPicker {
  alias: 'headingWithImageBlockWithPicker';
  properties: {
    heading: string;
    cardBlocks: ICardBlock[];
  };
}

export type ICardBlock =
  | ILabelWithSvgWithCta
  | ILabelWithSvgDescriptionWithCta;

export interface ILabelWithSvgWithCta {
  alias: 'LabelWithSvgWithCta';
  properties: {
    label: string;
    svg: {
      src: string;
      alt: string;
    } | null;
    cta: string;
  };
}

export interface ILabelWithSvgDescriptionWithCta {
  alias: 'labelWithSvgDescriptionWithCta';
  properties: {
    label: string;
    description: string;
    svg: {
      src: string;
      alt: string;
    };
    cta: string;
  };
}

export interface IHeadingWithMultipleLinks {
  alias: 'headingWithMultipleLinks';
  properties: {
    heading: string;
    links: ILabelWithSvgWithCta[];
  };
}
