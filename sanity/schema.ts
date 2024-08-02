import { type SchemaTypeDefinition } from 'sanity';

import category from './schemas/documents/category';
import post from './schemas/documents/post';
import author from './schemas/documents/author';

import siteSettings from './schemas/singletons/siteSettings';
import home from './schemas/singletons/home';

//Referenced schemas
import blockContent from './schemas/blockContent';
import socials from './schemas/singletons/socials';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //documents
    post,
    author,
    category,

    //singletons,
    siteSettings,
    home,
    
    //misc
    socials,
    blockContent,
  ],
};
