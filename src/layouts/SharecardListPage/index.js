import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./styles.module.scss";
import path from "../../utils/path";
import CustomizeButton from "../../component/CustomizeButton";
import Alert from "../../component/Alert";

const SharecardListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Alertshow, setAlertshow] = React.useState(false);
  const [Alerttext, setAlerttext] = React.useState("確定要刪除嗎？");
  const [opencategory, setCategoryOpen] = useState(false);

  const handleClickOpen = () => {
    setAlertshow(true);
  };

  const handleClose = () => {
    setAlertshow(false);
  };

  return (
    <div className={styles.container}>
      <Alert
        open={Alertshow}
        handleClose={handleClose}
        handleSubmit={() => {
          setAlertshow(false);
        }}
        text={Alerttext}
      />
      {/* 選擇類別 */}
      <Dialog
        open={opencategory}
        onClose={() => {
          setCategoryOpen(false);
        }}
        fullWidth={true}
      >
        <div className={styles.selectmodal}>
          <div className={styles.modal_title}>篩選類別</div>
          <div className={styles.modal_content}>
            <div className={styles.category}>咖啡咖啡廳</div>
          </div>
          <button
            className={styles.cancelbtn}
            onClick={() => {
              setCategoryOpen(false);
            }}
          >
            取消
          </button>
        </div>
      </Dialog>
      <div>
        <div className={styles.top}>
          <CustomizeButton
            title="新增分享卡"
            status="contained"
            mr="0"
            click={() => {
              navigate(path.addsharecardpage, {
                state: {
                  lastpath: location.pathname,
                },
              });
            }}
          />
        </div>
        <div className={styles.category_bar}>
          <div
            className={styles.category_icon}
            onClick={() => {
              setCategoryOpen(true);
            }}
          >
            <FilterListIcon />
            類別
          </div>
          <div className={styles.category_select}># 好去處</div>
        </div>

        <div className={styles.card_bar}>
          <div
            className={styles.card}
            onClick={() => {
              navigate(path.sharecarddetailpage);
            }}
          >
            <div className={styles.name}>拖延症克服</div>
            <div className={styles.title}>時間管理方法結論</div>
            <div className={styles.user}>
              <div>
                <CustomizeButton
                  title="編輯"
                  status="outlined"
                  click={(event) => {
                    navigate(path.editsharecardpage, {
                      state: {
                        lastpath: location.pathname,
                      },
                    });
                    event.stopPropagation();
                  }}
                />
                <CustomizeButton
                  title="刪除"
                  status="outlined"
                  click={(event) => {
                    handleClickOpen();
                    event.stopPropagation();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharecardListPage;
