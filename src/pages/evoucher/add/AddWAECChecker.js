import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Box, Tab } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { Report } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import WaecCategory from "../../../components/tabs/WaecCategory";
import WaecLoadData from "../../../components/tabs/WaecLoadData";
import SubHeader from "../../../components/SubHeader";
import SubCaption from "../../../components/SubCaption";
import CheckerCategory from "../../../components/modals/CheckerCategory";
import { useNavigate } from "react-router-dom";
const AddWAECChecker = ({ title, note, type }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("1");

  useEffect(() => {
    const category = localStorage.getItem("category");
    if (category !== type) {
      navigate("/add");
    }
  }, [type, navigate]);

  return (
    <>
      <SubHeader title={""} to="/add" />
      <Container>
        <Box>
          <SubCaption caption={title} note={note} />
        </Box>

        <TabContext value={tab}>
          <TabList
            onChange={(e, value) => setTab(value)}
            aria-label="Category"
            // centered
          >
            <Tab
              value="1"
              label="Category"
              icon={<CategoryRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="2"
              label=" Pins & Serials"
              icon={<Report />}
              iconPosition="start"
            />
          </TabList>
          <TabPanel value="1">
            <WaecCategory />
          </TabPanel>
          <TabPanel value="2">
            <WaecLoadData />
          </TabPanel>
        </TabContext>
      </Container>

      <CheckerCategory />
    </>
  );
};

AddWAECChecker.propTypes = {};

export default AddWAECChecker;
