import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import liff from "@line/liff";
import path from "../utils/path";
import AddGoalPage from "../layouts/AddGoalPage";
import GoalListPage from "../layouts/GoalListPage";
import GoalDetailPage from "../layouts/GoalDetailPage";
import PlanGoalPage from "../layouts/PlanGoalPage";
import EditGoalPage from "../layouts/EditGoalPage";

const WebRoutes = () => {
  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path={path.goallistpage} element={<GoalListPage />} />
        <Route path={path.addgoalpage} element={<AddGoalPage />} />
        <Route path={path.goaldetailpage} element={<GoalDetailPage />} />
        <Route path={path.plangoalpage} element={<PlanGoalPage />} />
        <Route path={path.editgoalpage} element={<EditGoalPage />} />
      </Routes>
    </Router>
  );
};
export default WebRoutes;
