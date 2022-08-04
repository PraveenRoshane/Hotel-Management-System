import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
    Card,
    Link,
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Button,
    useMediaQuery,
    Snackbar,
    Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useScriptRef from '../../../../hooks/useScriptRef';
// components
import Logo from '../../../../ui-component/Logo';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
// sections
import AuthSocial from '../sections/AuthSocial';
// images
import logo from '../../../../assets/images/illustrations/illustration_register.png';
// utils
import { signup } from '../../../../utils/firebase';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7)
    }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register({ ...others }) {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const errorHandle = (message) => {
        if (message.includes('email-already-in-use')) {
            return 'There is already account using this email';
        } else if (message.includes('user-not-found')) {
            return 'User Not Found';
        } else {
            return message;
        }
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <RootStyle>
            <HeaderStyle>
                <Logo />
                {smUp && (
                    <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                        Already have an account? {''}
                        <Link variant="subtitle2" component={RouterLink} to="/pages/login/login3">
                            Login
                        </Link>
                    </Typography>
                )}
            </HeaderStyle>

            {mdUp && (
                <SectionStyle>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Manage the job more effectively with Minimal
                    </Typography>
                    <img alt="register" src={logo} />
                </SectionStyle>
            )}

            <Container>
                <ContentStyle>
                    <Typography variant="h4" gutterBottom>
                        Get started absolutely free.
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>Free forever. No credit card needed.</Typography>

                    <AuthSocial />

                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            password: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                if (scriptedRef.current) {
                                    await signup(values.fname + ',' + values.lname, values.email, values.password);
                                    setStatus({ success: true });
                                    setOpen(true);
                                    setSubmitting(false);
                                    setTimeout(() => {
                                        navigate('/');
                                    }, 3000);
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
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            margin="normal"
                                            name="fname"
                                            type="text"
                                            value={values.fname}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                            sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            margin="normal"
                                            name="lname"
                                            type="text"
                                            value={values.lname}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                            sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                </Grid>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}

                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={(event) => setChecked(event.target.checked)}
                                                    name="checked"
                                                    color="primary"
                                                />
                                            }
                                            label={
                                                <Typography variant="subtitle1">
                                                    Agree with &nbsp;
                                                    <Typography variant="subtitle1" component={Link} to="#">
                                                        Terms & Condition.
                                                    </Typography>
                                                </Typography>
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errorHandle(errors.submit)}</FormHelperText>
                                    </Box>
                                )}

                                <Box sx={{ mt: 2 }}>
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
                                            Sign up
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>

                    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                        By registering, I agree to Minimal&nbsp;
                        <Link underline="always" color="text.primary" href="#">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link underline="always" color="text.primary" href="#">
                            Privacy Policy
                        </Link>
                        .
                    </Typography>

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

                    {!smUp && (
                        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link variant="body2" to="/pages/login/login3" component={RouterLink}>
                                Login
                            </Link>
                        </Typography>
                    )}
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
