import axios1 from "axios";
let axios = axios1.default;

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZThmYjFkMThjNmM0MjM0Yzg4MGMyNyIsImlhdCI6MTU5MjUxNTQwOH0.QKGwL9AFIHZuHUZlpUvw8N4e91geQ3iAwwLlIV8LHok";
export const login = async (email, password) => {
  try {
    console.log(email + "," + password);
    const response = await axios.post(
      "/users/login",
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
    console.error(" client error" + error);
  }
};

export const logout = async (userToken) => {
  try {
    const response = await axios.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: userToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" client error" + error);
  }
};

export const createTask = async (description, completed, userToken) => {
  try {
    const response = await axios({
      method: "post",
      url: "/tasks",
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
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios({
      method: "post",
      url: "/users",
      headers: {},
      data: {
        name,
        age,
        email,
        password,
      },
    }).catch((e) => {
      console.log("error", e.response);
      if (e.response.data.code === 11000) {
        throw new Error("this email already exist");
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async (search, limit, sortBy) => {
  try {
    const response = await axios.get("/all-tasks", {
      params: {
        search,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTasks = async (userToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "/mytasks",
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
      url: "/users/me",
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
      url: "/users/me",
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
    console.error(" client error");
  }
};

export const updateAvatar = async (imageFile, userToken) => {
  const formData = new FormData();
  try {
    await formData.append("upload", imageFile.files[0]);
    console.log(userToken);
    await axios.post("/users/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userToken,
      },
    });
  } catch (error) {
    console.error(" exios claint error" + error);
  }
};

export const updateTask = async (editTask, userToken) => {
  console.log(editTask);
  const { _id, description, completed } = editTask;
  try {
    console.log("response", editTask);
    const response = await axios({
      method: "patch",
      url: `/tasks/${_id}`,
      data: {
        description,
        completed,
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

export const deleteTask = async (userToken, id) => {
  try {
    await axios.delete(`/tasks/${id}`, {
      headers: {
        Authorization: userToken,
      },
    });
  } catch (error) {
    console.error(" exios claint error" + error);
  }
};
