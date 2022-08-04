import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography } from '@mui/material';
// components
import Iconify from '../../../ui-component/Iconify';
import Datagrid from '../../../ui-component/DataGrid/Datagrid';
import { renderStatus } from '../../../ui-component/DataGrid/RenderStatus';

function createData(id, Leader, Member1, Member2, Member3, status) {
    return { id, Leader, Member1, Member2, Member3, status };
}

const renderDetailsButton = (params) => {
    return params.row.status.toUpperCase() === 'NEW' ? (
        <strong>
            <Button variant="contained" color="primary" size="small">
                Evaluate Topic
            </Button>
        </strong>
    ) : (
        <></>
    );
};

const rows = [
    createData('GP001', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP002', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP003', 'saman', 'nuwan', 'chamal', 'nimal', 'Rejected'),
    createData('GP004', 'saman', 'nuwan', 'chamal', 'nimal', 'Accepted'),
    createData('GP005', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP006', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP007', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP008', 'saman', 'nuwan', 'chamal', 'nimal', 'Rejected'),
    createData('GP009', 'saman', 'nuwan', 'chamal', 'nimal', 'Accepted'),
    createData('GP010', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP011', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP012', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP013', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP014', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP015', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP016', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP017', 'saman', 'nuwan', 'chamal', 'nimal', 'New'),
    createData('GP018', 'saman', 'nuwan', 'chamal', 'nimal', 'Rejected'),
    createData('GP019', 'saman', 'nuwan', 'chamal', 'nimal', 'Accepted'),
    createData('GP020', 'saman', 'nuwan', 'chamal', 'nimal', 'New')
];

const columns = [
    { field: 'id', headerName: 'Group ID', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'Leader', headerName: 'Group Leader', width: 170 },
    { field: 'Member1', headerName: 'Group Member', width: 170 },
    { field: 'Member2', headerName: 'Group Member', width: 170 },
    { field: 'Member3', headerName: 'Group Member', width: 170 },
    { field: 'status', headerName: 'Status', renderCell: renderStatus, width: 130, headerAlign: 'center', align: 'center' },
    {
        field: 'action',
        headerName: 'Action',
        width: 150,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true
    }
];

export default function DataGrid() {
    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Data Grid
                </Typography>
                <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New row
                </Button>
            </Stack>

            <Card>
                <Datagrid columns={columns} rows={rows} darkMode={true} gridName={'Topics Evaluation Group List'} />
            </Card>
        </Container>
    );
}
