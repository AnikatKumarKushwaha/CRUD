import React from "react";

import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation";

export default function AppLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
