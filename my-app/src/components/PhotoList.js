import React from "react";
import Photo from "./Photo";

const PhotoList = props => {
  const results = props.data;
  let photos = results.map((photo, idx) => <Photo key={idx} data={photo} />);

  return (
    <div className="photo-container">
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
