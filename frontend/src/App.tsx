
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sucess from './components/sucess';
import Cancel from './components/cancel';
import PaymentGatway from './components/paymentGatway';
import Failed from './components/failed';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaymentGatway />,
    },
    {
      path: '/sucess',
      element: <Sucess />
    },
    {
      path: '/cancel',
      element: <Cancel />
    },
    {
      path: '/failed',
      element: <Failed />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
