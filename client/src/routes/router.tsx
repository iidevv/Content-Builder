
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx'
import ErrorPage from '../error-page';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from '../components/Auth/Login.tsx';
import Register from '../components/Auth/Register.tsx';
import TemplatesContainer from '../components/Templates/TemplatesContainer';
import TemplateContainer from '../components/Templates/Template/TemplateContainer.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute component={App} />,
        errorElement: <ErrorPage />,
        children: [{
            index: true,
            element: "",
        },
        {
            path: "/templates/:id",
            element: <TemplateContainer />,
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
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
]);

export default router;