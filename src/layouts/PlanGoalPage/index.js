/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeDatepicker from "../../component/CustomizeDatepicker";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";

const PlanGoalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className={styles.container}>
      <div>
        
      </div>
    </div>
  );
};

export default PlanGoalPage;
