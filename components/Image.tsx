import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';
import cx from 'classnames';

interface ImageProps {
  image?: any;
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classNames?: string;
  'data-sanity'?: string;
  priority?: boolean;
  metaData?: {lqip?: string};
}

export default function Main({
  image,
  alt = 'Cover image',
  width = 1200,
  height = 800,
  size = '100vw',
  classNames = "",
  priority = false,
  metaData,
  ...props
}: ImageProps) {
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).fit('fill').url();

  console.log("image  metaData stuff", {...metaData})
  return (
    <div
      className={cx("relative w-full overflow-hidden rounded-[3px] bg-gray-50", classNames)}
      style={{height: height, width: width}}
      data-sanity={props['data-sanity']}
    >
      {/* If we want to add text over the image we can use 
        background: metadata.palette.dominant.background 
        &
        color: metadata.palette.dominant.foreground
      
      */}
      {imageUrl && (
        <Image
          className="absolute h-full w-full object-left not-prose"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder={metaData?.lqip ? 'blur' : 'empty'}
          blurDataURL={metaData?.lqip}
          priority={priority}
          loading='lazy'
          {...props}
        />
      )}
    </div>
  );
}
