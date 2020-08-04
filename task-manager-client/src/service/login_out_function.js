const doLogIn = async (email, password) => {
  const res = await login(email, password);
  const { data, status } = res;
  setUserToken(data.token);
  setUserProfile({ ...data.user });
  setIsConnected(status === 200);
  handleClose();
};

const doLogout = async () => {
  await logout(userToken);
  setIsConnected(false);
  setUserToken(null);
  setUserProfile(null);
};
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
