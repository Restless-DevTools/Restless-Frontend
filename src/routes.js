import Collections from './views/Collections/Collections';
import Requests from './views/Requests/Requests';
import Snippets from './views/Snippets/Snippets';
import Teams from './views/Teams/Teams';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import RecoverPassword from './views/RecoverPassword/RecoverPassword';
import RequestRecoverPassword from './views/RequestRecoverPassword/RequestRecoverPassword';

const routes = [
  {
    path: '/collections',
    name: 'Collections',
    component: Collections,
    layout: '/dashboard',
  }, {
    path: '/requests',
    name: 'Requests',
    component: Requests,
    layout: '/dashboard',
  },
  {
    path: '/snippets',
    name: 'Snippets',
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
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    layout: '/auth',
  },
  {
    path: '/request-recover-password',
    name: 'RequestRecoverPassword',
    component: RequestRecoverPassword,
    layout: '/auth',
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: RecoverPassword,
    layout: '/auth',
  },
];
export default routes;
