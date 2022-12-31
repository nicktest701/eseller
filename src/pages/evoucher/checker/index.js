import React from "react";
import { Outlet } from "react-router-dom";
import CheckerCategory from "../../../components/modals/AddCategory";

const Checker = () => {
  return (
    <>
      <Outlet />

      {/* <CheckerCategory /> */}
    </>
  );
};

Checker.propTypes = {};

export default Checker;
