import { useState, useEffect, useLayoutEffect } from 'react';
import { sanityStructure } from '@/types/sanity.type';

function useSelectedItem(sanityStructure: sanityStructure[]) {
  const [item, setItem] = useState<sanityStructure | null>(() =>
    getSelectedItemFromParams(),
  );

  function getSelectedItemFromParams() {
    const params = new URLSearchParams(window.location.search);
    const settingsParam = params.get('settings');
    if (settingsParam) {
      return (
        sanityStructure.find((struct) => struct.name === settingsParam) || null
      );
    }
    return null;
  }

  useLayoutEffect(() => {
    const url = new URL(window.location.href);

    if (item) {
      url.searchParams.set('settings', item.name);
    } else {
      url.searchParams.delete('settings');
    }

    window.history.pushState({}, '', url.toString());

    return () => {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('settings');
      window.history.pushState({}, '', cleanUrl.toString());
    };
  }, [item]);

  return [item, setItem] as const;
}

export default useSelectedItem;
