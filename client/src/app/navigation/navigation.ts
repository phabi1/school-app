import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'tools',
                title    : 'Outils',
                translate: 'NAV.TOOLS.TITLE',
                type     : 'item',
                icon     : 'setting',
                url      : '/tools',
            }
        ]
    }
];
