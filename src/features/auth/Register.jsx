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
import {Grid} from '@mui/material';
import {useDispatch} from 'react-redux';
import {setUser} from './userSlice';
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userToSet = {
      givenName: data.get('firstName'),
      familyName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    };

    dispatch(setUser(userToSet));
    fetch(
      'https://todo-backend-production-1fc6.up.railway.app/api/v1/otp/mail/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
        }),
      },
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
          <Link href="/login" variant="body1">
            {'Login'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
