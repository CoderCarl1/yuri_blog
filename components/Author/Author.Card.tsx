// import { InternalLink } from '../Link';
import Image from '../Image';
import { isAuthor } from '@/types/guard';
import { Author } from '@/types';

export default function PostCard({ author }: { author: Author }) {
  if (!isAuthor) {
    return null;
  }
  const { name, authorImage: { image, metaData } } = author;


  return (
    // <InternalLink
    //   href={slug}
    //   classNames="p-4 grid grid-cols-1 grid-rows-1"
    // >
      <div className='p-4 grid grid-cols-1 grid-rows-1'>
        <h2>{name}</h2>
        {image && (
          <Image
            metaData={metaData}
            image={image}
            alt={image?.alt}
            classNames="mb-4 w-full h-full object-fill"
            width={800}
          />
        )}
      </div>
    // </InternalLink>
  );
}
