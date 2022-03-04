/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import Logo_little from "../../assets/image/logo_little.png";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Dialog from "@mui/material/Dialog";

import CustomizeInput from "../../component/CustomizeInput";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";
// import { color } from "@mui/system";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGoalData,
  getGroupData,
  setBaseData,
  planGoalData,
} from "../../Store/actions";

const PlanGoalPage = () => {
  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        user_name,
        member_id,
        // member_name,
        datasDataLoading,
      },
      goalData: { goalDataLoading },
      planGoal: { planGoalLoading },
      goalData,
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openAdd, setAddOpen] = useState(false);
  const [addText, setaddText] = useState("");
  const [addDate, setaddDate] = React.useState(new Date());
  const [Alertshow, setAlertshow] = useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  //因為location近來的mission渲染有時間差，所以還是必須加個loading
  const [missionsLoading, setmissionsLoading] = useState(true);
  const [Goal, setGoal] = useState({});
  const [MissionIDDelete, setMissionIDDelete] = useState("");

  //因為更改日期畫面不重新渲染，所以多宣告一個test變數每次修改就setTest(!test)讓畫面重新改變
  const [test, setTest] = useState(false);

  //日期格式
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("/");
  };

  const addDateChange = (newDate) => {
    setaddDate(newDate);
  };
  const addMission = () => {
    try {
      if (addText === "") {
        setErrorshow(true);
        setErrortext("請輸入任務名稱!");
      } else {
        setAddOpen(false);
        var origin_Goal = Goal;
        origin_Goal.missions.push({
          _id: Date.now().toString(),
          title: addText,
          deadline: formatDate(addDate),
          status: "",
        });
        setGoal(origin_Goal);
      }
    } catch (error) {
      setErrorshow(true);
      setErrortext("新增進度時出現問題!");
    }
  };

  const handleDateChange = (MissionID, newValue) => {
    try {
      // console.log(MissionID + " " + newValue);
      var origin_Goal = Goal;
      origin_Goal.missions.forEach((element) => {
        if (element._id === MissionID) {
          element.deadline = formatDate(newValue);
        }
      });
      setGoal(origin_Goal);
      setTest(!test);
    } catch (error) {
      setErrorshow(true);
      setErrortext("選擇日期出現問題!");
    }
  };

  const handleTitleChange = (MissionID, newValue) => {
    // console.log(MissionID + " " + newValue);
    var origin_Goal = Goal;
    origin_Goal.missions.forEach((element) => {
      if (element._id === MissionID) {
        element.title = newValue;
      }
    });
    setGoal(origin_Goal);
    setTest(!test);
  };

  const handleMissionDelete = () => {
    try {
      var origin_Goal = Goal;
      origin_Goal.missions = origin_Goal.missions.filter(function (element) {
        return element._id !== MissionIDDelete;
      });
      setGoal(origin_Goal);
      setAlertshow(false);
    } catch (error) {
      setErrorshow(true);
      setErrortext("刪除失敗");
    }
  };

  const save = async () => {
    try {
      await Goal.missions.forEach((element) => {
        if (element.title === "") {
          throw "請輸入任務名稱!";
        } else if (element.title.length > 20) {
          throw "字數過長，請低於20字";
        } else if (new Date(Goal.deadline) < new Date(element.deadline)) {
          throw "設定的日期超過任務期限!";
        }
      });
      const finish = planGoalData(dispatch, {
        group_id: group_id,
        goal_id: Goal._id,
        missions: Goal.missions,
      });
      finish.then(function (result) {
        // console.log(result);
        if (result) {
          navigate(path.goaldetailpage);
        }
      });
    } catch (error) {
      setErrorshow(true);
      setErrortext(error);
    }
  };

  useEffect(() => {
    resetErrorData(dispatch);
    var { groupID } = QueryString.parse(location.search);
    var userID = "";
    var userName = "";
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn() || liff.getOS() === "web") {
        userID = "Uf0f4bc17047f7eb01ddfc0893a68786c";
        userName = "阿呆";
        if (groupID === "" || groupID === undefined) {
          groupID = sessionStorage.getItem("group_id");
          setBaseData(dispatch, {
            group_id: groupID,
            user_id: userID,
            user_name: userName,
          });
        } else {
          setBaseData(dispatch, {
            group_id: groupID,
            user_id: userID,
            user_name: userName,
          });
        }
      } else if (liff.isInClient()) {
        liff
          .getProfile()
          .then((profile) => {
            userID = profile.userId;
            userName = profile.displayName;
            if (groupID === "" || groupID === undefined) {
              groupID = sessionStorage.getItem("group_id");
              setBaseData(dispatch, {
                group_id: groupID,
                user_id: userID,
                user_name: userName,
              });
            } else {
              setBaseData(dispatch, {
                group_id: groupID,
                user_id: userID,
                user_name: userName,
              });
            }
          })
          .catch(function (error) {
            setErrorshow(true);
            setErrortext("發生錯誤，訊息：" + error);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var { goalID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (goalID !== "" && goalID !== undefined) {
        setmissionsLoading(false);
        getGoalData(dispatch, { group_id: group_id, goal_id: goalID });
      }
      if (location.state !== null) {
        setGoal(location.state.goal);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null) {
      setGoal(goalData.goal);
    }
  }, [goalData]);
  useEffect(() => {
    if (Goal.missions !== undefined) {
      // console.log(Goal);
      setmissionsLoading(false);
    }
  }, [Goal]);
  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {goalDataLoading ||
      datasDataLoading ||
      missionsLoading ||
      planGoalLoading ? (
        <Loading />
      ) : user_id === Goal.user_id ? (
        <div className={styles.container}>
          <div>
            <div className={styles.top}>
              <CustomizeButton
                status="back"
                mr=""
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>
            <div>
              您為該任務的所有者，無法規劃進度，
              <br />
              請讓夥伴協助規劃唷~
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Alert
            open={Alertshow}
            handleClose={() => {
              setAlertshow(false);
            }}
            handleSubmit={handleMissionDelete}
            text="確定要刪除嗎？"
          />
          <Alert
            status="error"
            open={Errorshow}
            handleClose={() => {
              setErrorshow(false);
              resetErrorData(dispatch);
            }}
            text={Errortext}
          />
          {/* 刪除進度 */}
          <Dialog
            sx={{
              "& .MuiDialog-container": {
                alignItems: "flex-end",
              },
              "& .MuiDialog-paper": {
                margin: 0,
                width: "100%",
                maxWidth: "100%",
              },
            }}
            open={openDelete}
            onClose={() => {
              setDeleteOpen(false);
            }}
          >
            <div className={styles.deletemodal}>
              <button
                className={styles.deletebtn}
                onClick={() => {
                  setAlertshow(true);
                  setDeleteOpen(false);
                }}
              >
                刪除
              </button>
              <button
                className={styles.cancelbtn}
                onClick={() => {
                  setDeleteOpen(false);
                }}
              >
                取消
              </button>
            </div>
          </Dialog>

          {/* 新增進度 */}
          <Dialog
            open={openAdd}
            onClose={() => {
              setAddOpen(false);
            }}
            fullWidth={true}
          >
            <div className={styles.addmodal}>
              <div className={styles.adddate}>
                日期
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    mask="____/__/__"
                    label="Date mobile"
                    inputFormat="yyyy/MM/dd"
                    value={addDate}
                    cancelText=""
                    rightArrowButtonText=""
                    onChange={addDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label=""
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className={styles.addcontent}>
                內容
                <TextField
                  fullWidth
                  size="small"
                  placeholder="請輸入進度描述"
                  variant="standard"
                  onChange={(e) => {
                    setaddText(e.target.value);
                  }}
                />
              </div>
              <button className={styles.addbtn} onClick={addMission}>
                新增
              </button>
              <button
                className={styles.cancelbtn}
                onClick={() => {
                  setAddOpen(false);
                }}
              >
                取消
              </button>
            </div>
          </Dialog>

          <div>
            <div className={styles.top}>
              <CustomizeButton
                status="back"
                mr=""
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>

            {Goal !== undefined ? (
              <Fragment>無此任務</Fragment>
            ) : (
              <Fragment>
                <div className={styles.planpart}>
                  <CustomizeInput
                    status="disable"
                    title="任務名稱"
                    defaultValue={Goal.title}
                  />
                  <CustomizeInput
                    status="disable"
                    title="達成日期"
                    defaultValue={Goal.deadline}
                  />
                  <div className={styles.plan}>
                    <div className={styles.plantitle}>
                      <CalendarTodayIcon
                        fontSize="small"
                        sx={{ color: "#08415C" }}
                      />
                      進度規劃
                    </div>
                    <div
                      className={styles.addicon}
                      onClick={() => {
                        setaddText("");
                        setAddOpen(true);
                      }}
                    >
                      <AddCircleOutlineRoundedIcon />
                    </div>
                  </div>
                  <div className={styles.planlist}>
                    {Goal.missions.length === 0 ? (
                      <Fragment>目前無任務</Fragment>
                    ) : (
                      <Fragment>
                        {Goal.missions
                          .sort(
                            (a, b) =>
                              new Date(...a.deadline.split("/")) -
                              new Date(...b.deadline.split("/"))
                          )
                          .map((mission) => (
                            <div className={styles.misson} key={mission._id}>
                              <div className={styles.misson_content}>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <MobileDatePicker
                                    mask="____/__/__"
                                    label="Date mobile"
                                    inputFormat="yyyy/MM/dd"
                                    cancelText=""
                                    rightArrowButtonText=""
                                    value={mission.deadline}
                                    onChange={(newValue) => {
                                      handleDateChange(mission._id, newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        label=""
                                        variant="standard"
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                                <TextField
                                  fullWidth
                                  size="small"
                                  defaultValue={mission.title}
                                  variant="standard"
                                  onChange={(e) => {
                                    handleTitleChange(
                                      mission._id,
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                              <div
                                className={styles.misson_setting}
                                onClick={() => {
                                  setMissionIDDelete(mission._id);
                                  setDeleteOpen(true);
                                }}
                              >
                                <MoreVertSharpIcon />
                              </div>
                            </div>
                          ))}
                      </Fragment>
                    )}
                  </div>
                </div>
                <div className={styles.plantip}>
                  <img src={Logo_little} alt="Logo" />
                  <div className={styles.tipscontent}>
                    不要因為進度落後就擅自延後唷！
                    <br />
                    想想看如何安排時間加快進度吧~
                  </div>
                </div>
                <div className={styles.buttons}>
                  <CustomizeButton
                    title="儲存"
                    status="outlined"
                    click={save}
                  />
                  <CustomizeButton
                    title="取消"
                    status="outlined"
                    click={() => {
                      if (location.state === null) {
                        liff.closeWindow();
                      } else {
                        navigate(-1);
                      }
                    }}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PlanGoalPage;
