import React from "react";

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
