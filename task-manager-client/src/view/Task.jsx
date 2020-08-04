import React, { useState } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import Img from "./Img";
import Alert from "./AlertDialog";
import { deleteTask } from "../service/axios";

const Task = ({ task = {}, userlist }) => {
  let {
    _id,
    description,
    completed,
    createdAt,
    updatedAt,
    owner,
    ownerName,
  } = task;
  const {
    setEditTask,
    userProfile,
    userToken,
    refreshTask,
    setRefreshTask,
  } = useStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [bgcolor] = useState("");
  const DeleteWhenDialogAgree = () => {
    deleteTask(userToken, _id);
    setRefreshTask(!refreshTask);
  };
  const doEditTask = () => {
    setEditTask(task);
  };

  const isCompleted = true;
  return (
    <Maindiv>
      {
        <TaskRow className={bgcolor}>
          <div
            className={userlist ? "flex-row first myTask" : "flex-row first"}
          >
            {description}
          </div>
          <div className="containerT">
            <div
              className={
                (isCompleted ? "done" : "notDone") +
                (userlist ? " myTask" : "") +
                " flex-row bold bigger"
              }
              role="cell"
            >
              {completed}
            </div>
            <div
              className={userlist ? "flex-row myTask" : "flex-row"}
              role="cell"
            >
              {createdAt}
            </div>
            <div
              className={userlist ? "flex-row myTask" : "flex-row"}
              role="cell"
            >
              {updatedAt}
            </div>
            <div
              className={userlist ? "flex-row " : "flex-row displaynone"}
              role="cell"
            >
              <button onClick={doEditTask}>
                <i className="fa fa-edit"></i>
              </button>
            </div>
            <div
              className={userlist ? "flex-row " : "flex-row displaynone"}
              role="cell"
            >
              <button onClick={() => setOpenDialog(true)}>
                <i className="fa fa-trash"></i>
              </button>
              <Alert
                openDialog={openDialog}
                titleDialog="pay attention!"
                textDialog="The task will be deleted! are you sure?"
                action={DeleteWhenDialogAgree}
              ></Alert>
            </div>
            <div
              className={userlist ? "flex-row displaynone" : "flex-row"}
              role="cell"
            >
              {ownerName}
            </div>
            <div
              className={userlist ? "flex-row displaynone" : "flex-row"}
              role="cell"
            >
              <Img owner={owner} userProfile={userProfile} />
            </div>
          </div>
        </TaskRow>
      }
    </Maindiv>
  );
};

export default Task;

const Maindiv = styled.div`
  width: 100%;
`;

const TaskRow = styled.div`
  display: flex;
  padding: 1vh 2vw;
  border: 1px solid #e5e5e6;
  background-color: #fffdfd;
  @media only screen and (max-width: 414px) {
    padding: 2vh 2vw;
    button {
      min-width: 10px;
    }
  }
`;
