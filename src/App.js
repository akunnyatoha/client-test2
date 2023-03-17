import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login';
import FormUpdateProduct from './components/form/update/FormUpdateProduct';
import CreateCustomer from './Customer/CreateCustomer';
import MasterCustomer from './Customer/MasterCustomer';
import UpdateCustomer from './Customer/UpdateCustomer';
import CreateProduct from './Product/CreateProduct';
import MasterProduct from './Product/MasterProduct';
import CreateSO from './SalesOrder/CreateSO';
import MasterSO from './SalesOrder/MasterSO';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/master-customers",
    element: <MasterCustomer />,
  },
  {
    path: "/master-customers/create",
    element: <CreateCustomer />,
  },
  {
    path: "/master-customers/update/:id",
    element: <UpdateCustomer />,
  },
  {
    path: "/master-products",
    element: <MasterProduct />
  },
  {
    path: "/master-products/create",
    element: <CreateProduct />
  },
  {
    path: "/master-products/update/:id",
    element: <FormUpdateProduct />
  },
  {
    path: "/master-sales-orders",
    element: <MasterSO />
  },
  {
    path: "/master-sales-orders/create",
    element: <CreateSO />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
