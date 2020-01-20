import React from "react";

const Photo = props => {
  const { farm, server, id, secret } = props.data;
  let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return (
    <li className="photo-container">
      <img alt="" src={url} />
    </li>
  );
};

export default Photo;
