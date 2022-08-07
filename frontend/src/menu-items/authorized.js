// assets
import { IconDashboard, IconKey, IconError404, IconUser, IconDatabase } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconDashboard,
    IconError404,
    IconUser,
    IconDatabase
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const authorized = {
    id: 'pages',
    title: 'Pages',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/profile/default',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'grid',
            title: 'DataGrid',
            type: 'item',
            url: '/grid/default',
            icon: icons.IconDatabase,
            breadcrumbs: false
        },
        {
            id: 'error',
            title: 'Error Page',
            type: 'item',
            url: '/error/default',
            icon: icons.IconError404,
            breadcrumbs: false
        }
    ]
};

export default authorized;
