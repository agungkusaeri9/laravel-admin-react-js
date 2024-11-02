import { element, exact } from 'prop-types'
import React from 'react'
import UserEdit from './views/pages/user/UserEdit'

const Login = React.lazy(() => import('./views/pages/auth/Login'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserIndex = React.lazy(() => import('./views/pages/user/UserIndex'))
const UserCreate = React.lazy(() => import('./views/pages/user/UserCreate'))

const routes = [
  { path: '/', name: 'Home' },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', element: UserIndex },
  { path: '/user/create', name: 'Create', element: UserCreate },
  { path: '/user/edit/:id', name: 'Edit', element: UserEdit },
]

export default routes
