import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { jsx as _jsx } from 'react/jsx-runtime';
import { Close } from '@mui/icons-material';

const StyledChip = styled(Chip)(({ theme }) => ({
    justifyContent: 'left',
    '& .icon': {
        color: 'inherit'
    },
    '&.New': {
        color: theme.palette.info.dark,
        border: `1px solid ${theme.palette.info.main}`
    },
    '&.Accepted': {
        color: theme.palette.success.dark,
        border: `1px solid ${theme.palette.success.main}`
    },
    '&.PartiallyFilled': {
        color: theme.palette.warning.dark,
        border: `1px solid ${theme.palette.warning.main}`
    },
    '&.Rejected': {
        color: theme.palette.error.dark,
        border: `1px solid ${theme.palette.error.main}`
    }
}));
const Status = /*#__PURE__*/ React.memo((props) => {
    const { status } = props;
    let icon = null;

    if (status === 'Rejected') {
        icon = /*#__PURE__*/ _jsx(Close, {
            className: 'icon'
        });
    } else if (status === 'New') {
        icon = /*#__PURE__*/ _jsx(InfoIcon, {
            className: 'icon'
        });
    } else if (status === 'PartiallyFilled') {
        icon = /*#__PURE__*/ _jsx(AutorenewIcon, {
            className: 'icon'
        });
    } else if (status === 'Accepted') {
        icon = /*#__PURE__*/ _jsx(DoneIcon, {
            className: 'icon'
        });
    }

    let label = status;

    if (status === 'PartiallyFilled') {
        label = 'Partially Filled';
    }

    return /*#__PURE__*/ _jsx(StyledChip, {
        className: status,
        icon: icon,
        size: 'medium',
        label: label,
        variant: 'outlined'
    });
});
export function renderStatus(params) {
    if (params.value == null) {
        return '';
    } else {
        return /*#__PURE__*/ _jsx(Status, {
            status: params.value
        });
    }
}
