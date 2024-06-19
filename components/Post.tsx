import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { SanityDocument } from 'next-sanity';
import Image from './Image';
import PortableText from './portableText/index';

type TPost = {
  post: SanityDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function Post({ post, encodeDataAttribute }: TPost) {
  const { title, mainImage, mainImageMetaData, body } = post;

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {mainImage ? (
        <Image
          metaData={mainImageMetaData}
          data-sanity={encodeDataAttribute?.('coverImage')}
          image={mainImage}
          alt={mainImage?.alt}     
          classNames="mb-4"     
        />
      ) : null}
      {title ? <h1>{title}</h1> : null}
      {body ? 
        <PortableText value={body} />
      : null}
    </main>
  );
}
