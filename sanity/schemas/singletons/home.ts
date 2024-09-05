import { PiHouseBold } from 'react-icons/pi';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  icon: PiHouseBold,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      description:
        'These are the posts that will appear first on your landing page.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'post' }],
        }),
      ],
    }),
    // TODO: add different layout options
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      };
    },
  },
});
