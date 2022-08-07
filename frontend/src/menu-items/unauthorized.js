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

const unauthorized = {
    id: 'home',
    title: 'Home',
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
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/login',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/register',
                    target: true
                }
            ]
        }
    ]
};

export default unauthorized;
