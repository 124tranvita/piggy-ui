import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Catalogue from './Catalogue';
import Income from './Income';
import Spending from './Spending';
import Report from './Report';
import Error from './Error';

export const publicPages = [
  { page: <Home />, path: '/' },
  { page: <Login />, path: 'login' },
  { page: <Signup />, path: 'signup' },
  { page: <Error />, path: '*' },
];

export const privatePages = [
  { page: <Dashboard />, path: 'dashboard' },
  { page: <Profile />, path: 'profile' },
  { page: <Catalogue />, path: 'catalogues' },
  { page: <Income />, path: 'incomes' },
  { page: <Spending />, path: 'spendings' },
  { page: <Report />, path: 'reports' },
  { page: <Error />, path: '*' },
];
