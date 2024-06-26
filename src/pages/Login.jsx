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
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../features/auth/authSlice';
import {useLoginMutation} from '../api/auth/authApiSlice';
import Loader from '../components/Loader';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const {email, password} = Object.fromEntries(formData.entries());

    const data = await login({email, password}).unwrap();

    if (data) {
      localStorage.setItem('authorizationToken', data.data.authorizationToken);
      dispatch(setCredentials({...data.data}));

      navigate('/');
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHide = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
          <LockOutlinedIcon sx={{color: 'primary.contrastText'}} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            Login
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
          {"Don't have an account? "}

          <Button onClick={() => navigate('/register')}>Register</Button>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
