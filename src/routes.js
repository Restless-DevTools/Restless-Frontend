import Collections from './views/Collections/Collections';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Requests from './views/Requests/Requests';
import Snippets from './views/Snippets/Snippets';
import Teams from './views/Teams/Teams';

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
];
export default routes;
