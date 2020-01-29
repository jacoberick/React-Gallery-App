// photo list component
import React from "react";
import Photo from "./Photo";

//maps out photos from Photo component
const PhotoList = props => {
  const results = props.data;
  let photos = results.map((photo, idx) => <Photo key={idx} data={photo} />);
  const PhotoHeading = () => {
    return results.length ? (
      <h2>Showing photos for {props.query}</h2>
    ) : (
      <h2>Search for photos</h2>
    );
  };

  // ul construction
  return (
    <div className="photos-wrapper">
      <PhotoHeading />
      <div className="photo-container">
        <ul>{photos}</ul>
      </div>
    </div>
  );
};

export default PhotoList;
