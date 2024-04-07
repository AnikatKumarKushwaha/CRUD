import React, { useCallback, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";

import AppLayout from "./shared/components/UIElements/AppLayout";
import { AuthContext } from "./shared/context/auth-context";

const authRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/places/new",
        element: <NewPlace />,
      },
      {
        path: "/places/:placeId",
        element: <UpdatePlace />,
      },
    ],
  },
]);

const unAuthRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={isLoggedIn ? authRouter : unAuthRouter} />
    </AuthContext.Provider>
  );
};

export default App;
