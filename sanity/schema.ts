import { type SchemaTypeDefinition } from 'sanity';

import category from './schemas/documents/category';
import post from './schemas/documents/post';
import author from './schemas/documents/author';

import siteSettings from './schemas/singletons/siteSettings'
import navigation from './schemas/singletons/navigation'
import colors from './schemas/singletons/colors'

import blockContent from './schemas/blockContent';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //documents
    post, author, category,

    //singletons,
    siteSettings, navigation, colors,

    //misc
    blockContent
  ],
};
