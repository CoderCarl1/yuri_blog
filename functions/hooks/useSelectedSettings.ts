import { useState, useEffect, useLayoutEffect } from 'react';
import { sanityStructure } from '@/types/siteSettings.type';


function useSelectedItem(sanityStructure: sanityStructure[]) {
    const [selectedItem, setSelectedItem] = useState<sanityStructure | null>(() => getSelectedItemFromParams());

    function getSelectedItemFromParams() {
        const params = new URLSearchParams(window.location.search);
        const settingsParam = params.get('settings');
        if (settingsParam) {
            return sanityStructure.find(struct => struct.name === settingsParam) || null;
        }
        return null;
    };

    useLayoutEffect(() => {
        const url = new URL(window.location.href);
console.log("useSelectedItem useLayoutEffect ran ")
        if (selectedItem) {
            url.searchParams.set('settings', selectedItem.name);
        } else {
            url.searchParams.delete('settings');
        }

        window.history.pushState({}, '', url.toString());
    }, [selectedItem]);

    return [selectedItem, setSelectedItem] as const;
}

export default useSelectedItem;