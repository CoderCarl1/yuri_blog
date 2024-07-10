import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'colors',
  title: 'Colors',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
  ],
});
