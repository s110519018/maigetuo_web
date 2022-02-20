import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import liff from "@line/liff";
import path from "../utils/path";
import { StoreProvider } from "../Store/reducer";
import AddGoalPage from "../layouts/AddGoalPage";
import GoalListPage from "../layouts/GoalListPage";
import GoalDetailPage from "../layouts/GoalDetailPage";
import PlanGoalPage from "../layouts/PlanGoalPage";
import EditGoalPage from "../layouts/EditGoalPage";
import PrizeListPage from "../layouts/PrizeListPage";
import AddPrizePage from "../layouts/AddPrizePage";
import EditPrizePage from "../layouts/EditPrizePage";
import PrizeDetailPage from "../layouts/PrizeDetailPage";
import SharecardListPage from "../layouts/SharecardListPage";
import SharecardDetailPage from "../layouts/SharecardDetailPage";
import AddSharecardPage from "../layouts/AddSharecardPage";
import EditSharecardPage from "../layouts/EditSharecardPage";
import SharecardCategoryPage from "../layouts/SharecardCategoryPage";

const WebRoutes = () => {
  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
  }, []);
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path={path.goallistpage} element={<GoalListPage />} />
          <Route path={path.addgoalpage} element={<AddGoalPage />} />
          <Route path={path.goaldetailpage} element={<GoalDetailPage />} />
          <Route path={path.plangoalpage} element={<PlanGoalPage />} />
          <Route path={path.editgoalpage} element={<EditGoalPage />} />
          <Route path={path.prizelistpage} element={<PrizeListPage />} />
          <Route path={path.addprizepage} element={<AddPrizePage />} />
          <Route path={path.editprizepage} element={<EditPrizePage />} />
          <Route path={path.prizedetailpage} element={<PrizeDetailPage />} />
          <Route
            path={path.sharecardlistpage}
            element={<SharecardListPage />}
          />
          <Route
            path={path.sharecarddetailpage}
            element={<SharecardDetailPage />}
          />
          <Route path={path.addsharecardpage} element={<AddSharecardPage />} />
          <Route
            path={path.editsharecardpage}
            element={<EditSharecardPage />}
          />
          <Route
            path={path.sharecardcategorypage}
            element={<SharecardCategoryPage />}
          />
        </Routes>
      </Router>
    </StoreProvider>
  );
};
export default WebRoutes;
