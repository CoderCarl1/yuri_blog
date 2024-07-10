import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import Image from '../Image';
import PortableText from '../portableText/index';
import { notFound } from 'next/navigation';
import { isPost } from '@/types/guard';
import type { Post_SanityDocument } from '@/types';

type TPost = {
  post: Post_SanityDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function Post({ post, encodeDataAttribute }: TPost) {
  // TODO: post not found if body not present. Add email to owner about this.
  if (!isPost(post)) {
    return notFound();
  }

  const { title, postImage: {image, metaData}, body } = post;


  return (
    <>
      {image ? (
        <Image
          metaData={metaData}
          dataSanity={encodeDataAttribute?.('coverImage')}
          image={image}
          alt={image?.alt}
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
