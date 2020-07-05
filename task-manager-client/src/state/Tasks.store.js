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

const TaskAppProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (userToken) {
        setUserProfile(await getProfile(userToken));
        setUserTasks(await getUserTasks(userToken));
      }
      //  setUserProfile(await getProfile(userToken));
      setAllTasks(await getAllTasks(search));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //    const newtask = await getAllTasks();
      setAllTasks(await getAllTasks());
    }
    fetchData();
  }, [userTasks, userProfile]);


  useEffect(() => {
    console.log(search)
    async function fetchData() {
      setAllTasks(await getAllTasks(search));
    }
    fetchData();
  }, [search]);






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
    isConnected, search
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
    setSearch
  };

  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { TaskAppProvider, useStore };
