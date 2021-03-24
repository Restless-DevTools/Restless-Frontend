import Requests from './views/Requests/Requests';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Snippets from './views/Snippets/Snippets';
import Teams from './views/Teams/Teams';

const routes = [
  {
    path: '/requests',
    name: 'Requests',
    icon: 'ni ni-tv-2 text-primary',
    component: Requests,
    layout: '/dashboard',
  },
  {
    path: '/snippets',
    name: 'Snippets',
    icon: 'fa fa-code text-blue',
    component: Snippets,
    layout: '/dashboard',
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams,
    layout: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
];
export default routes;
