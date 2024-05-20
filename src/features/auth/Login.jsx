import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {TextField, InputAdornment, IconButton, Divider} from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FcGoogle} from 'react-icons/fc';
import {useDispatch} from 'react-redux';
import {setUser} from './userSlice';
import {useNavigate} from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await (
      await fetch(
        'https://todo-backend-production-1fc6.up.railway.app/api/v1/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
          }),
        },
      )
    ).json();
    console.log(res);

    if (!res.success) return;

    dispatch(setUser({...res.data, isLoggedIn: true}));
    navigate('/');
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
            Sign In
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
          <Link href="/register" variant="body1">
            {'Register'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;