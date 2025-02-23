import { createRoot } from 'react-dom/client'
import { createBrowserRouter, } from 'react-router'
import { RouterProvider } from 'react-router'

import './index.css'
import App from './App.jsx'
import LoginPage from './LoginPage.jsx'
import ErrorElement from './ErrorElement.jsx'

// These our our React Router pages
const router = createBrowserRouter([
    {
      path: "/Fetch-Take-Home",
      element: <LoginPage />,
      errorElement: <ErrorElement />,
    },
    {
      path: "/home",
      element: <App />,
      errorElement: <ErrorElement />,
    },
  ]
)

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />)
