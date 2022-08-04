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

const pages = {
    id: 'pages',
    title: 'Pages',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
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
        },
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
