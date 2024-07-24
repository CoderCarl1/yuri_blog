import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'colors',
  title: 'Colors',
  type: 'document',
  fields: [
    defineField({
      name: 'primary',
      title: 'Primary Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'primary_text',
      title: 'Primary Text Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'secondary',
      title: 'Secondary Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'secondary_text',
      title: 'Secondary Text Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'accent',
      title: 'Accent Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'accent_text',
      title: 'Accent Text Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'grayscale_dark',
      title: 'dark',
      description: 'the closest to black that you would like',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
    defineField({
      name: 'grayscale_light',
      title: 'light',
      description: 'the closest to white that you would like',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    }),
  ],
});
