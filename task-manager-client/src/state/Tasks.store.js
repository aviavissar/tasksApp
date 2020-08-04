import React, { useState, createContext, useContext, useEffect } from "react";
import {
  getAllTasks,
  getProfile,
  getUserTasks,
  logout,
  login,
} from "../service/axios";

const TasksStore = createContext();
const { Provider } = TasksStore;

const useStore = () => {
  const context = useContext(TasksStore);
  if (!context) {
    throw new Error(`useStore must be used within a Provider`);
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const TaskAppProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState('all');
  const [refreshTask, setRefreshTask] = useState(false);
  const [editTask, setEditTask] = useState({})
  

  useEffect(() => {
    console.log(userToken)
    async function fetchData() {
      if (userToken) {
        setUserProfile(await getProfile(userToken));
        setUserTasks(await getUserTasks(userToken,search,limit));
      }
           //  setUserProfile(await getProfile(userToken));
      setAllTasks(await getAllTasks(search,limit));
    }
    fetchData();
  }, [search,userToken,limit]);

  useEffect(() => {
    async function fetchData() {
      if (userToken) {
      setUserTasks(await getUserTasks(userToken,search,limit));
      }
      setAllTasks(await getAllTasks(search,limit));
    }
    fetchData();
  }, [userProfile,userToken,refreshTask,search,limit]);

  //my login logout func
  const doLogIn = async (email, password) => {
  
    const res = await login(email, password);
    const { data, status } = res;
    setUserToken(data.token);
    setUserProfile({ ...data.user });
    setIsConnected(status === 200);
  };

  const doLogout = async () => {
    await logout(userToken);
    setIsConnected(false);
    setUserToken(null);
    setUserProfile(null);
  };

  //state
  const state = {
    allTasks,
    userProfile,
    userTasks,
    userToken,
    isConnected, search,limit,refreshTask,editTask
  };

  // actions = callbacks to invoke
  const actions = {
    setAllTasks,
    setUserProfile,
    setUserTasks,
    setUserToken,
    doLogout,
    doLogIn,
    setIsConnected,
    setSearch,
    setLimit,
    setEditTask,setRefreshTask
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { TaskAppProvider, useStore };
 
    