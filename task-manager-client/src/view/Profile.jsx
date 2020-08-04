import React, { useState, useRef } from "react";
import { useStore } from "../state/Tasks.store";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";
import {
  updateProfile,
  updateAvatar,
  getProfile
} from "../service/axios";
import { isEmpty } from "lodash";

const Profile = () => {
  const {
    setUserProfile,
    userProfile,
    userToken,
      editTask,
    setEditTask,
  } = useStore();
  const sampleFileRef = useRef(null);
  // const userProfile={
  //   "_id":"5ee8fb1d18c6c4234c880c27",
  //   "name": "moshe",
  //   "age": 24,
  //   "email": "aviavissaaar@gmail.com",
  //   "password": "$2a$08$sousUNXWGVUQ7VqgvTdHWejsfUHxZi2KUZ3xr6cWWpa3qRqrKmubi",
  //   "avatar": 'yygygyggfdr'
  // }

  const { _id, name, age, email, password } = userProfile;

  const [updating, setUpdating] = useState(false);

  const doUpdateAvatar = async () => {
    await updateAvatar(sampleFileRef.current, userToken);
    await setUpdating(false);
    await setUserProfile(await getProfile(userToken));
    // await setAllTasks(await getAllTasks());
    setEditTask(!editTask);
  };

  return (
    <Container>
      <ProfileImg>
        <Img
          src={
            !isEmpty(userProfile) && userProfile.avatar !== undefined
              ? `data:image/png;base64,${userProfile.avatar.toString("base64")}`
              : ""
          }
        />
        <input
          type="file"
          encType="multipart/form-data"
          ref={sampleFileRef}
          name="sampleFile"
          id="sampleFile"
          onChange={doUpdateAvatar}
        />
      </ProfileImg>
      <ProfileDetails>
        <div className="Containerflex">
          <div className="details"> ID </div>
          <div className="details"> {_id} </div>
        </div>
        <div className="Containerflex">
          <div className="details"> Name: </div>
          <div className="details">
            <input
              type="text"
              className={updating ? "onUpdate" : "readable"}
              defaultValue={name}
              readOnly={!updating}
              onChange={
                updating
                  ? (e) =>
                      setUserProfile({
                        ...userProfile,
                        name: e.target.value,
                      })
                  : null
              }
            />{" "}
          </div>
        </div>
        <div className="Containerflex">
          <div className="details"> Age: </div>
          <div className="details">
            <input
              type="number"
              className={updating ? "onUpdate" : "readable"}
              defaultValue={age}
              readOnly={!updating}
              onChange={
                updating
                  ? (e) =>
                      setUserProfile({
                        ...userProfile,
                        age: e.target.value,
                      })
                  : null
              }
            />
          </div>
        </div>
        <div className="Containerflex">
          <div className="details"> Email: </div>
          <div className="details">
            <input
              type="email"
              className={updating ? "onUpdate" : "readable"}
              defaultValue={email}
              readOnly={!updating}
              onChange={
                updating
                  ? (e) =>
                      setUserProfile({
                        ...userProfile,
                        email: e.target.value,
                      })
                  : null
              }
            />
          </div>
        </div>
        <div className="Containerflex">
          <div className="details"> Password: </div>
          <div className="details">
            <input
              type="password"
              className={updating ? "onUpdate" : "readable"}
              defaultValue={password}
              readOnly={!updating}
              onChange={
                updating
                  ? (e) =>
                      setUserProfile({
                        ...userProfile,
                        password: e.target.value,
                      })
                  : null
              }
            />
          </div>
        </div>
        <UpdatePanel>
          <button
            onClick={() => {
              updateProfile(userProfile, userToken);
              setUserProfile((prv) => ({
                ...prv,
              }));
              setUpdating(false);
            }}
          >
            save
          </button>
          <button onClick={() => setUpdating(true)}> update </button>
        </UpdatePanel>
      </ProfileDetails>
      <LocalStyles />
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  background: #8c959e17;
  padding: 20px;
  border: 1px solid #d9d9dc;
  @media only screen and (max-width: 414px) {
  
  }
`;
const UpdatePanel = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: row;
  @media only screen and (max-width: 414px) {
    position: relative;
    right: 15%;
    top: 20px;
  }
`;

const Img = styled.img`
  border-radius: 3px;
  width: 98%;
  margin-bottom: 7px;
  border: 1px solid #d9d9dc;
`;

const ProfileImg = styled.div`
  width: 32%;
  margin-right: 5px;
`;

const ProfileDetails = styled.ul`
  padding: 0 10px;
  width: 68%;
`;

const LocalStyles = createGlobalStyle`
.details{
   width:60%;
  margin:2px 0;
  @media only screen and (max-width: 414px) {
    margin:0px;
    width:27%;
  }
}
.readable{
 background:transparent;
 border:none;
  &:focus{
  outline: none;
   }
 }
`;
