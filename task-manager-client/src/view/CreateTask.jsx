import React, { useRef } from 'react';
import { useStore } from '../state/Tasks.store';
import styled from 'styled-components/macro';
import { createTask,getUserTasks } from '../service/axios'


const CreateTask = () => {
  const taskInput = useRef(null);
  const selectInput = useRef(null);
  const { userToken,setUserTasks} = useStore();

  const doCreateTask = async(taskInput, selectInput, userToken) => {
  await  createTask(taskInput, selectInput, userToken)
    setUserTasks(await getUserTasks(userToken))
  }

  return (
    <MyForm>

      <InputWrap>
        <Label>create a new task</Label>
        <Input type='text' ref={taskInput} />
      </InputWrap>
      <InputWrap>
        <Label>select if completed</Label>
        <Select ref={selectInput}>
          <option value='true' >true</option>
          <option value='false' >false</option>
        </Select>
        <button onClick={() => doCreateTask(taskInput.current.value, selectInput.current.value, userToken)} >create</button>
      </InputWrap>

    </MyForm >

  );
}

export default CreateTask;


const MyForm = styled.div`
   display: flex;
    background: #8c959e17;
    padding: 20px;
  border: 1px solid #d9d9dc;
  flex-direction: column;
    `;

const InputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size:16px;
  margin: 5px;
    width: 100%;
  `;
const Select = styled.select`
  width: 20%;
  font-size:16px;
 padding:2px;
 margin: 5px;
  `;
const Input = styled.input`
  width: 70%;
  font-size:16px;
 padding:5px;
  `;

const Label = styled.label`
 font-size:16px;
 margin:5px;
  `;