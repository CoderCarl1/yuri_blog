import { FaCog } from "react-icons/fa";
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: FaCog,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    // General Site Stuff
    defineField({
      name: 'general',
      title: 'General',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          description: 'This field is the title of your personal website.',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          description: 'what the website is about.',
          title: 'description',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'The image used for the tab (512px * 512px)',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'navigation',
          title: 'Navigation Items',
          type: 'array',
          of: [
            defineField({
              name: 'navigationItem',
              title: 'Navigation Item',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  description: 'The text displayed for this navigation item',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'link_type',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Single Link', value: 'single' },
                      { title: 'Submenu', value: 'submenu' },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  description: 'The link URL for single link items',
                  hidden: ({ parent }) => parent.link_type !== 'single',
                  validation: (rule) =>
                    rule.custom((url) => {
                      if (!url) {
                        return 'URL is required for single link items';
                      }
                      return true;
                    }),
                }),
                defineField({
                  name: 'submenu',
                  title: 'Submenu Links',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'submenuItem',
                      title: 'Submenu Item',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'title',
                          title: 'Title',
                          type: 'string',
                          description: 'The text displayed for this submenu item',
                          validation: (rule) => rule.required(),
                        }),
                        defineField({
                          name: 'url',
                          title: 'URL',
                          type: 'url',
                          description: 'The link URL for this submenu item',
                          validation: (rule) => rule.required(),
                        }),
                      ],
                    }),
                  ],
                  hidden: ({ parent }) => parent.link_type !== 'submenu',
                  validation: (rule) =>
                    rule.custom((submenu) => {
                      if (!submenu || submenu.length === 0) {
                        return 'At least one submenu item is required for submenu links';
                      }
                      return true;
                    }),
                }),
              ]
            })
          ]
        })
      ]
    }),
    // siteColors
    // TODO: custom pallets to chose from
    defineField({
      name: "colors",
      title: 'Colors',
      type: "object",
      fields: [
        defineField({
          name: 'color_primary',
          title: 'Primary Color',
          type: 'string'
        }),
        defineField({
          name: 'color_primary_text',
          title: 'Primary Text Color',
          type: 'string'
        }),
        defineField({
          name: 'color_secondary',
          title: 'Secondary Color',
          type: 'string'
        }),
        defineField({
          name: 'color_secondary_text',
          title: 'Secondary Text Color',
          type: 'string'
        }),
        defineField({
          name: 'color_accent',
          title: 'Accent Color',
          type: 'string'
        }),
        defineField({
          name: 'color_accent_text',
          title: 'Accent Text Color',
          type: 'string'
        }),
        defineField({
          name: 'color_grayscale_dark',
          title: 'dark',
          description: 'the closest to black that you would like',
          type: 'string'
        }),
        defineField({
          name: 'color_grayscale_light',
          title: 'light',
          description: 'the closest to white that you would like',
          type: 'string'
        }),
      ]
    }),
    //Typography
    // TODO: default fonts
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        defineField({
          name: 'font_main',
          title: 'font',
          description: 'The main font used on the website',
          type: 'object',
          fields: [
            defineField({
              name: 'font_file',
              title: 'Font File',
              type: 'file',
            }),
            defineField({
              name: 'font_url',
              title: 'Fonts URL',
              type: 'url',
            })
          ]
        }),
        defineField({
          name: 'headingFont',
          title: 'Heading Font',
          description: 'The font used for headings, and accent text.',
          type: 'object',
          fields: [
            defineField({
              name: 'font_file',
              title: 'Font File',
              type: 'file',
            }),
            defineField({
              name: 'font_url',
              title: 'Fonts URL',
              type: 'url',
            })
          ]
        }),
      ]
    }),
    // SEO Specific
    defineField({
      name: 'seo',
      title: 'Search Engine Optimization(SEO)',
      type: 'object',
      fields: [
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Displayed on social cards and search engine results.',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'keywords',
          title: "Keywords to describe your site",
          type: 'string'
        }),
        defineField({
          name: 'overview',
          description:
            'Used both for the <meta> description tag for SEO, and the personal website subheader.',
          title: 'Description',
          type: 'array',
          of: [
            // Paragraphs
            defineArrayMember({
              lists: [],
              marks: {
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'Url',
                      },
                    ],
                  },
                ],
                decorators: [
                  {
                    title: 'Italic',
                    value: 'em',
                  },
                  {
                    title: 'Strong',
                    value: 'strong',
                  },
                ],
              },
              styles: [],
              type: 'block',
            }),
          ],
          validation: (rule) => rule.max(155).required(),
        }),
      ]
    }),
    // Socials
    defineField({
      name: 'social_media',
      title: 'Social Media Profiles',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'social_media_schema' }] }
      ],
    }),
    // analytics - Consider expanding
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        // Add more tracking options if needed
      ]
    })
  ]
});

