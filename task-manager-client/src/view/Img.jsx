import React from "react";
import styled from "styled-components/macro";

const Img = ({ owner, userProfile }) => {
  const del = (owner, userProfile) => {
    if (userProfile && owner === userProfile._id&&userProfile.avatar!==undefined) {
      return (
        <img
          alt="avatar"
          src={`data:image/png;base64,${userProfile.avatar.toString("base64")}`}
        />
      );
    }
    return (
      <img
        alt="avatar"
        src={"http://localhost:3000/users/" + owner + "/avatar"}
      />
    );
  };
  return <div>{del(owner, userProfile)}</div>;
};

export default Img;

const List = styled.ul`
  min-height: 550px;
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
`;
