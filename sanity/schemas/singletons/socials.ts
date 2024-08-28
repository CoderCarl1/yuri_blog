import { defineField, defineType } from 'sanity';


export default defineType({
  name: 'schema_social_media',
  title: 'Social Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of your social media profile',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The URL of your social media profile',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Optional icon for your social media profile',
      options: {
        hotspot: true,
      },
    }),
  ],
});