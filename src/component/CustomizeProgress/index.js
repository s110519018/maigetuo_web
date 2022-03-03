import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomizeProgress = (props) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "20px !important",
    borderRadius: "15px !important",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#DDDBF1",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "15px !important",
      backgroundColor: "#8F77BD",
    },
  }));
  const LATELinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: "20px !important",
    borderRadius: "15px !important",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#fff",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "15px !important",
      backgroundColor: "#DB2B39",
    },
  }));

  const calculateGoalProgress = (missions) => {
    if (missions.length == 0) {
      return 0;
    } else {
      var finish = 0,
        progress = 0;
      missions.forEach(function (mission) {
        if (mission.status === "O") {
          finish++;
        }
      });
      progress = (finish / missions.length) * 100;
      return progress;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ position: "relative" }}>
        {/* <LinearProgress
          className={styles.root}
          variant="determinate"
          value={props.value}
          {...props}
        /> */}
        {props.late && calculateGoalProgress(props.missions) < 100 ? (
          <Fragment>
            <LATELinearProgress variant="determinate" value={100} />
            <Typography
              style={{
                fontSize: "12px",
                position: "absolute",
                color: "white",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              <Fragment>逾期</Fragment>
            </Typography>
          </Fragment>
        ) : (
          <Fragment>
            <BorderLinearProgress
              variant="determinate"
              value={calculateGoalProgress(props.missions)}
            />
            {calculateGoalProgress(props.missions) === 0 ? (
              <Typography
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  color: "white",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                <Fragment>0%</Fragment>
              </Typography>
            ) : (
              <Typography
                style={{
                  fontSize: "12px",
                  position: "absolute",
                  color: "white",
                  top: "50%",
                  left: calculateGoalProgress(props.missions) / 2 + "%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                <Fragment>
                  {calculateGoalProgress(props.missions) === 100 ? (
                    "完成"
                  ) : (
                    <Fragment>
                      {calculateGoalProgress(props.missions)}%
                    </Fragment>
                  )}
                </Fragment>
              </Typography>
            )}
          </Fragment>
        )}
      </div>
    </Box>
  );
};
export default CustomizeProgress;
