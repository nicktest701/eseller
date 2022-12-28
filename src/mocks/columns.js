import { Chip } from "@mui/material";
import { IMAGES } from "../constants";

export const shopRows = [
  {
    id: 1,
    title: "WAEC RESULTS CHECKERS",
    img: IMAGES.waec2,
    content: `Buy school placement check with ease with just a single click`,
    path: "waec-checker",
  },
  {
    id: 2,
    title: "SCHOOL PLACEMENT-CSSPS",
    img: IMAGES.ges,
    content: `Buy school placement check with ease with just a single click`,
    path: "school-placement",
  },

  {
    id: 3,
    title: "UNIVERSITY & POLYTECHNIC FORMS",
    img: IMAGES.university2,
    content: `Buy school placement check with ease with just a single click`,
    path: "university-form",
  },
  {
    id: 4,
    title: "SECURITY SERVICE FORMS",
    img: IMAGES.security_service,
    content: `Buy school placement check with ease with just a single click`,
    path: "security-service",
  },
  {
    id: 5,
    title: "CINEMA TICKETS",
    img: IMAGES.cinema_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "cinema-ticket",
  },
  {
    id: 6,
    title: "STADIUM TICKETS",
    img: IMAGES.stadia_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "stadia-ticket",
  },
];

export const checkerColumns = [
  {
    title: "#",
    field: "id",
  },
  {
    title: "Checker",
    field: "checker",
  },
  {
    title: "Price",
    field: "price",
  },
  {
    title: "Total",
    field: "total",
    type: "numeric",
  },
  {
    title: "Used",
    field: "used",
    type: "numeric",
  },
  {
    title: "Available",
    field: "available",
    type: "numeric",
  },
];

export const voucherCategoryColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher Type",
    field: "voucherType",
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "Price",
    field: "price",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  // {
  //   title: "Total",
  //   field: "total",
  //   type: "numeric",
  // },
  // {
  //   title: "Used",
  //   field: "used",
  //   type: "numeric",
  // },
  // {
  //   title: "Available",
  //   field: "available",
  //   type: "numeric",
  // },
];

export const voucherTypeColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher",
    field: "voucher",
  },
  {
    title: "Pin",
    field: "pin",
  },
  {
    title: "Serial",
    field: "serial",
  },

  {
    title: "Status",
    field: "active",
    render: (rowData) => (
      <Chip
        variant="filled"
        color={rowData.active ? "success" : "error"}
        size="small"
        label={rowData.active ? "Active" : "Used"}
      />
    ),
  },
];
