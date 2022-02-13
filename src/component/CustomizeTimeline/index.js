import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
export default function CustomizeTimeline() {
  const useStyles = makeStyles({
    linecolor: {
      backgroundColor: "#08415c !important",
    },
    dotcolor: {
      backgroundColor: "#fff !important",
      border: "1px solid #08415c !important"
    },
    dot_finish_color: {
      backgroundColor: "#08415c !important",
      border: "none"
    },
    minheight: {
      minHeight: "20px !important",
    },
  });
  const classes = useStyles();

  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.dot_finish_color}/>
          <TimelineConnector className={classes.linecolor} />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.dotcolor} />
          <TimelineConnector className={classes.linecolor} />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          12:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.dotcolor}/>
          <TimelineConnector className={classes.linecolor} />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.minheight}>
        <TimelineOppositeContent color="text.secondary">
          9:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className={classes.dotcolor}/>
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
