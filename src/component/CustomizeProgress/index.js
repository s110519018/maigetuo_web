import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomizeProgress = (props) => {
  const value = parseInt(props.value) / 2;

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "20px !important",
    borderRadius: "15px !important",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ECEBEB"
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "15px !important",
      backgroundColor: "#9E9B9B"
    },
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ position: "relative" }}>
        {/* <LinearProgress
          className={styles.root}
          variant="determinate"
          value={props.value}
          {...props}
        /> */}
        <BorderLinearProgress variant="determinate" value={props.value} />
        <Typography
          style={{
            fontSize: "12px",
            position: "absolute",
            color: "white",
            top: "50%",
            left: value + "%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          {props.value}%
        </Typography>
      </div>
    </Box>
  );
};
export default CustomizeProgress;
