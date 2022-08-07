// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useAuth } from '../../../../utils/firebase';
import unauthorized from '../../../../menu-items/unauthorized';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const user = useAuth();
    const unauthitems = {
        items: [unauthorized]
    };

    const authNavItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const unauthNavItems = unauthitems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const authCheck = () => {
        if (user) {
            return authNavItems;
        } else {
            return unauthNavItems;
        }
    };

    return <>{authCheck()}</>;
};

export default MenuList;
