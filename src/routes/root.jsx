import { Outlet, useLocation } from 'react-router-dom'
import { Login } from './login'


export const Root = () => {

  return (
    <div>
        {useLocation().pathname === "/"? <Login /> : <Outlet />}
    </div>
  )
}