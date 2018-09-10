import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'classe',
        title    : 'Ma classe',
        translate: 'navigation.myClass',
        type     : 'group',
        children : [
            {
                id       : 'room',
                title    : 'classe',
                translate: 'navigation.myClass.room',
                type     : 'item',
                icon     : 'bank',
                url      : '/apps/classes/edit',
            },
            {
                id       : 'students',
                title    : 'Elèves',
                translate: 'navigation.myClass.students',
                type     : 'item',
                icon     : 'user',
                url      : '/apps/classes/students',
            },
            {
                id       : 'tools',
                title    : 'Outils',
                translate: 'navigation.myClass.tools',
                type     : 'item',
                icon     : 'setting',
                url      : '/apps/tools',
            }
        ]
    }
];
