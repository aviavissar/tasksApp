import axios from "axios";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThmYjFkMThjNmM0MjM0Yzg4MGMyNyIsImlhdCI6MTU5MjUxNTQwOH0.QKGwL9AFIHZuHUZlpUvw8N4e91geQ3iAwwLlIV8LHok";
export const login = async (email, password) => {
  try {
    console.log(email + "," + password);
    const response = await axios.post(
      "http://localhost:3000/users/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      token = response.data.token;
      return response;
    }
  } catch (error) {
    console.error(" claint error" + error);
  }
};

export const logout = async (userToken) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/users/logout",
      {},
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" claint error" + error);
  }
};

export const createTask = async (description, completed, userToken) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/tasks",
      headers: {
        //'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json; charset=utf-8",
        Authorization: userToken,
      },
      data: {
        description,
        completed,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (email, password, name, age) => {
  try {

    const response = await axios({
      method: "post",
      url: "http://localhost:3000/users",
      headers: {},
      data: {
        name,
        age,
        email,
        password,
      }
    }).catch(e => {
      console.log("error", e.response)
      if (e.response.data.code === 11000) {
        throw new Error('this email already exist');
      }
    })

    return response
  } catch (error) {
    throw error
  }
};

export const getAllTasks = async (search,limit, sortBy) => {
  try {
    const response = await axios.get("http://localhost:3000/all-tasks", {
      params: {
        search,
        limit,
        sortBy
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTasks = async (userToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/mytasks",
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getProfile = async (userToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/users/me",
      headers: {
        Authorization: token || userToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (profile, userToken) => {
  const { name, age, email, password } = profile;
  try {
    console.log("response", profile);
    const response = await axios({
      method: "patch",
      url: "http://localhost:3000/users/me",
      data: {
        name,
        age,
        email,
        password,
      },
      headers: {
        Authorization: userToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(" claint error");
  }
};

export const updateAvatar = async (imagefile, userToken) => {
  const formData = new FormData();
  try {
    await formData.append("upload", imagefile.files[0]);
    console.log(userToken);
    const resp = await axios.post(
      "http://localhost:3000/users/me/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: userToken,
        },
      }
    );
  } catch (error) {
    console.error(" exios claint error" + error);
  }
};

