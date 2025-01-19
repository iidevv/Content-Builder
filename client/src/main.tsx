import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import App from './App.tsx'
import { Auth } from './routes/Auth';
import ErrorPage from './error-page.tsx';
import Dashboard from './routes/Dashboard';
import store from "./redux/store.ts";
import './index.css'
import Templates from './routes/Templates.tsx';
import Media from './routes/Media.tsx';
import Billing from './routes/Billing.tsx';
import Settings from './routes/Settings.tsx';

function AuthRoute({ component: Component, ...rest }) {
  const isAuthenticated = Cookies.get("userID") ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return <Component {...rest} />;
}

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
        element: <Dashboard />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/media",
        element: <Media />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/settings",
        element: <Settings />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
