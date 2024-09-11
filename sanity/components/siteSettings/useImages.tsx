import { useState, useEffect } from 'react';
import { images_fetch } from '@/sanity/lib/fetch.client';
import { get_LocalStorage, set_LocalStorage } from '@/functions/localStorage';
import type { SanityDocument } from 'sanity';

export function useImages() {
  const [images, setImages] = useState<SanityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedImages = get_LocalStorage('images');
    if (storedImages) {
      setImages(storedImages);
      setLoading(false);
    } else {
      images_fetch()
        .then((fetchedImages) => {
          if (fetchedImages) {
            setImages(fetchedImages);
            set_LocalStorage('images', fetchedImages);
          }
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
          setError('Failed to load images.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return { images, loading, error };
}