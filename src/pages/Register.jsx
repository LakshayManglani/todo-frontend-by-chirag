import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {TextField, InputAdornment, IconButton, Divider} from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FcGoogle} from 'react-icons/fc';
import {Grid} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../features/auth/authSlice';
import {useRegisterOptMutation} from '../api/auth/authApiSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerOtp] = useRegisterOptMutation();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = Object.fromEntries(data.entries());

    registerOtp(userData);

    dispatch(
      setCredentials({
        ...userData,
        familyName: userData.lastName,
        givenName: userData.firstName,
      }),
    );
    navigate('/otp');
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
          <LockOutlinedIcon sx={{color: 'primary.contrastText'}} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <Grid container spacing={1} columns={12}>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordHide}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 4}}>
            Register
          </Button>

          <Divider>OR</Divider>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mt: 4,
              mb: 2,
              gap: 2,
            }}>
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </Box>
        <Typography component="h1" variant="body1">
          {'Already have an account? '}
          <Button onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Box>
    </Container>
  );
}
