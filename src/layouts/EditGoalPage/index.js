/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeDatepicker from "../../component/CustomizeDatepicker";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGoalData,
  editGoalData,
  getGroupData,
  setBaseData,
} from "../../Store/actions";

//https://dev.to/yutagoto/react-typescript-liff-1kpk
const EditGoalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //因為location近來的Goal.user_id渲染有時間差，所以還是必須加個loading
  const [GoalUserIDLoading, setGoalUserIDLoading] = useState(true);
  const [Errortext, setErrortext] = useState("");
  const [Goal, setGoal] = useState({});
  const [Errorshow, setErrorshow] = useState(false);

  const [name, setName] = useState("");
  const onChangeContent = (value) => {
    setName(value);
  };
  const [datepick, setDate] = useState("");
  const onChangeDate = (value) => {
    setDate(value);
    setGoal({ ...Goal, deadline: value });
    // console.log(datepick.toString());
  };
  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        user_name,
        member_id,
        member_name,
        datasDataLoading,
      },
      goalData: { goalDataLoading },
      editGoal: { editGoalLoading },
      goalData,
      error,
    },
    dispatch,
  } = useContext(StoreContext);

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

  const save = () => {
    try {
      if (name === "") {
        throw "請輸入任務名稱!";
      } else if (name.length > 20) {
        throw "字數過長，請低於20字";
      } else {
        const finish = editGoalData(dispatch, {
          group_id: group_id,
          goal_id: Goal._id,
          title: name,
          deadline: formatDate(datepick),
        });

        finish.then(function (result) {
          // console.log(result);
          if (result) {
            navigate(path.goaldetailpage);
          }
        });
      }
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
        userName = "小米";
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
            setErrortext("發生錯誤，訊息:" + error);
          });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var { goalID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        // console.log(member_id);
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (goalID !== "" && goalID !== undefined) {
        setGoalUserIDLoading(false);
        getGoalData(dispatch, { group_id: group_id, goal_id: goalID });
      }
      if (location.state !== null) {
        setGoal(location.state.goal);
        setName(location.state.goal.title);
        setDate(location.state.goal.deadline);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null && goalData.goal.deadline !== undefined) {
      setGoal(goalData.goal);
      setName(goalData.goal.title);
      setDate(goalData.goal.deadline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalData]);

  useEffect(() => {
    if (Goal.user_id !== undefined) {
      setGoalUserIDLoading(false);
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
      {editGoalLoading || goalDataLoading || datasDataLoading || GoalUserIDLoading ? (
        <Loading />
      ) : Goal.title !== undefined ? user_id !== Goal.user_id ? (
        <div className={styles.container}>
          <Alert
            status="error"
            open={Errorshow}
            handleClose={() => {
              setErrorshow(false);
              resetErrorData(dispatch);
            }}
            text={Errortext}
          />
          <div>
            <img src={Logo} alt="Logo" />
            <div className={styles.top}>
              <CustomizeButton
                title="任務清單"
                status="contained"
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>
            <div>您非該任務的所有者，<br/>只可協助規劃進度無法編輯任務及更新進度</div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Alert
            status="error"
            open={Errorshow}
            handleClose={() => {
              setErrorshow(false);
              resetErrorData(dispatch);
            }}
            text={Errortext}
          />
          <div>
            <img src={Logo} alt="Logo" />
            <div className={styles.top}>
              <CustomizeButton
                title="任務清單"
                status="contained"
                click={() => {
                  navigate(path.goallistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>
            <CustomizeInput
              title="任務名稱"
              placeholder="請輸入任務名稱"
              defaultValue={Goal.title}
              onChangeContent={onChangeContent}
            />
            <CustomizeDatepicker
              title="截止日期"
              defaultValue={Goal.deadline}
              onChangeDate={onChangeDate}
            />
            {/* https://ithelp.ithome.com.tw/articles/10229445 子傳父 父傳子*/}
            <div className={styles.buttons}>
              <CustomizeButton title="儲存" status="outlined" click={save} />
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
          </div>
        </div>
      ):(<div className={styles.container}>
        <Alert
          status="error"
          open={Errorshow}
          handleClose={() => {
            setErrorshow(false);
            resetErrorData(dispatch);
          }}
          text={Errortext}
        />
        <div>
          <img src={Logo} alt="Logo" />
          <div className={styles.top}>
            <CustomizeButton
              title="任務清單"
              status="contained"
              click={() => {
                navigate(path.goallistpage);
              }}
            />
            <CustomizeProfile name={user_name} />
          </div>
          <div>無此任務</div>
        </div>
      </div>)}
    </Fragment>
  );
};

export default EditGoalPage;
