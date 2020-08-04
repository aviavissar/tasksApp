import React, { useRef, useEffect, useState } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import { createTask, updateTask, getAllTasks } from "../service/axios";
import { isEmpty } from "lodash";

const CreateTask = () => {
  const {
    userToken,
    setRefreshTask,
    refreshTask,
    editTask,
    setEditTask,
  } = useStore();
  const [desc, setDesc] = useState("");
  const [isCompleted, setIsCompleted] = useState("true");

  useEffect(() => {
    if (!isEmpty(editTask)) {
      const { description, completed } = editTask;
      console.log(isCompleted);
      setIsCompleted(completed);
      setDesc(description);
    }
  }, [editTask]);

  const onDesChange = (e) => {
    setDesc(e.target.value);
  };
  const onSelChange = (e) => {
    setIsCompleted(e.target.value);
  };

  const doCreateTask = async (desc, isCompleted, userToken) => {
    await createTask(desc, isCompleted, userToken);
    setIsCompleted("true");setDesc('')
    await setRefreshTask(!refreshTask);
  };

  const doUpdateTask = async (desc, isCompleted, userToken) => {
    editTask.description = desc;
    editTask.completed = isCompleted;
    setEditTask(editTask);
    await updateTask(editTask, userToken);
    await setRefreshTask(!refreshTask);
  };
  return (
    <MyForm>
      <h2>create a new task or update task</h2>
      <InputWrap>
        <Label>description</Label>
        <Input type="text" onChange={onDesChange} value={desc} />
      </InputWrap>
      <InputWrap>
        <Label>select if completed</Label>
        <Select onChange={onSelChange} value={isCompleted}>
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
        <button onClick={() => doCreateTask(desc, isCompleted, userToken)}>
          create
        </button>
        <button onClick={() => doUpdateTask(desc, isCompleted, userToken)}>
          updateTask
        </button>
      </InputWrap>
    </MyForm>
  );
};

export default CreateTask;

const MyForm = styled.div`
  display: flex;
  background: #8c959e17;
  padding: 20px;
  border: 1px solid #d9d9dc;
  flex-direction: column;
  @media only screen and (max-width: 414px) {
    padding: 10px;
    margin: 10px;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 1rem;
  margin: 10px 0px 0px 0px;
  width: 100%;
  @media only screen and (max-width: 414px) {

    font-size: 0.7rem;
   }
`;
const Select = styled.select`
  font-size: 16px;
  padding: 2px;
  margin: 5px;
  @media only screen and (max-width: 414px) {
    width: auto;
    font-size: 0.7rem;
    padding: 0px;
    margin: 5px 0px;
  }
`;
const Input = styled.input`
  width: 90%;
  font-size: 1rem;
  padding: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  margin: 5px;
  @media only screen and (max-width: 414px) {
    font-size: 0.7rem;
    min-width: 60px;
    margin-left: 5px;
  }
`;
