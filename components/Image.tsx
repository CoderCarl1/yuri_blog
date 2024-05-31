import { urlForImage } from '@/sanity/lib/utils';
import Image from 'next/image';

interface ImageProps {
  image?: { asset?: any };
  alt?: string;
  width?: number;
  height?: number;
  size?: string;
  classNames?: string;
  'data-sanity'?: string;
}

export default function Main({
  image,
  alt = 'Cover image',
  width = 1200,
  height = 800,
  size = '100vw',
  classNames,
  ...props
}: ImageProps) {
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).fit('crop').url();

  return (
    <div
      className={`w-full overflow-hidden rounded-[3px] bg-gray-50 ${classNames}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          className="absolute h-full w-full"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
        />
      )}
    </div>
  );
}
