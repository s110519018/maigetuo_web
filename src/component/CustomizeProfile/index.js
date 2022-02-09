import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import PersonIcon from "@mui/icons-material/Person";

const CustomizeProfile = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.person_icon}>
        <PersonIcon />
      </div>
      {props.name}
    </div>
  );
};
export default CustomizeProfile;
