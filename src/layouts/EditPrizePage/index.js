/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import Dialog from "@mui/material/Dialog";
import styles from "./styles.module.scss";
import liff from "@line/liff";
import path from "../../utils/path";
import Logo from "../../assets/image/Logo.png";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeProfile from "../../component/CustomizeProfile";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGroupData,
  setBaseData,
  getGoalsList,
  getPrizeData,
  editPrizeData,
} from "../../Store/actions";

const EditPrizePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openreach, setReachOpen] = useState(false);
  const [Errortext, setErrortext] = useState("");
  const [Errorshow, setErrorshow] = useState(false);
  const [UserGoals, setUserGoals] = useState([]);
  const [MemberGoals, setMemberGoals] = useState([]);
  const [Prize, setPrize] = useState({ title: "", content: "", goals_id: [] });
  const [FilterLoading, setFilterLoading] = useState(true);
  const [GoalSelectID, setGoalSelectID] = useState("");
  const [UserSelectData, setUserSelectData] = useState({
    title: "",
    id: "",
  });
  const [MemberSelectData, setMemberSelectData] = useState({
    title: "",
    id: "",
  });
  const [contentText, setContentText] = useState("");

  const [name, setName] = useState("");
  const onChangeContent = (value) => {
    setName(value);
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
      goalsData: { goals, goalsDataLoading },
      prizeData: { prize, prizeDataLoading },
      error,
    },
    dispatch,
  } = useContext(StoreContext);

  //篩選目標
  const goal_filter = () => {
    const result_user = goals.filter((goals) => goals.user_id === user_id);
    const result_member = goals.filter((goals) => goals.user_id === member_id);
    setUserGoals(result_user);
    setMemberGoals(result_member);
    setFilterLoading(false);
    console.log(UserGoals);
    console.log(MemberGoals);
  };

  const save = () => {
    try {
      if (name === "") {
        throw "請輸入任務名稱!";
      } else if (name.length > 20) {
        throw "字數過長，請低於20字";
      } else if (contentText.length > 100) {
        throw "詳細內容字數過長，請低於100字!";
      } else {
        var text;
        text = contentText.replace("<script>", "");
        text = text.replace("</script>", "");
        // text = text.replace("\n", "<br/>");
        const edit_finish = editPrizeData(dispatch, {
          group_id: group_id,
          prize_id: Prize._id,
          title: name,
          content: text,
          goals_id: [UserSelectData.id, MemberSelectData.id],
        });

        edit_finish.then(function (result) {
          if (result) {
            navigate(path.prizedetailpage);
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
    var { prizeID } = QueryString.parse(location.search);
    if (group_id !== "") {
      getGoalsList(dispatch, { group_id: group_id });
      if (member_id === "") {
        // console.log(member_id);
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (prizeID !== "" && prizeID !== undefined) {
        setFilterLoading(false);
        getPrizeData(dispatch, { group_id: group_id, prize_id: prizeID });
      }
      if (location.state !== null) {
        setPrize(location.state.prize);
        setName(location.state.prize.title);
        setContentText(location.state.prize.content);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null && prize.title !== undefined) {
      setPrize(prize);
      setName(prize.title);
      setContentText(prize.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prize]);

  useEffect(() => {
    if (Prize.title !== "") {
      goal_filter();
      goals.forEach(function (goal) {
        if (Prize.goals_id.includes(goal._id)) {
          if (user_id === goal.user_id) {
            setUserSelectData({
              title: goal.title,
              id: goal._id,
            });
          } else if (member_id === goal.user_id) {
            setMemberSelectData({
              title: goal.title,
              id: goal._id,
            });
          }
        }
      });
      setFilterLoading(false);
    }
  }, [Prize]);

  // useEffect(() => {
  //   if (member_id !== "") {
  //     goal_filter();
  //   }
  // }, [member_id]);

  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setFilterLoading(false);
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {datasDataLoading ||
      FilterLoading ||
      goalsDataLoading ||
      prizeDataLoading ? (
        <Loading />
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
          <Dialog
            open={openreach}
            onClose={() => {
              setReachOpen(false);
            }}
            fullWidth={true}
          >
            <div className={styles.selectmodal}>
              <div className={styles.modal_title}>選擇任務</div>
              <div className={styles.modal_content}>
                {GoalSelectID === user_id ? (
                  UserGoals.length === 0 ? (
                    "無任務"
                  ) : (
                    UserGoals.map((goal) => (
                      <Fragment key={"select" + goal._id}>
                        <div
                          className={styles.category}
                          style={{
                            backgroundColor:
                              goal._id === UserSelectData.id
                                ? "#08415c"
                                : "transparent",
                            color:
                              goal._id === UserSelectData.id
                                ? "white"
                                : "#08415c",
                          }}
                          onClick={() => {
                            setUserSelectData({
                              title: goal.title,
                              id: goal._id,
                            });
                            setReachOpen(false);
                          }}
                        >
                          {goal.title}
                        </div>
                        <hr />
                      </Fragment>
                    ))
                  )
                ) : GoalSelectID === member_id ? (
                  MemberGoals.length === 0 ? (
                    "無任務"
                  ) : (
                    MemberGoals.map((goal, index, row) => (
                      <Fragment key={"select" + goal._id}>
                        <div
                          className={styles.category}
                          style={{
                            backgroundColor:
                              goal._id === MemberSelectData.id
                                ? "#08415c"
                                : "transparent",
                            color:
                              goal._id === MemberSelectData.id
                                ? "white"
                                : "#08415c",
                          }}
                          onClick={() => {
                            setMemberSelectData({
                              title: goal.title,
                              id: goal._id,
                            });
                            setReachOpen(false);
                          }}
                        >
                          {goal.title}
                        </div>
                        <hr
                          style={{
                            display:
                              row.length - 1 === index && row.length !== 1
                                ? ""
                                : "none",
                          }}
                        />
                      </Fragment>
                    ))
                  )
                ) : (
                  <div>載入錯誤</div>
                )}
              </div>
              <button
                className={styles.unselectbtn}
                onClick={() => {
                  if (GoalSelectID === user_id) {
                    setUserSelectData({ title: "", id: "" });
                  } else if (GoalSelectID === member_id) {
                    setMemberSelectData({ title: "", id: "" });
                  }
                  setReachOpen(false);
                }}
              >
                全部取消
              </button>
              <button
                className={styles.cancelbtn}
                onClick={() => {
                  setReachOpen(false);
                }}
              >
                返回
              </button>
            </div>
          </Dialog>
          <div>
            <img src={Logo} alt="Logo" />
            <div className={styles.top}>
              <CustomizeButton
                title="獎勵清單"
                status="contained"
                click={() => {
                  navigate(path.prizelistpage);
                }}
              />
              <CustomizeProfile name={user_name} />
            </div>
            <div className={styles.content}>
              <CustomizeInput
                title="獎勵名稱"
                placeholder="請輸入獎勵名稱"
                defaultValue={name}
                onChangeContent={onChangeContent}
              />
              <div className={styles.reach}>
                <div className={styles.reach_title}>達成任務</div>
                <div className={styles.reach_goals}>
                  <div className={styles.reach_goal}>
                    <CustomizeProfile name={user_name} />
                    <div
                      className={styles.goal_selecter}
                      onClick={() => {
                        setGoalSelectID(user_id);
                        setReachOpen(true);
                      }}
                    >
                      <div>{UserSelectData.title}</div>
                      <ArrowDropDownOutlinedIcon />
                    </div>
                  </div>
                  <div className={styles.reach_goal}>
                    <CustomizeProfile name={member_name} />
                    <div
                      className={styles.goal_selecter}
                      onClick={() => {
                        setGoalSelectID(member_id);
                        setReachOpen(true);
                      }}
                    >
                      <div>{MemberSelectData.title}</div>
                      <ArrowDropDownOutlinedIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail_title}>詳細內容</div>
                <textarea
                  placeholder="請輸入獎勵詳細內容"
                  type="text"
                  onChange={(e) => setContentText(e.target.value)}
                  value={contentText}
                ></textarea>
              </div>
            </div>
            {/* https://ithelp.ithome.com.tw/articles/10229445 子傳父 父傳子*/}
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
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditPrizePage;
