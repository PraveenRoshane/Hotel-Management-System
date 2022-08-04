import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { update, useAuth } from '../../../../utils/firebase';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

export default function Account() {
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState();
    const scriptedRef = useScriptRef();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function phoneNumber() {
        if (currentUser?.phoneNumber) {
            return currentUser?.phoneNumber;
        } else {
            return '332222222';
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Typography sx={{ mb: 3 }} variant="h4">
                    Account
                </Typography>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Avatar
                                        src={photoURL}
                                        sx={{
                                            height: 170,
                                            mb: 2,
                                            width: 170
                                        }}
                                    />
                                    <Typography color="textPrimary" gutterBottom variant="h5">
                                        {currentUser?.displayName.split(',')[0] + ' ' + currentUser?.displayName.split(',')[1]}
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        {formattedToday}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button color="secondary" fullWidth variant="text" component="label">
                                    Upload picture
                                    <input hidden accept="image/*" type="file" onChange={handleChange} />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    {currentUser && (
                        <Grid item lg={8} md={6} xs={12}>
                            <Formik
                                initialValues={{
                                    fname: currentUser?.displayName.split(',')[0],
                                    lname: currentUser?.displayName.split(',')[1],
                                    email: currentUser?.email,
                                    phone: phoneNumber(),
                                    submit: null
                                }}
                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                    try {
                                        if (scriptedRef.current) {
                                            await update(photo, currentUser, values.fname + ',' + values.lname);
                                            setStatus({ success: true });
                                            setOpen(true);
                                            setSubmitting(false);
                                            window.location.reload(false);
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        if (scriptedRef.current) {
                                            setStatus({ success: false });
                                            setErrors({ submit: err.message });
                                            setSubmitting(false);
                                        }
                                    }
                                }}
                            >
                                {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Card>
                                            <CardHeader subheader="The information can be edited" title="Profile" />
                                            <Divider />
                                            <CardContent>
                                                <Grid container spacing={3}>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            helperText="Please specify the first name"
                                                            label="First Name"
                                                            name="fname"
                                                            type="text"
                                                            value={values.fname}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Last Name"
                                                            name="lname"
                                                            type="text"
                                                            value={values.lname}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        />
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Email Address"
                                                            name="email"
                                                            type="email"
                                                            disabled
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            inputProps={{}}
                                                        />
                                                    </Grid>
                                                    {/*<Grid item md={6} xs={12}>*/}
                                                    {/*    <TextField*/}
                                                    {/*        fullWidth*/}
                                                    {/*        label="Phone Number"*/}
                                                    {/*        name="phone"*/}
                                                    {/*        type="number"*/}
                                                    {/*        value={values.phone}*/}
                                                    {/*        onBlur={handleBlur}*/}
                                                    {/*        onChange={handleChange}*/}
                                                    {/*        inputProps={{*/}
                                                    {/*            minLength: 9,*/}
                                                    {/*            maxLength: 10*/}
                                                    {/*        }}*/}
                                                    {/*    />*/}
                                                    {/*</Grid>*/}
                                                </Grid>
                                            </CardContent>
                                            <Divider />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    p: 2
                                                }}
                                            >
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Save Details
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </Card>
                                    </form>
                                )}
                            </Formik>
                        </Grid>
                    )}
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        You have been successfully registered!
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}
