// import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'siteSettings',
    type: 'document',
    //   icon: CogIcon,
    // Uncomment below to have edits publish automatically as you type
    // liveEdit: true,
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
            name: 'title',
            description: 'This field is the title of your personal website.',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
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
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                subtitle: 'Home',
                title,
            }
        },
    },
})