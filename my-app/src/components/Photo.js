//photo component
import React from "react";

//individual photo link and li construction
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
