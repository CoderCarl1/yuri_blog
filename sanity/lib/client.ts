import { createClient } from 'next-sanity';

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl /** , revalidateSecret */,
} from './api';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  /** useCdn: revalidateSecret ? false : true, */
  useCdn: true,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
  },
});
