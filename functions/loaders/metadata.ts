import { draftMode } from 'next/headers';
// import filterDataToSingleItem from '@utils/FilterDataToSingleItem';
// import { loadSeo } from '@loader/loadQuery';
import { createOpenGraphImage } from './openGraph';
import { sanityFetch } from '@/sanity/lib/fetch.server';
import { Settings } from '@/types';
// import { SETTINGS_QUERY } from '@/sanity/lib/queries';

const createMetadata = async (docType: string, slug?: string) => {
  //   const { data: seoData } = await loadSeo(docType, slug);
  const siteSettings = await sanityFetch<Settings>({
    query: SETTINGS_QUERY,
  });

  const preview = draftMode().isEnabled;
  const data = filterDataToSingleItem(seoData, preview);
  const domain = data?.setting?.domain?.replace(/\/$/, '');
  const ogImage = createOpenGraphImage({
    title: data?.seo?.ogImageGenerator?.title,
    subtitle: data?.seo?.ogImageGenerator?.subtitle,
    bgColor: data?.seo?.ogImageGenerator?.bgColor,
    domain,
  });
  return {
    metadataBase: domain ? new URL(domain) : undefined,
    icons: {
      icon: data?.setting?.favicon,
      shortcut: data?.setting?.favicon,
      apple: data?.setting?.favicon,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: data?.setting?.favicon,
      },
    },
    /** Add i18n */
    // alternates: {
    //   canonical: '/',
    //   languages: {
    //     'en-US': '/',
    //     'nl-NL': '/nl',
    //     'es-ES': '/es'
    //   }
    // },
    title: data?.seo?.seoTitle || 'Untitled',
    description: data?.seo?.metaDescription,
    openGraph: {
      images: ogImage,
    },
  };
};

export default createMetadata;
