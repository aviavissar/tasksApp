import React, { useState, useEffect } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import Img from "./Img";

const Task = ({ task = {}, userlist }) => {
  const sort = true;
  let { description, completed, createdAt, updatedAt, owner, ownerName } = task;
  const { setUserProfile, userProfile } = useStore();
  const dodd = () => {
    console.log("sssssssss");
  };
 
  const isCompleted = true;
  return (
    <Maindiv>
      {
        <TaskRow>
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

      <TaskLocalStyles />
    </Maindiv>
  );
};

export default Task;

const TaskLocalStyles = createGlobalStyle`

.containerT {
     display:flex;
        justify-content:space-between;
   width:70%;
  
}
 div.myTask{width: 32% !important;}
.table-container{
  background: #8c959e17;
  border: 1px solid #d9d9dc;
 width:102%;
}
.strech{
  width:150%;
  }
  
.displaynone{
  display:none !important;
}
.flex-table img{
  width: 5vw;
}
.row{
  padding: 4vh 1vw 1vh 2vw;
}

.flex-table {
  display: flex;
  text-align:left;
  flex-flow: row wrap;
    transition: 0.5s;

    .flex-row {
      width: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      
      &.first {
        width: 30%;
           display: flex;
      justify-content: center;
      flex-direction: column;
      }
    }
  }
   `;
const Maindiv = styled.div`
  margin-top: 15px;
  width: 100%;
`;

const TaskRow = styled.div`
  display: flex;
  width: 98%;
  padding: 2%;
`;
