import type { Image, ImageMetadata, SanityDocument } from 'sanity';

declare global {
  export type SanityImage = Image & {
    alt?: string | undefined;
  };

  export type ClientSanityImage = Asset & ImageMetadata & {
    alt?: string | undefined;
  }
  export type SanityImageMetadata = ImageMetadata;
  //   export type Post_SanityDocument<
  //     T extends Record<string, any> = Record<string, any>,
  //   > = SanityDocument<T> & {
  //     title: string;
  //     mainImage: Image;
  //     mainImageMetaData: AssetMetadataType;
  //     slug: string | undefined;
  //   };
}
