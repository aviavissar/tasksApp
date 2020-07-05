import React, { useState, useEffect } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import Task from "./Task";

const TaskList = ({ tasks = [], userlist, userProfile }) => {
  const isCompleted = true;

  const [sortTasks, setSortTasks] = useState([]);
  const [sort, setSort] = useState(true);

  useEffect(() => {
    setSortTasks(tasks);
  }, [tasks]);


  function compareOnKey(key, resolute, a, b) {
    a = a[key]
    b = b[key]
    if (a < b) return -1*resolute;
    if (a > b) return  resolute;
    return 0
  };

  function sortBy(key) {
    let resolute = 1;
    if (sort) {
      resolute = resolute * -1
    }
    setSort(!sort)
    console.log(resolute)
    sortTasks.sort(compareOnKey.bind(null, key, resolute));
    setSortTasks([...sortTasks])
  }


  return (
    <Maindiv>
      <div
        className={userProfile ? "table-container" : "table-container strech"}
        role="table"
        aria-label="Destinations"
      >
        <div className="taskRow header">
          <div className="flex-row first"> <span> description</span></div>
          <div className="container">
            <div className={userlist ? "flex-row myList" : "flex-row"}>
              <Button name='completed' onClick={(e) => sortBy(e.target.name)}>
                <i
                  className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                  aria-hidden="true"
                ></i>
                completed
              </Button>
            </div>
            <div className={userlist ? "flex-row myList" : "flex-row"}>
              <Button name='createdAt' onClick={(e) => sortBy(e.target.name)} v>
                <i
                  className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                  aria-hidden="true"
                ></i>
                createdAt
              </Button>
            </div>
            <div className={userlist ? "flex-row myList" : "flex-row"}>
              <Button name='updatedAt' onClick={(e) => sortBy(e.target.name)}>
                <i 
                  className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                  aria-hidden="true"
                ></i>
                updatedAt
              </Button>
            </div>
            <div className={userlist ? "flex-row displaynone" : "flex-row"}>
              <Button name='ownerName' onClick={(e) => sortBy(e.target.name)}>
                <i
                  className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                  aria-hidden="true"
                ></i>
                owner name
              </Button>
            </div>
            <div className={userlist ? "flex-row displaynone" : "flex-row"}>
              <span> owner pic</span>
            </div>
          </div>
        </div>
        {sortTasks.map((task, indx) => {
          return (
            <div
              className="taskRow"
              key={task.createdAt + indx}
              role="rowgroup"
            >
              <Task key={"task" + indx} userlist={userlist} task={task} />
            </div>
          );
        })}
      </div>
      <LocalStyles />
    </Maindiv>
  );
};

export default TaskList;

const Maindiv = styled.div`
  margin-top: 15px;
`;

const Button = styled.button`
  min-height: 35px;
  background-color: transparent;
  width: 100%;
  outline: 0;
`;

const LocalStyles = createGlobalStyle`
.container {
  display: flex;
  justify-content: space-between;
  width: 80%;
}
.fa {
  pointer-events: none;
  position: relative;
  top: 1px;
  left: -6px;
  height: 8px;
}
.header {
  background: #1976d2;
}
.displaynone {
  display: none !important;
}
.taskRow img {
  width: 6vw;
  outline: 0;
}

.row {
  padding: 4vh 1vw 1vh 2vw;
}
.taskRow {
  display: flex;
  text-align: left;
  flex-flow: row wrap;
   transition: 0.5s;
   &:first-of-type {
    width: 98%;
    padding: 0 0 0 2%;
  }
  &:first-of-type .flex-row {
    background: #1976d2;
    color: white;
   
    width: 20%;
    &.first {
      width: 16%;
    }
    span{
      margin: 1px 0px 3px 15px;
    letter-spacing: 1px;
    font-size:15px;
    }
  }
  .container div.myList {
    width: 32%;
  }
  .flex-row {
    width: 9%;
    display: flex;
    outline: 0;
    justify-content: center;
    flex-direction: column;
    &.first {
      width: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}
.table-container {
  background: #8c959e17;
  border: 1px solid #d9d9dc;
  outline: 0;
  width: 102%;
}
.strech {
  width: 150%;
}

`;
