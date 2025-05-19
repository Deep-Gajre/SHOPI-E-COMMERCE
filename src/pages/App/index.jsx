import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoopingCartProvider } from "../../contexts";
import Home from "./../Home/index";
import MyOrder from "../MyOrder";
import MyOrders from "../MyOrders";
import NotFound from "../NotFound";
import Login from "../Login/index";
import Signup from "../Signup/index";
import { Navbar } from "../../components/Navbar";
import { CheckOutSideMenu } from "../../components/CheckOutSideMenu";
import PrivateRoute from "../../components/PrivateRoute";

const AppRoutes = () => {
  let routes = useRoutes([
    // Public Routes for home & categories
    { path: "/Vite-E-commerce/", element: <Home /> },
    { path: "/Vite-E-commerce/clothes", element: <Home /> },
    { path: "/Vite-E-commerce/electronics", element: <Home /> },
    { path: "/Vite-E-commerce/furnitures", element: <Home /> },
    { path: "/Vite-E-commerce/toys", element: <Home /> },
    { path: "/Vite-E-commerce/others", element: <Home /> },

    // Protected Routes wrapped in PrivateRoute component
    {
      path: "/Vite-E-commerce/my-order",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "/Vite-E-commerce/my-orders",
      element: (
        <PrivateRoute>
          <MyOrders />
        </PrivateRoute>
      ),
    },
    {
      path: "/Vite-E-commerce/my-orders/last",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },
    {
      path: "/Vite-E-commerce/my-orders/:id",
      element: (
        <PrivateRoute>
          <MyOrder />
        </PrivateRoute>
      ),
    },

    // Public Auth Routes (login/signup)
    { path: "/Vite-E-commerce/login", element: <Login /> },
    { path: "/Vite-E-commerce/signup", element: <Signup /> },

    // 404 Catch-All
    { path: "/Vite-E-commerce/*", element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <ShoopingCartProvider>
      <BrowserRouter>
        <Navbar />
        <CheckOutSideMenu />
        <AppRoutes />
      </BrowserRouter>
    </ShoopingCartProvider>
  );
}

export default App;
