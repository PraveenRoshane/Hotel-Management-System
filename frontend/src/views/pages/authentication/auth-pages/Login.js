import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { signin, useAuth } from '../../../../utils/firebase';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
    Card,
    Link,
    Container,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Stack,
    FormControlLabel,
    Checkbox,
    Box,
    Button,
    Alert,
    Snackbar
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
import logo from '../../../../assets/images/illustrations/illustration_login.png';

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

export default function Login({ ...others }) {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const errorHandle = (message) => {
        if (message.includes('password')) {
            return 'Wrong Password';
        } else if (message.includes('user-not-found')) {
            return 'User Not Found';
        } else {
            return message;
        }
    };

    return (
        <RootStyle>
            <HeaderStyle>
                <Logo />

                {smUp && (
                    <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                        Don’t have an account? {''}
                        <Link variant="subtitle2" component={RouterLink} to="/pages/register/register3">
                            Get started
                        </Link>
                    </Typography>
                )}
            </HeaderStyle>

            {mdUp && (
                <SectionStyle>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Welcome Back
                    </Typography>
                    <img src={logo} alt="login" />
                </SectionStyle>
            )}

            <Container maxWidth="sm">
                <ContentStyle>
                    <Typography variant="h4" gutterBottom>
                        Sign in to Minimal
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

                    <AuthSocial />

                    <Formik
                        initialValues={{
                            email: 'info@codedthemes.com',
                            password: '123456',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                if (scriptedRef.current) {
                                    await signin(values.email, values.password);
                                    setStatus({ success: true });
                                    setSubmitting(false);
                                    setOpen(true);
                                    setSubmitting(false);
                                    setTimeout(() => {
                                        navigate('/');
                                    }, 2000);
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
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Email Address / Username"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        label="Password"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                    />
                                    <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                        Forgot Password?
                                    </Typography>
                                </Stack>

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
                                            Sign in
                                        </Button>
                                    </AnimateButton>
                                </Box>
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
                                        You have been successfully sign in!
                                    </Alert>
                                </Snackbar>
                            </form>
                        )}
                    </Formik>

                    {!smUp && (
                        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                            Don’t have an account?{' '}
                            <Link variant="body2" component={RouterLink} to="/pages/register/register3">
                                Get started
                            </Link>
                        </Typography>
                    )}
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
