import {Routes, Route} from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline for consistent styling
import {purple} from '@mui/material/colors';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Layout from './components/Layout';
import RequireAuth from './features/auth/RequireAuth';
import NotFound from './components/NotFound';
import NoAuth from './features/auth/NoAuth';
import useFetchUserData from './hooks/useFetchUserData';
import Home from './components/Home';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: purple,
    secondary: {
      main: '#757575',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: '#b0bec5',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: '#212121',
    },
    h2: {
      color: '#212121',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: purple,
    secondary: {
      main: '#8687E780',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    divider: '#b0bec5',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#ffffff',
    },
  },
});

function App() {
  const loading = useFetchUserData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider
      theme={
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? darkTheme
          : lightTheme
      }>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route element={<NoAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="otp" element={<Otp />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
