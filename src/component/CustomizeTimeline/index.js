import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
export default function CustomizeTimeline(props) {
  const useStyles = makeStyles({
    linecolor: {
      backgroundColor: "#08415c !important",
    },
    dotcolor: {
      backgroundColor: "#fff !important",
      border: "1px solid #08415c !important",
    },
    dot_finish_color: {
      backgroundColor: "#08415c !important",
      border: "none",
    },
    minheight: {
      minHeight: "20px !important",
    },
    wordbreak: {
      wordbreak: "break-all",
    },
    empty: {
      minHeight: "150px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#08415c",
    },
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.missions.length === 0 ? (
        <div className={classes.empty}>目前無任務</div>
      ) : (
        <Timeline position="alternate">
          {props.missions
            .sort(
              (a, b) =>
                new Date(...a.deadline.split("/")) -
                new Date(...b.deadline.split("/"))
            )
            .map((mission, index, row) => (
              <TimelineItem
                key={mission._id}
                className={index + 1 === row.length ? classes.minheight : ""}
              >
                <TimelineOppositeContent
                  color="text.secondary"
                  className={classes.wordbreak}
                >
                  {mission.deadline}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    className={
                      mission.status === "" || mission.status === "X"
                        ? classes.dotcolor
                        : classes.dot_finish_color
                    }
                  />
                  <TimelineConnector
                    className={
                      index + 1 === row.length ? "" : classes.linecolor
                    }
                  />
                </TimelineSeparator>
                <TimelineContent className={classes.wordbreak}>
                  {mission.title}
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      )}
    </React.Fragment>
  );
}
