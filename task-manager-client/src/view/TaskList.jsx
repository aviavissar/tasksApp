import React, { useState, useEffect } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import Task from "./Task";

const TaskList = ({ tasks = [], userlist, userProfile }) => {
 
  const {setLimit } = useStore();

  const [sortTasks, setSortTasks] = useState([]);
  const [sort, setSort] = useState(true);

  useEffect(() => {
    setSortTasks(tasks);
  }, [tasks]);

  function compareOnKey(key, resolute, a, b) {
    a = a[key];
    b = b[key];
    if (a < b) return -1 * resolute;
    if (a > b) return resolute;
    return 0;
  }

  function sortBy(key) {
    let resolute = 1;
    if (sort) {
      resolute = resolute * -1;
    }
    setSort(!sort);
    console.log(resolute);
    sortTasks.sort(compareOnKey.bind(null, key, resolute));
    setSortTasks([...sortTasks]);
  }

  const doLimit = (e) => {
    setLimit(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div
      className={userProfile ? "table-container" : "table-container strech"}
      role="table"
      aria-label="Destinations"
    >
      <div className="taskRow header">
        <div className="flex-row first">
          <span> description</span>
        </div>
        <div className={userlist ? "container myList" : "container"}>
          <div className={userlist ? "flex-row myList" : "flex-row"}>
            <Button name="completed" onClick={(e) => sortBy(e.target.name)}>
              <i
                className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                aria-hidden="true"
              ></i>
              completed
            </Button>
          </div>
          <div className={userlist ? "flex-row myList" : "flex-row"}>
            <Button name="createdAt" onClick={(e) => sortBy(e.target.name)} v>
              <i
                className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                aria-hidden="true"
              ></i>
              createdAt
            </Button>
          </div>
          <div className={userlist ? "flex-row myList" : "flex-row"}>
            <Button name="updatedAt" onClick={(e) => sortBy(e.target.name)}>
              <i
                className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                aria-hidden="true"
              ></i>
              updatedAt
            </Button>
          </div>
          <div
            className={userlist ? "flex-row displaynone" : "flex-row ownername"}
          >
            <Button name="ownerName" onClick={(e) => sortBy(e.target.name)}>
              <i
                className={sort ? "fa fa-sort-desc" : "fa fa-sort-asc"}
                aria-hidden="true"
              ></i>
              owner
            </Button>
          </div>
          <div className={userlist ? "flex-row displaynone" : "flex-row"}>
            <span>owner pic</span>
          </div>
        </div>
      </div>
      {sortTasks.map((task, indx) => {
        return (
          <div className="taskRow" key={task.createdAt + indx} role="rowgroup">
            <Task key={"task" + indx} userlist={userlist} task={task} />
          </div>
        );
      })}
      <Limitwrap>
        <select onChange={(e) => doLimit(e)} defaultValue="all">
          <option value="1">10 tasks</option>
          <option value="3">50 tasks</option>
          <option value="all">all tasks</option>
        </select>
      </Limitwrap>
    </div>
  );
};

export default TaskList;
 
const Limitwrap = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Button = styled.button`
  min-height: 35px;
  background-color: transparent;
  outline: 0;
`;
