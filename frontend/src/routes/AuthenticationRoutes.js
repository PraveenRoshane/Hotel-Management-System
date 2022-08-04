import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/auth-pages/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/auth-pages/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister />
        }
    ]
};

export default AuthenticationRoutes;
