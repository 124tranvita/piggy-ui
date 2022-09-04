import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Catalogue from './Catalogue';
import Income from './Income';
import Spending from './Spending';
import Report from './Report';

export const publicPages = [
  { page: <Login />, path: 'login' },
  { page: <Signup />, path: 'signup' },
];

export const privatePages = [
  { page: <Dashboard />, path: '/' },
  { page: <Profile />, path: 'profile' },
  { page: <Catalogue />, path: 'catalogues' },
  { page: <Income />, path: 'incomes' },
  { page: <Spending />, path: 'spendings' },
  { page: <Report />, path: 'reports' },
];
