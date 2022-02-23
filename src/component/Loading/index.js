import * as React from "react";
import styles from "./styles.module.scss";
import Logo_middle from "../../assets/image/logo_middle.png";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={Logo_middle} alt="Logo" />
      Loading...
    </div>
  );
};
export default Loading;
