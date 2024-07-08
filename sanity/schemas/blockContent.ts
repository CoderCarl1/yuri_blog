import { defineType, defineArrayMember } from 'sanity';
import {
  PiFileImageLight,
  PiLinkSimple,
  PiTextAaBold,
  PiTextItalic,
  PiTextAUnderlineLight,
} from 'react-icons/pi';
import { HiOutlineExternalLink } from 'react-icons/hi';

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: 'Strong', value: 'strong', icon: PiTextAaBold },
          { title: 'Italic', value: 'em', icon: PiTextItalic },
          {
            title: 'Underline',
            value: 'underline',
            icon: PiTextAUnderlineLight,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Internal Link',
            name: 'link',
            type: 'object',
            icon: HiOutlineExternalLink,
            description: 'the page is not from this blog',
            fields: [
              {
                title: 'Page/Post',
                name: 'link',
                type: 'reference',
                to: [{ type: 'post' }],
                icon: PiLinkSimple,
              },
            ],
          },
          {
            title: 'External URL',
            name: 'external',
            type: 'object',
            icon: HiOutlineExternalLink,
            description: 'the page is not from this blog',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                icon: PiLinkSimple,
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      // options: {
      //   hotspot: true
      //  },
      // fields: [
      //   {
      //     name: 'alt',
      //     type: 'string',
      //     title: 'Alternative Text',
      //     description: ''
      //   },
      // ],
      icon: PiFileImageLight,
    }),
  ],
});
