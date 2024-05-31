import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { PortableText } from '@portabletext/react';
import { SanityDocument } from 'next-sanity';
import Image from './Image';

type TPost = {
  post: SanityDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function Post({ post, encodeDataAttribute }: TPost) {
  const { title, mainImage, body } = post;

  return (
    <main className="container mx-auto prose prose-lg p-4">
      {title ? <h1>{title}</h1> : null}
      {mainImage ? (
        <Image
          data-sanity={encodeDataAttribute?.('coverImage')}
          image={mainImage}
          alt={mainImage?.alt}
          classNames="relative aspect-[16/9]"
        />
      ) : null}
      {body ? <PortableText value={body} /> : null}
    </main>
  );
}
