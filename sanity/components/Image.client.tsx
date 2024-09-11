import Image from 'next/image';
import cx from 'classnames';
import { client } from '../lib/client'
import imageUrlBuilder from '@sanity/image-url'
import { isClientImage } from '@/types/guard';

// Get a pre-configured url-builder from your sanity client
// console.log("1")
// const builder = imageUrlBuilder(client)
// console.log("2")
// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
// function urlFor(source: SanityImage) {
//   console.log("3")
//   return builder.image(source)
// }

interface ImageProps {
  image?: ClientSanityImage;
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classNames?: string;
  priority?: boolean;
  // present in portabletext images only
  metaData?: SanityImageMetadata;
}

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

export default async function Main({
  image,
  alt = '',
  width,
  height,
  size = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw',
  classNames = '',
  priority = false,
  metaData,
  ...props
}: ImageProps) {
  console.log("4 image recieved was ", image)
  /**
   TODO: make variants
    - banner
    - thumbnail
    - large
    - med
    - small
    || banner, large, normal, thumbnail
  */
  if (isClientImage(image)) {
    // return <div>iS IMAGE</div>
    const finalWidth = width || DEFAULT_WIDTH;
    const finalHeight = height || DEFAULT_HEIGHT;
    // const imageUrl = urlFor(image).width(200).url();
    // if (!imageUrl) return null;

    return (
      <Image
        className={cx("not-prose block min-h-[140px]", classNames)}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        sizes={size}
        src={image.url ? image.url : ''}
        placeholder={metaData?.lqip ? 'blur' : 'empty'}
        blurDataURL={metaData?.lqip}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
    )
  }
  console.log("5 was not an image")
  return <div>IMAGE PLACEHOLDER </div>

}
