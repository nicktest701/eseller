import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import Layout from "./Layout";
import User from "./User";
import EVoucher from "../EVoucher";
import Prepaid from "../Prepaid";
import Airtime from "../Airtime";
import BECEChecker from "../evoucher/BECEChecker";
import AddBECEChecker from "../evoucher/add/AddBECEChecker";
import WAECChecker from "../evoucher/WAECChecker";
import SchoolPlacement from "../evoucher/SchoolPlacement";
import SecurityService from "../evoucher/SecurityService";
import UniversityForms from "../evoucher/UniversityForms";
import CinemaTickets from "../evoucher/CinemaTickets";
import StadiaTickets from "../evoucher/StadiaTickets";
import AddWAECChecker from "../evoucher/add/AddWAECChecker";
import AddSchoolPlacement from "../evoucher/add/AddSchoolPlacement";
import AddSecurityService from "../evoucher/add/AddSecurityService";
import AddUniversityForms from "../evoucher/add/AddUniversityForms";
import AddCinemaTickets from "../evoucher/add/AddCinemaTickets";
import AddStadiaTickets from "../evoucher/add/AddStadiaTickets";
import Shop from "../evoucher/Shop";
import Checkout from "../Checkout";
import Payment from "../Payment";
import NotFound from "../NotFound";
import { getPayment } from "../../api/momoApi";
import { useQuery } from "react-query";
import ErrorPage from "../ErrorPage";
import { useNavigate } from "react-router-dom";

function Shell() {
  const navigate = useNavigate();

  // useQuery(["keys"], getPayment, {
  //   retry: 1,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     navigate("/error", {
  //       replace: true,
  //     });
  //   },
  // });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="prepaid" element={<Prepaid />} />
        <Route path="airtime" element={<Airtime />} />

        <Route path="evoucher" element={<EVoucher />}>
          <Route index element={<Shop />} />
          <Route path="bece-checker" element={<BECEChecker />} />
          <Route path="waec-checker" element={<WAECChecker />} />
          <Route path="school-placement" element={<SchoolPlacement />} />
          <Route path="security-service" element={<SecurityService />} />
          <Route path="university-form" element={<UniversityForms />} />
          <Route path="cinema-ticket" element={<CinemaTickets />} />
          <Route path="stadia-ticket" element={<StadiaTickets />} />

          <Route path="add-bece-checker" element={<AddBECEChecker />} />
          <Route path="add-waec-checker" element={<AddWAECChecker />} />
          <Route path="add-school-placement" element={<AddSchoolPlacement />} />
          <Route path="add-security-service" element={<AddSecurityService />} />
          <Route path="add-university-forms" element={<AddUniversityForms />} />
          <Route path="add-cinema-tickets" element={<AddCinemaTickets />} />
          <Route path="add-stadia-tickets" element={<AddStadiaTickets />} />
        </Route>
      </Route>
      <Route path="/user" element={<User />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="payment" element={<Payment />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Shell;
