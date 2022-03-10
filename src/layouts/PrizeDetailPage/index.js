import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as QueryString from "query-string";
import liff from "@line/liff";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import Radio from "@mui/material/Radio";
import Logo_little from "../../assets/image/logo_little.png";
import CustomizeButton from "../../component/CustomizeButton";
import CustomizeInput from "../../component/CustomizeInput";
import CustomizeProgress from "../../component/CustomizeProgress";
import Alert from "../../component/Alert";
import Loading from "../../component/Loading";

//Store
import { StoreContext } from "../../Store/reducer";
import {
  resetErrorData,
  getGroupData,
  setBaseData,
  getPrizeData,
  deletePrizeData,
} from "../../Store/actions";

const PrizeDetailPage = () => {
  var senttext = [
    '今天的成功是因為昨天的積累，明天的成功則依賴於今天的努力。成功需要一個過程',
    '不幸往往來自比較，而幸福也是來自比較',
    '風暴再大，它終不能刮到你的內心去',
    '相信信念能夠戰勝一切，這本身就是一個最偉大的信念',
    '成功不是將來才有的，而是從決定去做的那一刻起，持續累積而成',
    '設立目標，然後把目標細化為每一步的實際行動',
    '時間給勤勉的人留下智慧的力量，給懶惰的人留下空虛和悔恨',
    '沒有退路的時候，正是潛力發揮最大的時候',
    '心有多大，世界就有多大！',
    '我們不行，往往不是因為我們不行，而是因為別人說了我們不行',
    '只要站起來比倒下去多一次就是成功',
    '只要努力，你就能成為你想成為的人',
    '信念是一把無堅不摧的利刃',
  ]
  var random = 
    Math.floor(Math.random()*senttext.length);
  const useStyles = makeStyles({
    time: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "black !important",
        fontSize: "12px !important",
        "-webkit-text-fill-color": "black !important",
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
      "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
    },
    customDisable: {
      "& .MuiInputBase-input.Mui-disabled": {
        color: "#08415C !important",
        "-webkit-text-fill-color": "#08415C !important",
        borderColor: "#08415C !important",
        borderRadius: "10px !important",
      },
      "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
        borderColor: "black !important",
        borderRadius: "10px !important",
      },
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  //資料內容
  const {
    state: {
      baseData: {
        group_id,
        user_id,
        // user_name,
        member_id,
        // member_name,
        datasDataLoading,
      },
      prizeData: { prize, goals, prizeDataLoading },
      deletePrize: { deletePrizeLoading },
      error,
    },
    dispatch,
  } = useContext(StoreContext);
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Errorshow, setErrorshow] = useState(false);
  const [Errortext, setErrortext] = useState("");
  //因為location近來的渲染有時間差，所以還是必須加個loading
  const [prizeLoading, setprizeLoading] = useState(true);
  const [Prize, setPrize] = useState({});
  const [Goals, setGoals] = useState({});

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleSubmit = () => {
    setAlertshow(false);
    const delete_finish = deletePrizeData(dispatch, {
      group_id: group_id,
      prize_id: Prize._id,
    });
    delete_finish.then(function (result) {
      if (result) {
        navigate(path.prizelistpage);
      }
    });
  };

  const goal_filter = (goals, goals_id) => {
    var result = goals.filter((goals) => goals_id.includes(goals._id));
    return result;
  };

  useEffect(() => {
    resetErrorData(dispatch);
    var { groupID } = QueryString.parse(location.search);
    var userID = "";
    var userName = "";
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID }).then(() => {
      if (!liff.isLoggedIn() || liff.getOS() === "web") {
        userID = "Uf0f4bc17047f7eb01ddfc0893a68786c";
        userName = "淯萱";
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
    var { prizeID } = QueryString.parse(location.search);
    if (group_id !== "") {
      if (member_id === "") {
        getGroupData(dispatch, { group_id: group_id, user_id: user_id });
      }
      if (prizeID !== "" && prizeID !== undefined) {
        setprizeLoading(false);
        getPrizeData(dispatch, { group_id: group_id, prize_id: prizeID });
      }
      if (location.state !== null) {
        setPrize(location.state.prize);
        setGoals(location.state.goals);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

  useEffect(() => {
    if (location.state === null) {
      setPrize(prize);
      setGoals(goals);
    }
  }, [prize]);

  useEffect(() => {
    if (Prize.content !== undefined) {
      setGoals(goal_filter(Goals, Prize.goals_id));
      setprizeLoading(false);
    }
  }, [Prize]);

  //錯誤區
  useEffect(() => {
    if (error !== "") {
      setErrorshow(true);
      setErrortext(error);
    }
  }, [error]);

  return (
    <Fragment>
      {datasDataLoading || prizeLoading || deletePrizeLoading || prizeDataLoading? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <Alert
            open={Alertshow}
            handleClose={() => {
              setAlertshow(false);
            }}
            handleSubmit={handleSubmit}
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
          <div>
            <div className={styles.top}>
              <CustomizeButton
                status="back"
                mr=""
                click={() => {
                  navigate(path.prizelistpage);
                }}
              />
            </div>
            <div className={styles.buttons}>
              <CustomizeButton
                status="contained"
                title="編輯"
                mr="0"
                click={() => {
                  navigate(path.editprizepage, {
                    state: {
                      lastpath: location.pathname,
                      prize: Prize,
                    },
                  });
                }}
              />
              <CustomizeButton
                status="contained"
                title="刪除"
                mr="0"
                click={handleClickOpen}
              />
            </div>
            <div className={styles.prize}>
              <CustomizeInput
                status="disable"
                title="獎勵名稱"
                defaultValue={Prize.title}
              />
              <div className={styles.reach}>
                <div className={styles.reach_title}>達成任務</div>
                <div className={styles.reach_goals}>
                  {Goals.length === 0 ? (
                    <TextField
                      disabled
                      multiline
                      fullWidth
                      size="small"
                      variant="outlined"
                      className={classes.customDisable}
                      defaultValue="無設定達成任務"
                    />
                  ) : (
                    Goals.map((goal) => (
                      <TextField
                        key={"setgoal"+goal._id}
                        disabled
                        multiline
                        fullWidth
                        size="small"
                        variant="outlined"
                        className={classes.customDisable}
                        defaultValue={goal.title}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className={styles.progress}>
                <div className={styles.comment_part}>
                  <img src={Logo_little} alt="Logo" />
                  <div className={styles.comment}>{senttext[random]}</div>
                </div>
                <CustomizeProgress mode="prize" goals={goal_filter(Goals, Prize.goals_id)}/>
              </div>
              <div className={styles.detail}>{Prize.content}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PrizeDetailPage;
