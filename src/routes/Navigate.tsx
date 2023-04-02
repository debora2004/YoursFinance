import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Analitycs, Dashboard, Login, Wallet } from "../pages";
import { useAccount } from "wagmi";

const routes = createBrowserRouter([
  {
    path: "*",
    element: <Dashboard />,
  },
  {
    path: "/mywallet",
    element: <Wallet />,
  },
  {
    path: "/analitycs",
    element: <Analitycs />,
  },
  {
    path: "/settings",
    element: <Dashboard />,
  },
]);

const Navigate = () => {
  const { address } = useAccount();
  console.log(address);

  React.useEffect(() => {
    console.log(address);
  }, [address]);

  return address ? <RouterProvider router={routes} /> : <Login />;
};

export default Navigate;
