
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx'
import ErrorPage from '../error-page';
import TemplatesContainer from '../components/Templates/TemplatesContainer';
import Auth from '../components/Auth/Auth';
import AuthRoute from './AuthRoute.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute component={App} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/auth",
                element: <Auth />,
            },
            {
                index: true,
                element: "",
            },
            {
                path: "/templates",
                element: <TemplatesContainer />,
            },
            {
                path: "/media",
                element: "",
            },
            {
                path: "/billing",
                element: "",
            },
            {
                path: "/settings",
                element: "",
            }
        ],
    },
]);

export default router;