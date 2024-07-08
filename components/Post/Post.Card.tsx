import { InternalLink } from '../Link';
import Image from '../Image';
import { Post_SanityDocument } from './types';
import { isPostSanityDocument } from '@/types/guard';

export default function PostCard({ post }: { post: Post_SanityDocument }) {
  if (!isPostSanityDocument) {
    return null;
  }
  const { _id, slug, title, mainImage, mainImageMetaData } = post;

  return (
    <InternalLink
      key={_id}
      href={slug}
      classNames="p-4 hover:bg-blue-50 flex justify-between align-center grow"
    >
      {/* <h2 className="p-4 hover:bg-blue-50">{title}</h2> */}
      <h2>{title}</h2>
      {mainImage && (
        <Image
          metaData={mainImageMetaData}
          image={mainImage}
          alt={mainImage?.alt}
          classNames="mb-4"
          width={150}
          height={150}
        />
      )}
    </InternalLink>
  );
}
