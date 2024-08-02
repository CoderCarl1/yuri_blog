import { InternalLink } from '../Link';
import Image from '../Image';
import type { Post_SanityDocument } from '@/types';
import { isPost } from '@/types/guard';

export default function PostCard({ post }: { post: Post_SanityDocument }) {
  if (!isPost) {
    return null;
  }
  const {
    slug,
    title,
    postImage: { image, metaData },
  } = post;

  return (
    <InternalLink href={slug} classNames="p-4">
      <h2 className="p-4 hover:bg-blue-50">{title}</h2>
      {image && (
        <Image
          metaData={metaData}
          image={image}
          alt={image?.alt}
          classNames="mb-4 w-full h-full object-fill"
          width={250}
          height={250}
          // caption={title}
        />
      )}
    </InternalLink>
  );
}
