'use server'
import { urlForImage } from '@/sanity/lib/utils';
// import { getImageDimensions } from '@sanity/asset-utils';

import Image from 'next/image';
import cx from 'classnames';

interface ImageProps {
  image?: any;
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classNames?: string;
  dataSanity?: string;
  priority?: boolean;
  // present in portabletext images only
  value?: any;
  metaData?: {lqip?: string};
}

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

export default async function Main({
  image,
  alt,
  width,
  height,
  size = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw',
  classNames = "",
  priority = false,
  value = null,
  metaData,
  dataSanity,
  ...props
}: ImageProps) {

  // Check if value is provided and extract the image data from it
  const finalImage = value || image;
  if (!finalImage?.asset?._ref) {
    return null;
  }

  if (value) {
    props = {};
  }

  const finalAlt = value?.alt || alt || "";
  const finalWidth = width || /** getImageDimensions(finalImage).width || */ DEFAULT_WIDTH;
  const finalHeight = height || /** getImageDimensions(finalImage).height || */ DEFAULT_HEIGHT;
  const imageUrl = finalImage && await urlForImage(finalImage).then((func) => func(finalHeight, finalWidth));
  if (!imageUrl) return null;

  return (
    <div
      className={cx("relative w-full overflow-hidden rounded-[3px] bg-gray-50", classNames)}
      style={{height: finalHeight, width: finalWidth}}
      data-sanity={dataSanity}
    >
      {/* If we want to add text over the image we can use 
        background: metadata.palette.dominant.background 
        &
        color: metadata.palette.dominant.foreground
      */}
        <Image
          className="absolute h-full w-full object-left not-prose"
          alt={finalAlt}
          width={finalWidth}
          height={finalHeight}
          sizes={size}
          src={imageUrl}
          placeholder={metaData?.lqip ? 'blur' : 'empty'}
          blurDataURL={metaData?.lqip}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
    </div>
  );
}
