import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { SanityDocument } from 'next-sanity';
import Image from '../Image';
import PortableText from '../portableText/index';

type TPost = {
  post: SanityDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function Post({ post, encodeDataAttribute }: TPost) {

    // TODO: post not found if body not present. Add email to owner about this.

  const { title = "", mainImage, mainImageMetaData, body } = post;

  return (
    <main className="container mx-auto p-4">
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
      {body ? 
        <div className='prose prose-lg'>
          <PortableText value={body} />
        </div>
      : null}
    </main>
  );
}
