import React ,{useEffect,useState} from 'react';
import TaskList from './view/TaskList';
import Login from './view/Signin';
import Signin from './view/Login';
import Profile from './view/Profile';
import CreateTask from './view/CreateTask';
import styled from 'styled-components/macro';
import { useStore } from './state/Tasks.store';
import './App.css';
import Finder from './view/Finder'


const App = () => {
 
  const {  allTasks, userProfile } = useStore();
  
 
  

 
  return (
    <div className="App">
      <header className="App-header">

        <LoginPnl>
          <Login />

          <Signin />
        </LoginPnl>
        <Finder></Finder>
        <div>logo</div>
      </header>
      <Main>{
        userProfile ?
          <Aside><div>
            <Profile userProfile={userProfile} />
            <CreateTask />
            <TaskList userlist={true} tasks={allTasks} userProfile={userProfile} />
          </div>


          </Aside> : null
      }
        <AllTasks>
          <TaskList tasks={allTasks} userProfile={userProfile} />
        </AllTasks>

      </Main>
    </div>
  );
}

export default App;

const Main = styled.div`
width: 100%;
display:flex;
justify-content:stretch;
margin-left: 30px;
;
       `;

const Aside = styled.div`
width: 40%;
display:flex;
justify-content: flex-start;
flex-direction:column;
padding-top: 15px;
transition:8s;
margin: 0 10px;
       `;

const AllTasks = styled.div`
width: 60%;
display:flex;
justify-content: space-around;
transition:8s;
margin: 0 10px;
       `;

const LoginPnl = styled.div`
width: 20%;
display:flex;
justify-content: space-around;
       `;

const Button = styled.button`
background-color:transparent;
`;