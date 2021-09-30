import LoginForm from "../components/Login/login";
import Dashboard from '../components/Dashboard'


export const ROUTES = [
    {
        path: "/dashboard",
        key: "APP_DASHBOARD",
        component: () => <Dashboard />,
    },
    {
        path: "/",
        key: "LOGIN",
        component: () => <LoginForm />,
    },

]
