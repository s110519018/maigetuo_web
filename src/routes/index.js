import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import path from "../utils/path";
import AddGoalPage from "../layouts/AddGoalPage";

const WebRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={path.addgoalpage} element={<AddGoalPage/>} />
            </Routes>
        </Router>
    );
};
export default WebRoutes;