import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import Image from '../Image';
import PortableText from '../portableText/index';
import { isPostSanityDocument } from '@/types/guard';
import { notFound } from 'next/navigation';
import type { Post_SanityDocument } from './';

type TPost = {
  post: Post_SanityDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function Post({ post, encodeDataAttribute }: TPost) {
  // TODO: post not found if body not present. Add email to owner about this.
  if (!isPostSanityDocument(post)) {
    return notFound();
  }

  const { title = '', mainImage, mainImageMetaData, body } = post;

  return (
    <>
      {mainImage ? (
        <Image
          metaData={mainImageMetaData}
          dataSanity={encodeDataAttribute?.('coverImage')}
          image={mainImage}
          alt={mainImage?.alt}
          classNames="mb-4"
        />
      ) : null}
      {/* {title ? <h1 className='font-serif text-4xl'>{title}</h1> : null} */}
      <div className="prose prose-lg">
        <PortableText value={body} />
      </div>
    </>
  );
}
