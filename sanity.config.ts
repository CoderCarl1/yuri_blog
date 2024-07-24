'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// package plugins
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { colorInput } from '@sanity/color-input';

import { apiVersion, dataset, projectId } from './sanity/lib/api';
import { schema } from './sanity/schema';
import { locate } from './sanity/presentation/locate';
import Structure from './sanity/adminStructure/sanity.structure';
import DefaultDocumentStructure from './sanity/adminStructure/sanity.documentStructure';

export default defineConfig({
  name: 'yuris_blog',
  title: "Yuri's Blog",
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) =>
            !['siteSettings', 'colors', 'homepage', 'navigation'].includes(
              templateItem.templateId,
            ),
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (
        ['siteSettings', 'colors', 'homepage', 'navigation'].includes(
          schemaType,
        )
      ) {
        return prev.filter(
          ({ action }) =>
            !['unpublish', 'delete', 'duplicate'].includes(action || ''),
        );
      }
      return prev;
    },
  },
  plugins: [
    structureTool({
      title: 'Home',
      structure: Structure,
      defaultDocumentNode: DefaultDocumentStructure,
    }),
    media(),
    colorInput(),
    // TODO: turn off visionTool before deployment
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      title: 'Live Updater',
      locate,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],
  // form: {
  //   image: {
  //     assetSources: () => [media],
  //   }
  // }
});
